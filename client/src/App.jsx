import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import local files
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import BasicLayout from "./layouts/Basic";
import HomePage from "./pages/homepage";
import LearningPage from "./pages/learningpage";
import CourseDetailsPage from "./pages/coursedetailspage";
import UserPostPage from "./pages/userpostpage";
import PageNotFound from "./pages/pagenotfound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <BasicLayout />
            </PrivateRoute>
          }
        />

        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />

        <Route
          path="/auth"
          element={
            <PublicRoute>
              <LearningPage />
            </PublicRoute>
          }
        />

        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserPostPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/course/:id"
          element={
            <PublicRoute>
              <CourseDetailsPage />
            </PublicRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
