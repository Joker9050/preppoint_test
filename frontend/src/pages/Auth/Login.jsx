import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Correct import for latest version

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: ''
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      form: ''
    };

    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ ...errors, form: '' });

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      // const response = await axios.post(
      //   'http://your-api-endpoint/auth/login',
      //   { email, password },
      //   { 
      //     headers: { 'Content-Type': 'application/json' },
      //     validateStatus: (status) => status >= 200 && status < 500
      //   }
      // );

      // if (response.status === 401) {
      //   throw new Error('Invalid email or password');
      // }

      // const userData = response.data;
      const userData = '{success}';
      login(userData);
      navigate('/dashboard');
    } catch (err) {
      setErrors({
        ...errors,
        form: err.message || 
             err.response?.data?.message || 
             err.response?.data?.error || 
             'Login failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    setErrors({ ...errors, form: '' });
    
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google Login Success:', decoded);

      if (!decoded.email || !decoded.email_verified) {
        throw new Error('Google email not verified');
      }

      // Here you would typically send the token to your backend
      // const response = await axios.post(
      //   'http://your-api-endpoint/auth/google',
      //   { idToken: credentialResponse.credential },
      //   { headers: { 'Content-Type': 'application/json' } }
      // );

      // const userData = response.data;
      const userData = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        // Add any other user data your app needs
      };
      
      login(userData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
      setErrors({
        ...errors,
        form: err.message || 
             err.response?.data?.message || 
             'Google login failed. Please try again.'
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setErrors({
      ...errors,
      form: 'Google login failed. Please try again.'
    });
  };

  const features = [
    { icon: '📊', text: 'Track your progress' },
    { icon: '🎯', text: 'Set your goals' },
    { icon: '🛤️', text: 'Personalized learning path' },
    { icon: '🧪', text: 'Test your skills' },
    { icon: '💻', text: 'Practice coding in browser' },
    { icon: '🌐', text: 'Build and host a website' },
    { icon: '🧑‍🏫', text: 'Teacher Toolbox' }
  ];

  return (
    <GoogleOAuthProvider clientId="87569987972-osskffm06pf1gotuvg96b2fhg2fh7sfq.apps.googleusercontent.com">
      <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Attractive Sidebar */}
        <div className="hidden md:flex w-1/3 bg-gradient-to-b from-[#0a63b0] to-indigo-700 p-8 flex-col justify-center text-white">
          <div className="max-w-xs mx-auto">
            <h1 className="text-4xl font-bold mb-6">Become a PrepPoint</h1>
            <p className="text-xl mb-8 opacity-90">Free to use, easy to love</p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-2xl mr-3 mt-1">{feature.icon}</span>
                  <div>
                    <p className="text-lg font-medium">{feature.text}</p>
                    <div className="w-8 h-1 bg-blue-300 mt-1 rounded-full opacity-70"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full md:w-2/3 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
              <img 
                src={logo} 
                alt="Company Logo" 
                className="h-12 w-auto" 
              />
            </div>
            
            <button 
              onClick={() => navigate('/')}
              className="mb-4 flex items-center text-[#0a63b0] hover:text-blue-800 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </button>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Log In</h2>
                <p className="text-gray-600 mb-6">
                  Don't have an account?{' '}
                  <a href="/register" className="text-[#0a63b0] hover:underline font-medium">Sign up</a>
                </p>

                {errors.form && (
                  <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded text-sm">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-red-700 font-medium">{errors.form}</span>
                    </div>
                  </div>
                )}

                {/* Google Login Button */}
                <div className="mb-6">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled || googleLoading}
                        className={`w-full flex items-center justify-center py-3 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all ${
                          googleLoading ? 'opacity-80 cursor-not-allowed' : ''
                        }`}
                      >
                        {googleLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in with Google...
                          </>
                        ) : (
                          <>
                            <img 
                              src="https://www.google.com/favicon.ico" 
                              alt="Google logo" 
                              className="h-5 w-5 mr-3"
                            />
                            Continue with Google
                          </>
                        )}
                      </button>
                    )}
                  />
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-white text-sm text-gray-400">
                      OR
                    </span>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={`w-full px-4 py-2.5 text-sm rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => handleBlur('email')}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className={`w-full px-4 py-2.5 text-sm rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => handleBlur('password')}
                    />
                    {touched.password && errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-end">
                    <a href="/forgot-password" className="text-sm text-[#0a63b0] hover:underline font-medium">
                      Forgot password?
                    </a>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#0a63b0] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Logging in...
                        </>
                      ) : 'Login'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;