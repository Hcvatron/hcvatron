import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";

const SeoInjector = () => {
  const location = useLocation();
  const { fetchSeoMeta, seoMeta } = useAdminContext();


  useEffect(() => {
    fetchSeoMeta(); 
  }, []);

  useEffect(() => {
    if (!Array.isArray(seoMeta)) return;

    const meta = seoMeta.find(item => item.route === location.pathname);
    if (!meta) return;

    document.title = meta.title || "Hcvatron";

    const updateOrCreateMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (tag) {
        tag.setAttribute("content", content);
      } else {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        tag.setAttribute("content", content);
        document.head.appendChild(tag);
      }
    };

    updateOrCreateMeta("description", meta.description);
    updateOrCreateMeta("keywords", meta.keywords);
  }, [location.pathname, seoMeta]);

  return null;
};

export default SeoInjector;
