import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebaseConfig'; // Adjust path as needed
import { doc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import './Banner.css';

const Banner = () => {
  const [bannerName, setBannerName] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImageLink, setBannerImageLink] = useState(''); // State for image URL
  const [selectedSection, setSelectedSection] = useState('');
  const [currentBanner, setCurrentBanner] = useState(null); // To display the current banner
  const [bannerList, setBannerList] = useState([]); // List of available banners in the selected section

  const sections = ['Hero']; // Can be extended to other sections like 'About', 'Contact', etc.

  useEffect(() => {
    const fetchBanners = async () => {
      if (selectedSection) {
        try {
          // Fetch all banners from Firestore and filter by selected section
          const bannersRef = collection(db, 'banners');
          const bannerQuery = getDocs(bannersRef);
          const banners = [];
          (await bannerQuery).forEach((doc) => {
            if (doc.data().section === selectedSection) {
              banners.push(doc.data());
            }
          });
          setBannerList(banners);
        } catch (error) {
          console.error("Error fetching banners: ", error);
        }
      }
    };

    fetchBanners();
  }, [selectedSection]);

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
        setBannerImageLink(''); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBanner = async () => {
    // Save the banner to Firebase
    try {
      const bannerRef = doc(db, "banners", bannerName); // Save by banner name as document ID
      await updateDoc(bannerRef, {
        name: bannerName,
        imageBase64: bannerImage,
        imageLink: bannerImageLink, 
        section: selectedSection,
      });
      alert('Banner updated successfully!');
      setCurrentBanner({ name: bannerName, imageBase64: bannerImage, imageLink: bannerImageLink }); // Update the current banner preview
    } catch (error) {
      console.error("Error saving banner: ", error);
    }
  };

  const handleBannerSelection = async (selectedBanner) => {
    // Set the selected banner as the current banner for the section
    setCurrentBanner(selectedBanner);

    // Save the selected banner to the section in Firestore
    try {
      const sectionRef = doc(db, "sections", selectedSection); // Assuming you have a 'sections' collection
      await updateDoc(sectionRef, {
        selectedBannerName: selectedBanner.name,
        selectedBannerImage: selectedBanner.imageBase64 || selectedBanner.imageLink,
      });
      alert('Banner selection saved for this section!');
    } catch (error) {
      console.error("Error saving selected banner: ", error);
    }
  };

  return (
    <div className="admin-banner">
      {/* Top Section */}
      <div className="top-section">
        {/* Form Section (Left) */}
        <div className="form-section">
          <h2>Update Banner</h2>
          <div className="form-group">
            <label htmlFor="bannerName">Banner Name</label>
            <input
              type="text"
              id="bannerName"
              value={bannerName}
              onChange={(e) => setBannerName(e.target.value)}
              placeholder="Enter banner name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bannerImage">Banner Image (Upload Image)</label>
            <input
              type="file"
              id="bannerImage"
              onChange={handleBannerImageChange}
              accept="image/*"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bannerImageLink">Or Enter Image URL</label>
            <input
              type="url"
              id="bannerImageLink"
              value={bannerImageLink}
              onChange={(e) => setBannerImageLink(e.target.value)}
              placeholder="Enter banner image URL"
            />
          </div>

          <button onClick={handleSaveBanner}>Save Banner</button>
        </div>

        {/* Selection Section (Right) */}
        <div className="selection-section">
          <h3>Select Section</h3>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Choose a section</option>
            {sections.map((section, index) => (
              <option key={index} value={section}>{section}</option>
            ))}
          </select>

          {selectedSection && (
            <div>
              <h3>Select Banner</h3>
              <select
                onChange={(e) => handleBannerSelection(JSON.parse(e.target.value))}
              >
                <option value="">Choose a Banner</option>
                {bannerList.map((banner, index) => (
                  <option key={index} value={JSON.stringify(banner)}>
                    {banner.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Current Banner Preview */}
      <div className="current-banner-section">
        <h4>Current Banner</h4>
        {currentBanner ? (
          <>
            {currentBanner.imageBase64 || currentBanner.imageLink ? (
              <img
                src={currentBanner.imageBase64 || currentBanner.imageLink}
                alt="Current Banner"
                className="banner-preview"
              />
            ) : (
              <p>No banner image available.</p>
            )}
            <p>{currentBanner.name}</p>
          </>
        ) : (
          <p>No banner applied yet.</p>
        )}
      </div>
    </div>
  );
};

export default Banner;
