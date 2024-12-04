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
          <PublicRoute>
            <HomePage/>    
          </PublicRoute>
                  
        } />

        <Route path='/auth' element={
          <PublicRoute>
             <AuthPage />
          </PublicRoute>
           
        } />

        <Route path='/:id/dashboard' element={ 
          // <PrivateRoute>
          //    <AdminDashboard/>
          // </PrivateRoute>
          <PublicRoute>
            <AdminDashboard/>
          </PublicRoute>
          //<AdminDashboard/>
           
        } />
       
        <Route path='/user' element={
          <PrivateRoute>
            <UserPost />
          </PrivateRoute>
        } />

        <Route path='/course/:id' element={
          <PublicRoute>
            <CourseDetails/>
          </PublicRoute>
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
