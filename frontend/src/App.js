import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/home/HomePage1.jsx';
import AuthPage from './pages/AuthPage';
import PublicRoute from './components/core/PublicRoute';
import PrivateRoute from './components/core/PrivateRoute';
import './index.css';
import Sidebar from './components/common/Sidebar.jsx';
import UserPost from './components/common/UserPost.jsx';
import HomePage from './pages/home/HomePage.jsx' ;
import AdminDashboard from './pages/home/Admin/AdminDashboard.jsx';
import CourseDetails from './pages/CourseDetails.jsx';
import AddCourse from './components/common/admin/AddCourse.jsx';
import Category from './components/common/admin/Category.jsx';
import Blog from './pages/home/Blog.jsx';




function App() {

  
  const location = useLocation() ;

  return (
    // <div className='flex max-w-6xl items-start'>
    // <div className='flex max-w-6xl mx-auto items-start justify-around bg-white home' > 
     <> 

      {/* Sidebar */}
      {/* {location.pathname !== '/auth' && (
        <div className="w-[250px] md:w-[300px] h-screen">
          <Sidebar />
        </div>
      )} */}

    {/* <div className='flex-1 flex justify-center home-component mr-32' > */}
      <Routes>

        <Route path='/' element={ 
            <HomePage/>    
        } />

        <Route path='/blog' element={ 
            <Blog/>    
        } />

        <Route path='/auth' element={
          <PublicRoute>
             <AuthPage />
          </PublicRoute>
          // <AuthPage/>
           
        } />

        <Route path='/:id/dashboard/*' element={ 
          <PrivateRoute requiredRole="SUPERADMIN" >
             <AdminDashboard/>
          </PrivateRoute>  
          //<AdminDashboard/>
        } > 
          <Route index element={<AddCourse />} />
          <Route path="add-course" element={<AddCourse/>} />
          <Route path="category" element={<Category/>} />

        </Route>
       
        <Route path='/user' element={
          <PrivateRoute>
            <UserPost />
          </PrivateRoute>
        } />

        <Route path='/course/:id' element={ 
            <CourseDetails/>
        } />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {/* </div> */}
      
    </>
    // </div>
    // </div>  
  );
}

export default App;
