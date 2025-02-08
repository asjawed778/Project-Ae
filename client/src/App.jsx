import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import local files
import PublicRoute from "./components/auth/PublicRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import BasicLayout from "./layouts/Basic";
import LazyComponent from "./components/lazy loading/LazyComponent";
import PageNotFound from "./pages/pagenotfound";
import AdminLayout from "./layouts/AdminLayout";
const ViewCategories = lazy(() =>
  import("./pages/Admin/Category/ViewCategories")
);
const AddCategory = lazy(() => import("./pages/Admin/Category/AddCategory"));
const AuthPage = lazy(() => import("./pages/authpage"));
const HomePage = lazy(() => import("./pages/Home page/homepage"));
const BlogPage = lazy(() => import("./pages/Blog/landingpage"));
const AdminPage = lazy(() => import("./pages/Admin/adminpage"));
const CourseLandingPage = lazy(() => import("./pages/Course/landingpage"));
const UserPostPage = lazy(() => import("./pages/Post/userpostpage"));
const SinglePost = lazy(() => import("./pages/Single_Post/landingpage"));

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
            path="/blog/:id"
            element={
              <LazyComponent>
                <SinglePost />
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
                <CourseLandingPage />
              </LazyComponent>
            }
          />
        </Route>

        <Route
          path="/admin"
          element={
            <LazyComponent>
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            </LazyComponent>
          }
        >
          <Route
            index
            element={
              <LazyComponent>
                <AdminPage />
              </LazyComponent>
            }
          />

          <Route
            path="view-categories"
            element={
              <LazyComponent>
                <ViewCategories />
              </LazyComponent>
            }
          />

          <Route
            path="add-category"
            element={
              <LazyComponent>
                <AddCategory />
              </LazyComponent>
            }
          />
        </Route>

        <Route
          path="/auth"
          element={
            <LazyComponent>
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            </LazyComponent>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
