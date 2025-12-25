import { useEffect } from 'react';
import  {useAuth}  from './AuthContext';
import { useRouter } from 'next/router';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-lg text-gray-600">Logging out...</p>
      </div>
    </div>
  );
};

export default Logout;