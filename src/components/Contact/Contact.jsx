import React, { useEffect } from "react";
import "./Contact.css";
import { useLocalContext } from "../../context/LocalContext";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

const Contact = () => {
  const { webinfo } = useLocalContext();

  useEffect(() => {
    document.title = `Contact | ${webinfo.name}`;
  }, []);

  return (
    <>
      <section className="contact-section comp">
        {/* Header Section */}
        <div className="contact-header">
          <h1>
            Get in <span>Touch</span>
          </h1>
          <p>
            Have a question or need support? We’re here to help you every step
            of the way. Reach out to us using the contact form below or through
            our direct channels.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="contact-layout">
          {/* Contact Form */}
          <div className="form-container">
            <h2>Write to Us</h2>
            <p>
              Fill out the form below, and our team will get back to you as soon
              as possible.
            </p>
            <form>
              <div className="form-group">
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
              </div>
              <input type="text" placeholder="Subject" required />
              <textarea
                placeholder="Write your message here..."
                rows="5"
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="info-container">
            <h2>Contact Details</h2>
            <p>
              Reach out directly to us via email, phone, or visit our office.
            </p>
            <div className="info-item">
              <h3>Email</h3>
              <p>{webinfo.email}</p>
            </div>
            <div className="info-item">
              <h3>Phone</h3>
              <p>{webinfo.phone}</p>
            </div>
            <div className="info-item">
              <h3>Address</h3>
              <p>India : {webinfo.address}</p>
              <p>USA : {webinfo.address2}</p>
            </div>
            <div className="info-item">
              <h3>Office Hours</h3>
              <p>Available 24/7 — including weekends and holidays</p>
            </div>
          </div>
        </div>
      </section>
      <WhyChooseUs />
    </>
  );
};

export default Contact;
