import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
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

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (touched[name]) {
      validateForm();
    }
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

    // Simulate API call delay
    setTimeout(() => {
      // Mock successful login
      const mockUser = {
        id: 1,
        name: 'Demo User',
        email: formData.email,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      };

      login(mockUser);
      navigate('/dashboard');
      setLoading(false);
    }, 1500);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    setErrors({ ...errors, form: '' });

    // Simulate Google login delay
    setTimeout(() => {
      const decoded = jwtDecode(credentialResponse.credential);
      const mockUser = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture
      };

      login(mockUser);
      navigate('/dashboard');
      setGoogleLoading(false);
    }, 1500);
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
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
                  <Link to="/register" className="text-[#0a63b0] hover:underline font-medium">Sign up</Link>
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
                {/* <div className="mb-6">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                />
                </div> */}

                {/* Google Login Button */}
                <div className="mb-6 flex justify-center">
                  <div style={{ minHeight: 44, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      useOneTap
                    />
                  </div>
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
                      className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                          errors.password ? 'border-red-500' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={() => handleBlur('password')}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-end">
                    <Link to="/forgot-password" className="text-sm text-[#0a63b0] hover:underline font-medium">
                      Forgot password?
                    </Link>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#0a63b0] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
                        loading ? 'opacity-80 cursor-not-allowed' : ''
                      }`}
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
