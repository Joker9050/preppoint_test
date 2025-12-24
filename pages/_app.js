import '../styles/globals.css';
import '../src/assets/css/style.css';
import { AuthProvider } from '../lib/AuthContext';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Hide navbar on auth pages
  const hideNavbar = ['/login', '/register', '/forgot-password'].includes(router.pathname);

  return (
    <AuthProvider>
      {!hideNavbar && <Navbar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
