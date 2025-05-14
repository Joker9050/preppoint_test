import { AuthProvider } from "./pages/Auth/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Mcq from "./pages/Mcq";
function App() {
  return (
    //  <Mcq />
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;