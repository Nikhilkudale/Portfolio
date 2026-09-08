'use client';

import React, { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic Validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/nikhilnkudale@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact Form Message',
          message: formData.message,
          _subject: `Portfolio Contact: ${formData.name} sent you a message!`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error(data.message || 'Could not deliver message. Please try again.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <h2 className="sectionTitle">Get In Touch</h2>
        <p className="sectionSubtitle">
          Have a project in mind, a question, or just want to say hello? Drop me a message below!
        </p>

        <div className={styles.contactWrapper}>
          {!isSubmitted ? (
            <div className={`${styles.formCard} glassCard`}>
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                {errorMsg && (
                  <div style={{ color: 'var(--accent-color)', marginBottom: '1.5rem', fontWeight: '600' }}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                {/* Name field */}
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    id="form-name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="form-name" className={styles.label}>
                    Your Name *
                  </label>
                </div>

                {/* Email field */}
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    id="form-email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="form-email" className={styles.label}>
                    Email Address *
                  </label>
                </div>

                {/* Subject field */}
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="subject"
                    id="form-subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder=" "
                  />
                  <label htmlFor="form-subject" className={styles.label}>
                    Subject
                  </label>
                </div>

                {/* Message field */}
                <div className={styles.inputGroup}>
                  <textarea
                    name="message"
                    id="form-message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${styles.inputField} ${styles.textareaField}`}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="form-message" className={styles.label}>
                    Message *
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btnPrimary ${styles.submitBtn}`}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          ) : (
            /* Success confirmation panel */
            <div className={`${styles.successCard} glassCard`}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>Message Sent!</h3>
              <p className={styles.successText}>
                Thank you for reaching out. I have received your message and will get back to you as soon as possible!
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn btnSecondary"
                style={{ marginTop: '2rem' }}
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
