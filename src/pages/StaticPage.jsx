import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../componets/Navbar';
import Footer from '../componets/Footer';

const StaticPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [pageData, setPageData] = useState({
    title: '',
    content: '',
    lastUpdated: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [activeSection, setActiveSection] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost/prep_point/public/api/';
  const API_KEY = import.meta.env.VITE_API_KEY || 'your_api_key_here';

  useEffect(() => {
    const loadPageContent = () => {
      try {
        setLoading(true);
        setError(null);

        // Use static demo content
        const demoContent = getDemoContent(slug);
        if (demoContent) {
          setPageData(demoContent);
          generateTableOfContents(demoContent.content);
        } else {
          throw new Error('Page not found');
        }

      } catch (err) {
        setError(err.message || 'Failed to load page content');
      } finally {
        setLoading(false);
      }
    };

    loadPageContent();
  }, [slug]);

  const getDemoContent = (slug) => {
    const demoContent = {
      'terms-conditions': {
        title: 'Terms and Conditions',
        content: `
          <h2 id="section-1">1. Acceptance of Terms</h2>
          <p>By accessing and using PrepPoint, you accept and agree to be bound by these Terms and Conditions. Your continued use of the Service constitutes your agreement to these Terms.</p>
          
          <h2 id="section-2">2. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials. Any activities that occur under your account are your responsibility.</p>
          
          <h2 id="section-3">3. Intellectual Property</h2>
          <p>All content provided through PrepPoint, including text, graphics, logos, and software, is the property of PrepPoint and protected by intellectual property laws.</p>
          
          <h2 id="section-4">4. Prohibited Activities</h2>
          <p>You may not use our service to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Upload malicious content or viruses</li>
            <li>Harass, intimidate, or threaten others</li>
          </ul>
          
          <h2 id="section-5">5. Termination</h2>
          <p>We reserve the right to terminate or suspend your account immediately, without prior notice, for conduct that we determine to be in violation of these Terms.</p>
        `,
        lastUpdated: '2023-10-15T14:30:00Z'
      },
      'privacy-policy': {
        title: 'Privacy Policy',
        content: `
          <h2 id="section-1">1. Information We Collect</h2>
          <p>We collect personal information when you register, including:</p>
          <ul>
            <li>Name and email address</li>
            <li>Academic information and preferences</li>
            <li>Usage data and analytics</li>
            <li>Payment information for premium services</li>
          </ul>
          
          <h2 id="section-2">2. How We Use Your Data</h2>
          <p>Your information helps us:</p>
          <ul>
            <li>Provide personalized learning experiences</li>
            <li>Improve our services and features</li>
            <li>Communicate important updates and offers</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>
          
          <h2 id="section-3">3. Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with:</p>
          <ul>
            <li>Trusted service providers who assist our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Academic institutions for research purposes (anonymized)</li>
          </ul>
        `,
        lastUpdated: '2023-11-20T09:15:00Z'
      },
      'cookie-policy': {
        title: 'Cookie Policy',
        content: `
          <h2 id="section-1">1. What Are Cookies</h2>
          <p>Cookies are small text files stored on your device to enhance your experience. They help websites remember your preferences and actions.</p>
          
          <h2 id="section-2">2. Types of Cookies We Use</h2>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
            <li><strong>Performance Cookies:</strong> Help us improve our site</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences</li>
            <li><strong>Analytics Cookies:</strong> Understand how you use our platform</li>
          </ul>
          
          <h2 id="section-3">3. Managing Cookies</h2>
          <p>You can control cookies through your browser settings. However, disabling essential cookies may impact site functionality.</p>
          
          <h2 id="section-4">4. Third-Party Cookies</h2>
          <p>We use services like Google Analytics that may place their own cookies. These are subject to their respective privacy policies.</p>
        `,
        lastUpdated: '2023-09-05T16:45:00Z'
      },
      'terms-of-service': {
        title: 'Terms of Service',
        content: `
          <h2 id="section-1">1. Service Description</h2>
          <p>PrepPoint provides educational content and practice materials for various academic subjects and competitive exams.</p>
          
          <h2 id="section-2">2. User Responsibilities</h2>
          <p>Users must:</p>
          <ul>
            <li>Provide accurate registration information</li>
            <li>Maintain account security</li>
            <li>Use the service for educational purposes only</li>
            <li>Respect intellectual property rights</li>
          </ul>
          
          <h2 id="section-3">3. Service Limitations</h2>
          <p>While we strive for accuracy, we cannot guarantee the completeness or correctness of all content. Users should verify information independently.</p>
        `,
        lastUpdated: '2023-12-01T10:00:00Z'
      }
    };
    
    return demoContent[slug];
  };

  const generateTableOfContents = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    const toc = Array.from(headings).map(heading => ({
      id: heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-'),
      text: heading.textContent,
      level: heading.tagName.toLowerCase()
    }));
    setTableOfContents(toc);
    if (toc.length > 0) setActiveSection(toc[0].id);
  };

  const handleBackClick = () => {
    router.back();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Page titles mapping
  const pageTitles = {
    'terms-conditions': 'Terms and Conditions',
    'privacy-policy': 'Privacy Policy',
    'cookie-policy': 'Cookie Policy',
    'terms-of-service': 'Terms of Service'
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-800">{pageTitles[slug] || 'Legal Document'}</h1>
            </div>
            
            <button 
              onClick={handleBackClick}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <div className="lg:w-1/4">
                <div className="sticky top-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Table of Contents</h2>
                  <nav>
                    <ul className="space-y-2">
                      {tableOfContents.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${
                              activeSection === item.id 
                                ? 'bg-blue-50 text-blue-600 font-medium' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {item.text}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            )}

            {/* Page Content */}
            <div className={`${tableOfContents.length > 0 ? 'lg:w-3/4' : 'w-full'}`}>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                {loading ? (
                  <div className="py-16 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading content...</p>
                  </div>
                ) : error ? (
                  <div className="p-8">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-red-700 font-medium">{error}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8">
                    <div className="mb-8">
                      <h1 className="text-3xl font-bold text-gray-800 mb-2">{pageData.title}</h1>
                      <p className="text-gray-600">
                        Last updated: {formatDate(pageData.lastUpdated)}
                      </p>
                    </div>
                    
                    <div 
                      className="prose prose-blue max-w-none"
                      dangerouslySetInnerHTML={{ __html: pageData.content }}
                    />
                    
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <div className="bg-blue-50 p-6 rounded-xl">
                        <div className="flex items-start">
                          <svg className="h-6 w-6 text-blue-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-2">Have questions?</h3>
                            <p className="text-gray-600">
                              If you have any questions about our policies, please contact our support team at 
                              <a href="mailto:support@preppoint.in" className="text-blue-600 hover:underline ml-1">support@preppoint.in</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} PrepPoint. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default StaticPage;
