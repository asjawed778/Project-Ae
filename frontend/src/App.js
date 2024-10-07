import { Route, Routes } from 'react-router-dom';
import './App.css';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
