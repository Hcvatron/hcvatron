import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "../components/home/Home";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProductPage from "../components/productPage/ProductPage";
import Cart from "../components/Cart/Cart";
import Payment from "../components/Payment/Payment";
import Terms from "../components/T&C/Terms";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Disclaimer from "../components/T&C/Disclaimer";
import PrivacyPolicy from "../components/T&C/PrivacyPolicy";
import Refund from "../components/T&C/Refund";
import ShippingPolicy from "../components/T&C/ShippingPolicy";
import Cate from "../components/categories/Antivirus/Cate";
import Categories from "../components/categories/Antivirus/Categories";
import { useProduct } from "../context/ProductContext";
import BestSeller from "../components/categories/Antivirus/BestSeller/BestSeller";
import TopSeller from "../components/categories/Antivirus/TopSeller/TopSeller";
import AllCate from "../components/categories/AllCate";
import Wcategories from "../components/categories/Windows/Wcategories";
import Wcate from "../components/categories/Windows/Wcate";
import WproductPage from "../components/categories/Windows/WproductPage";
import Prcategories from "../components/categories/Printer/Prcategories";
import Prcate from "../components/categories/Printer/Prcate";
import PrproductPage from "../components/categories/Printer/PrproductPage";
import AdminLayout from "./AdminLayout";
import Rcate from "../components/categories/Routers/Rcate";
import Rcategories from "../components/categories/Routers/Rcategories";
import RproductPage from "../components/categories/Routers/RproductPage";
import Blogspage from "../components/blogs/Blogspage";
import AllBlogs from "../components/blogs/AllBlogs";
import UserLogin from "../components/User/UserLogin";
import { useUserContext } from "../context/UserContext";
import UserProfileLayout from "./UserProfileLayout";
import DigitalCategories from "../components/categories/Digital/DigitalCategories";
import DigitalCate from "../components/categories/Digital/DigitalMarketting/DigitalCate";
import WebDevCate from "../components/categories/Digital/WebDevelopment/WebDevCate";
import { useLocalContext } from "../context/LocalContext";
import UnderDevelopment from "../components/UnderDevelopment/UnderDevelopment";
import ContentWriting from "../components/categories/Digital/ContentWriting/ContentWriting";
import AppDevelopment from "../components/categories/Digital/AppDevelopment/AppDevelopment";

const ScrollToTop = () => {
  const location = useLocation();
  const { setSelectedAntiv } = useProduct();

  useEffect(() => {
    window.scrollTo(0, 0);

    const categories = [
      "Avast", "McAfee", "Norton", "TotalAV", "AVG",
      "Bitdefender", "Kaspersky", "Avira", "PCMatic",
      "BullGuard", "TrendMicro", "Windows7", "Windows8",
      "Windowsxp", "hp", "epson", "canon", "netgear",
      "tplink", "asus", "dlink", "cisco"
    ];

    const matchedCategory = categories.find((category) =>
      location.pathname.toLowerCase().includes(category.toLowerCase())
    );

    if (matchedCategory) {
      setSelectedAntiv(matchedCategory);
    }
  }, [location.pathname, setSelectedAntiv]);

  return null;
};

const RouteDetermination = ()=>{
  const location = useLocation();
  const {setToPayment} = useLocalContext();
  useEffect(()=>{
    if(location.pathname.toLowerCase === '/payment'){
      setToPayment(true);
    }else{
      setToPayment(false);
    }
  },[location.pathname])
  return null;
}

const URLStateHandler = () => {
  const location = useLocation();
  const { products, setProductToShow, setSelectedAntiv } = useProduct();

  useEffect(() => {
    const validateRouteAndSetProduct = (path) => {
      if (!products || Object.keys(products).length === 0) {
        console.warn("❌ Products data is empty or not loaded yet.");
        return;
      }

      console.log("🔹 Checking Route:", path);

      let foundProduct = null;
      let matchedCategory = null;

      // Loop through all categories in products
      Object.keys(products).forEach((categoryKey) => {
        const productList = products[categoryKey];

        if (!Array.isArray(productList)) {
          console.warn(`❌ Expected an array for category "${categoryKey}", but got:`, productList);
          return;
        }

        // Find the product that matches the current route
        const product = productList.find((item) => item.route.toLowerCase() === path.toLowerCase());

        if (product) {
          foundProduct = product;
          matchedCategory = categoryKey;
        }
      });

      if (foundProduct && matchedCategory) {
        setProductToShow(foundProduct);
        setSelectedAntiv(matchedCategory);
        console.log("✅ Product found and set:", foundProduct);
      } else {
        console.warn(`❌ No matching product found for route: ${path}`);
      }
    };

    validateRouteAndSetProduct(location.pathname);
  }, [location.pathname, products, setProductToShow, setSelectedAntiv]);

  return null;
};

const MainContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes("admin");
  const isUserPage = location.pathname.includes("user");
  const isLoginPage = location.pathname.includes("/user/login");
  const { isUserLoggedIn } = useUserContext();

  const underDevPaths = [
    // "/digital/content-writing",
    // "/digital/app-development",
    "/antivirus/future-brand",
    "/some/future-page"
  ];

  const isUnderDevelopment = underDevPaths.includes(location.pathname);

 
  if (isUnderDevelopment) {
    return (
      <>
      <Header />
    <UnderDevelopment />
    <Footer />
     </>
    );
  }

  return (
    <>
      {!isAdminPage && <Header />}
      {!isAdminPage && <URLStateHandler />}
      {!isAdminPage && <ScrollToTop />}
      <RouteDetermination />
      {!isAdminPage && (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user/login" element={<UserLogin />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/blogs" element={<AllBlogs />} />
          <Route exact path="/antivirus" element={<Categories />} />
          <Route exact path="/digital" element={<DigitalCategories />} />
          <Route exact path="/windows" element={<Wcategories />} />
          <Route exact path="/printer" element={<Prcategories />} />
          <Route exact path="/router" element={<Rcategories />} />
          <Route exact path="/disclaimer" element={<Disclaimer />} />
          <Route exact path="/best-sellers" element={<BestSeller />} />
          <Route exact path="/top-rated" element={<TopSeller />} />
          <Route path="/blog/:blog" element={<Blogspage />} />
          <Route exact path="/categories" element={<AllCate />} />
          <Route exact path="/digital/digital-marketing" element={<DigitalCate />} />
          <Route exact path="/digital/web-development" element={<WebDevCate />} />
          <Route exact path="/digital/content-writing" element={<ContentWriting />} />
          <Route exact path="/digital/app-development" element={<AppDevelopment />} />
          <Route path="/antivirus/:category" element={<Cate />} />
          <Route path="/router/:category" element={<Rcate />} />
          <Route path="/windows/:category" element={<Wcate />} />
          <Route path="/printer/:category" element={<Prcate />} />
          <Route path="/antivirus/:category/:productname" element={<ProductPage />} />
          <Route path="/printer/:category/:productname" element={<PrproductPage />} />
          <Route path="/windows/:category/:productname" element={<WproductPage />} />
          <Route path="/router/:category/:productname" element={<RproductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/termsandconditions" element={<Terms />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/returnandrefundpolicy" element={<Refund />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route exact path="/user/login" element={<UserLogin />} />
          {/* <Route exact path="*" element={<UnderDevelopment />} /> */}
        </Routes>
      )}
      {isAdminPage && <AdminLayout />}
      {isUserPage && !isLoginPage && <UserProfileLayout />}
      {!isAdminPage && !isUserPage && <Footer />}
    </>
  );
};

const Container = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

export default Container;
