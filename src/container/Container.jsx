import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
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
import { ClipLoader } from "react-spinners";
import Profile from "../components/User/Profile/Profile";
import OrderList from "../components/User/order/OrderList";
import AddressList from "../components/User/Address/AddressList";
import SeoInjector from "./SeoInjector";

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

const RouteDetermination = () => {
  const location = useLocation();
  const { setToPayment } = useLocalContext();
  useEffect(() => {
    if (location.pathname.toLowerCase() === "/payment") {
      setToPayment(true);
    } else {
      setToPayment(false);
    }
  }, [location.pathname]);
  return null;
};

const URLStateHandler = () => {
  const location = useLocation();
  const { products, setProductToShow, setSelectedAntiv } = useProduct();

  useEffect(() => {
    const validateRouteAndSetProduct = (path) => {
      if (!products || Object.keys(products).length === 0) return;

      let foundProduct = null;
      let matchedCategory = null;

      Object.keys(products).forEach((categoryKey) => {
        const productList = products[categoryKey];
        if (!Array.isArray(productList)) return;
        const product = productList.find(
          (item) => item.route.toLowerCase() === path.toLowerCase()
        );
        if (product) {
          foundProduct = product;
          matchedCategory = categoryKey;
        }
      });

      if (foundProduct && matchedCategory) {
        setProductToShow(foundProduct);
        setSelectedAntiv(matchedCategory);
      }
    };

    validateRouteAndSetProduct(location.pathname);
  }, [location.pathname, products, setProductToShow, setSelectedAntiv]);

  return null;
};

const Redirector = () => {
  const location = useLocation();
  const targetURL = `https://blogs.hcvatron.com/${location.search}`;
  useEffect(() => {
    window.location.replace(targetURL);
  }, [targetURL]);
  return null;
};

const MainContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes("admin");
  const isUserPage = location.pathname.includes("/user");
  const isLoginPage = location.pathname.includes("/user/login");
  const { isUserLoggedIn } = useUserContext();

  const [loading, setLoading] = useState(true);
  const isFirstRender = useRef(true);

  const { setToPayment } = useLocalContext();
  const underDevPaths = ["/antivirus/future-brand", "/some/future-page"];
  const isUnderDevelopment = underDevPaths.includes(location.pathname);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.toLowerCase() === "/payment") {
      setToPayment(true);
    } else {
      setToPayment(false);
    }
  }, [location.pathname]);

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
      {!isAdminPage && <SeoInjector />}

      <RouteDetermination />
      {!isAdminPage && (
        <div style={{ minHeight: "100vh", padding: "20px" }}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
              <ClipLoader color="#c2410c" size={70} />
            </div>
          ) : (
            <div className="fade-in">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/antivirus" element={<Categories />} />
              <Route path="/digital" element={<DigitalCategories />} />
              <Route path="/windows" element={<Wcategories />} />
              <Route path="/printer" element={<Prcategories />} />
              <Route path="/router" element={<Rcategories />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/best-sellers" element={<BestSeller />} />
              <Route path="/top-rated" element={<TopSeller />} />
              <Route path="/categories" element={<AllCate />} />
              <Route path="/digital/digital-marketing" element={<DigitalCate />} />
              <Route path="/digital/web-development" element={<WebDevCate />} />
              <Route path="/digital/content-writing" element={<ContentWriting />} />
              <Route path="/digital/app-development" element={<AppDevelopment />} />
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
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/blogs/*" element={<Redirector />} />
              <Route path="/blogs" element={<Redirector />} />
              <Route path="/blog/*" element={<Redirector />} />
              <Route path="/blog" element={<Redirector />} />
              <Route path="/user" element={<UserProfileLayout />}>
                    <Route index element={<Navigate to="dashboard" />} />
                    <Route path="dashboard" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="orders" element={<PrivateRoute><OrderList /></PrivateRoute>} />
                    <Route path="address" element={<PrivateRoute><AddressList /></PrivateRoute>} />
              </Route>
            </Routes>
            </div>
          )}
        </div>
      )}

      {isAdminPage && <AdminLayout />}
      {/* {isUserPage && !isLoginPage && <UserProfileLayout />} */}
      {!isAdminPage  && <Footer />}
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
