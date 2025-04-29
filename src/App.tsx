import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./utils/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
