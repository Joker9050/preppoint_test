import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: '',
    consent: false,
    file: null,
    honeypot: ''
  });

  const [errors, setErrors] = useState({});
  const [formErrors, setFormErrors] = useState([]); // For backend validation errors
  const [submitting, setSubmitting] = useState(false);
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        interest: '',
        consent: false,
        file: null,
        honeypot: ''
      });
      setErrors({});
      setFormErrors([]);
      firstInputRef.current?.focus();
    }
  }, [isOpen]);

  // Handle focus trapping and body scroll
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === 'Tab') {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements.length === 0) return;
          
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email Address is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.consent) newErrors.consent = 'You must agree to the Privacy Policy';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] || null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      toast.error('Submission rejected');
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setFormErrors([]); // Clear previous errors

    // Simulate API call delay
    setTimeout(() => {
      // Simulate successful submission
      toast.success("Thank you for your message! We'll get back to you soon.");

      // Clear form and close modal after 3 seconds
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        interest: '',
        consent: false,
        file: null,
        honeypot: ''
      });
      setErrors({});
      setTimeout(() => {
        onClose();
      }, 3000);
      setSubmitting(false);
    }, 1000); // 1 second delay to simulate processing
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="contact-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      ref={modalRef}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          {/* Header with centered logo and Contact Us on left */}
          <div className="flex justify-between items-center mb-6 relative">
            <h3 id="contact-modal-title" className="text-2xl font-bold text-gray-900">
              Contact Us
            </h3>
            
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Backend validation errors */}
            {formErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                <strong className="font-bold">Please fix the following errors:</strong>
                <ul className="list-disc list-inside mt-1">
                  {formErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="modal-name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  ref={firstInputRef}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                  required
                />
                {errors.name && (
                  <p id="name-error" className="text-red-600 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="modal-email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                  required
                />
                {errors.email && (
                  <p id="email-error" className="text-red-600 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="modal-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="modal-phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="modal-interest" className="block text-sm font-medium text-gray-700 mb-1">
                  I'm interested in
                </label>
                <select
                  id="modal-interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="">Select an option</option>
                  <option value="general">General</option>
                  <option value="website_bug">Website Bug</option>
                  <option value="business_partnership">Business Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="modal-message" className="block text-sm font-medium text-gray-700 mb-1">
                Your Message *
              </label>
              <textarea
                id="modal-message"
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
                rows="4"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                required
              ></textarea>
              {errors.message && (
                <p id="message-error" className="text-red-600 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="modal-file" className="block text-sm font-medium text-gray-700 mb-1">
                Upload a file (optional)
              </label>
              <input
                type="file"
                id="modal-file"
                name="file"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
              />
              <p className="text-xs text-gray-500 mt-1">
                Allowed file types: .png, .jpg, .jpeg, .pdf, .doc, .docx (Max size: 5MB)
              </p>
            </div>

            <div className="flex items-start space-x-2 mt-4">
              <input
                type="checkbox"
                id="modal-consent"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                aria-invalid={errors.consent ? "true" : "false"}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="mt-1"
                required
              />
              <label htmlFor="modal-consent" className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Privacy Policy
                </a>{' '}
                <span className="text-red-600">*</span>
              </label>
            </div>
            {errors.consent && (
              <p id="consent-error" className="text-red-600 text-sm mt-1">
                {errors.consent}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex justify-center items-center ${
                  submitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {submitting && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contact-section" className="py-16 bg-gray-50">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Have questions about our programs?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Our team is here to help you with any questions you might have.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center"
        >
          Contact Us
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  );
};

export default ContactSection;