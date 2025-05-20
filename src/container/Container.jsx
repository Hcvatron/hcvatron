import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ClipLoader } from "react-spinners";
import PrivateRoute from "./PrivateRoute";
import { useProduct } from "../context/ProductContext";
import { useUserContext } from "../context/UserContext";
import { useLocalContext } from "../context/LocalContext";
import SeoInjector from "./SeoInjector";

// Lazy-loaded components
const Home = lazy(() => import("../components/home/Home"));
const Header = lazy(() => import("../components/Header/Header"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const ProductPage = lazy(() => import("../components/productPage/ProductPage"));
const Cart = lazy(() => import("../components/Cart/Cart"));
const Payment = lazy(() => import("../components/Payment/Payment"));
const Terms = lazy(() => import("../components/T&C/Terms"));
const About = lazy(() => import("../components/About/About"));
const Contact = lazy(() => import("../components/Contact/Contact"));
const Disclaimer = lazy(() => import("../components/T&C/Disclaimer"));
const PrivacyPolicy = lazy(() => import("../components/T&C/PrivacyPolicy"));
const Refund = lazy(() => import("../components/T&C/Refund"));
const ShippingPolicy = lazy(() => import("../components/T&C/ShippingPolicy"));
const Cate = lazy(() => import("../components/categories/Antivirus/Cate"));
const Categories = lazy(() => import("../components/categories/Antivirus/Categories"));
const BestSeller = lazy(() => import("../components/categories/Antivirus/BestSeller/BestSeller"));
const TopSeller = lazy(() => import("../components/categories/Antivirus/TopSeller/TopSeller"));
const AllCate = lazy(() => import("../components/categories/AllCate"));
const Wcategories = lazy(() => import("../components/categories/Windows/Wcategories"));
const Wcate = lazy(() => import("../components/categories/Windows/Wcate"));
const WproductPage = lazy(() => import("../components/categories/Windows/WproductPage"));
const Prcategories = lazy(() => import("../components/categories/Printer/Prcategories"));
const Prcate = lazy(() => import("../components/categories/Printer/Prcate"));
const PrproductPage = lazy(() => import("../components/categories/Printer/PrproductPage"));
const Rcate = lazy(() => import("../components/categories/Routers/Rcate"));
const Rcategories = lazy(() => import("../components/categories/Routers/Rcategories"));
const RproductPage = lazy(() => import("../components/categories/Routers/RproductPage"));
const UserLogin = lazy(() => import("../components/User/UserLogin"));
const UserProfileLayout = lazy(() => import("./UserProfileLayout"));
const AdminLayout = lazy(() => import("./AdminLayout"));
const DigitalCategories = lazy(() => import("../components/categories/Digital/DigitalCategories"));
const DigitalCate = lazy(() => import("../components/categories/Digital/DigitalMarketting/DigitalCate"));
const WebDevCate = lazy(() => import("../components/categories/Digital/WebDevelopment/WebDevCate"));
const ContentWriting = lazy(() => import("../components/categories/Digital/ContentWriting/ContentWriting"));
const AppDevelopment = lazy(() => import("../components/categories/Digital/AppDevelopment/AppDevelopment"));
const UnderDevelopment = lazy(() => import("../components/UnderDevelopment/UnderDevelopment"));
const Profile = lazy(() => import("../components/User/Profile/Profile"));
const OrderList = lazy(() => import("../components/User/order/OrderList"));
const AddressList = lazy(() => import("../components/User/Address/AddressList"));

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
    if (matchedCategory) setSelectedAntiv(matchedCategory);
  }, [location.pathname, setSelectedAntiv]);

  return null;
};

const RouteDetermination = () => {
  const location = useLocation();
  const { setToPayment } = useLocalContext();

  useEffect(() => {
    setToPayment(location.pathname.toLowerCase() === "/payment");
  }, [location.pathname]);

  return null;
};

const URLStateHandler = () => {
  const location = useLocation();
  const { products, setProductToShow, setSelectedAntiv } = useProduct();

  useEffect(() => {
    const validate = (path) => {
      if (!products || Object.keys(products).length === 0) return;
      let matched = null, found = null;

      Object.keys(products).forEach((key) => {
        const list = products[key];
        if (!Array.isArray(list)) return;
        const prod = list.find(p => p.route.toLowerCase() === path.toLowerCase());
        if (prod) [found, matched] = [prod, key];
      });

      if (found && matched) {
        setProductToShow(found);
        setSelectedAntiv(matched);
      }
    };

    validate(location.pathname);
  }, [location.pathname, products, setProductToShow, setSelectedAntiv]);

  return null;
};

const Redirector = () => {
  const location = useLocation();
  useEffect(() => {
    window.location.replace(`https://blogs.hcvatron.com/${location.search}`);
  }, [location.search]);
  return null;
};

const MainContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");
  const underDev = ["/antivirus/future-brand", "/some/future-page"].includes(location.pathname);
  const [loading, setLoading] = useState(true);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, [location.pathname]);

  if (underDev) return (
    <>
      <Header />
      <UnderDevelopment />
      <Footer />
    </>
  );

  return (
    <>
      {!isAdmin && <Header />}
      {!isAdmin && <URLStateHandler />}
      {!isAdmin && <ScrollToTop />}
      {!isAdmin && <SeoInjector />}
      <RouteDetermination />

      <Suspense fallback={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
          <ClipLoader color="#c2410c" size={70} />
        </div>
      }>
        <div style={{ minHeight: "100vh", padding: "20px" }}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
              <ClipLoader color="#c2410c" size={70} />
            </div>
          ) : (
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
              <Route path="/blog/*" element={<Redirector />} />
              <Route path="/user" element={<UserProfileLayout />}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="orders" element={<PrivateRoute><OrderList /></PrivateRoute>} />
                <Route path="address" element={<PrivateRoute><AddressList /></PrivateRoute>} />
              </Route>
            </Routes>
          )}
        </div>
      </Suspense>

      {!isAdmin && <Footer />}
      {isAdmin && <AdminLayout />}
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
