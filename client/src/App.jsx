import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import local files
import PublicRoute from "./components/auth/PublicRoute";
import BasicLayout from "./layouts/Basic";
import LazyComponent from "./components/lazy loading/LazyComponent";
import PageNotFound from "./pages/pagenotfound";
const AuthPage = lazy(() => import("./pages/authpage"));
const HomePage = lazy(() => import("./pages/homepage"));
const BlogPage = lazy(() => import("./pages/blogpage"));
const CourseDetailsPage = lazy(() => import("./pages/coursedetailspage"));
const UserPostPage = lazy(() => import("./pages/userpostpage"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route
            path="/"
            element={
              <LazyComponent>
                <HomePage />
              </LazyComponent>
            }
          />
          <Route
            path="/blog"
            element={
              <LazyComponent>
                <BlogPage />
              </LazyComponent>
            }
          />
          <Route
            path="/user"
            element={
              <LazyComponent>
                <UserPostPage />
              </LazyComponent>
            }
          />
          <Route
            path="/course/:id"
            element={
              <LazyComponent>
                <CourseDetailsPage />
              </LazyComponent>
            }
          />
        </Route>

        <Route
          path="/auth"
          element={
            <PublicRoute>
              <LazyComponent>
                <AuthPage />
              </LazyComponent>
            </PublicRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
