import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/home/HomePage1.jsx";
import AuthPage from "./pages/AuthPage";
import PublicRoute from "./components/core/PublicRoute";
import PrivateRoute from "./components/core/PrivateRoute";
import "./index.css";
import Sidebar from "./components/common/Sidebar.jsx";
import UserPost from "./components/common/UserPost.jsx";
import Learning from "./pages/home/HomePage.jsx";
import AdminDashboard from "./pages/home/Admin/AdminDashboard.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<AuthPage />} />

        <Route path="/learning" element={<Learning />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserPost />} />

        <Route path="/course/:id" element={<CourseDetails />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* </div> */}
    </>
    // </div>
    // </div>
  );
}

export default App;
