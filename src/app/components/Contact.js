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
          _autoresponse: `<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0a1d; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #2e265c; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
  <!-- 3D Graphic Header Banner -->
  <div style="position: relative; background: linear-gradient(135deg, #1e1b4b 0%, #311042 100%); text-align: center; border-bottom: 2px solid #8b5cf6; overflow: hidden;">
    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" alt="3D Futuristic Graphic Header" style="width: 100%; height: 180px; object-fit: cover; opacity: 0.85; display: block;" />
    <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, #0b0a1d, transparent); padding: 20px 0 10px 0;">
      <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.8);">⚡ Thank You For Reaching Out</h2>
    </div>
  </div>

  <!-- Main Body Content -->
  <div style="padding: 28px 24px; line-height: 1.6; color: #e2e8f0; font-size: 15px;">
    <p style="margin-top: 0;">Hi <strong>${formData.name}</strong>,</p>
    <p>Thank you for getting in touch through my portfolio website! I have received your message regarding "<strong>${formData.subject || 'General Inquiry'}</strong>" and appreciate you reaching out.</p>

    <!-- 3D Core Specialization Badge -->
    <div style="background: rgba(139, 92, 246, 0.12); border: 1px solid rgba(139, 92, 246, 0.35); border-radius: 12px; padding: 18px; margin: 24px 0; text-align: center;">
      <div style="font-size: 28px; margin-bottom: 6px;">🤖 ☕ ⚡</div>
      <div style="color: #a78bfa; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Core Specializations</div>
      <div style="color: #ffffff; font-size: 14px; margin-top: 6px; font-weight: 600;">Generative AI & RAG Workflows • Java Spring Boot • React & Next.js</div>
    </div>

    <p>Whether you would like to discuss software engineering opportunities, Generative AI application development, robust backend architectures, or collaborative projects, I will review your note and get back to you within 24 hours.</p>

    <!-- Call to action button -->
    <div style="text-align: center; margin: 28px 0;">
      <a href="https://linkedin.com/in/nikhil-kudale-dev/" target="_blank" style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block; font-size: 14px; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);">Connect on LinkedIn &rarr;</a>
    </div>

    <hr style="border: 0; border-top: 1px solid #2e265c; margin: 28px 0;" />

    <!-- Professional Signature -->
    <div style="display: flex; align-items: center; gap: 14px;">
      <div>
        <div style="font-weight: 700; color: #ffffff; font-size: 16px; letter-spacing: 0.3px;">Nikhil Kudale</div>
        <div style="color: #a78bfa; font-size: 13px; font-weight: 600; margin-top: 2px;">Full-Stack & Generative AI Engineer</div>
        <div style="color: #94a3b8; font-size: 13px; margin-top: 2px;">Software Developer</div>
        <div style="color: #64748b; font-size: 12px; margin-top: 4px;">📧 nikhilnkudale@gmail.com</div>
      </div>
    </div>
  </div>

  <div style="background-color: #05040d; padding: 14px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #1e1b4b;">
    © ${new Date().getFullYear()} Nikhil Kudale. Portfolio & AI Engineering.
  </div>
</div>`,
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
