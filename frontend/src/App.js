import { Route, Routes } from 'react-router-dom';
import './App.css';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import PublicRoute from './components/core/PublicRoute';
import PrivateRoute from './components/core/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path='/auth' element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        } />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
