import Avatar from '../assets/g_p.jpeg';
import './Home.css';
import More2 from '../assets/more.png';
import CreatePost from './CreatePost.jsx';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../services/operations/authApi.js';

function Home() {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className='home'>

      {/*header containing home and img username name*/}
      <header>

        <h3>Home</h3>
        <div className='profile'>

          <img src={Avatar} className='profile-img' />
          <div className='profile-info'>
            <span>Name</span>
            <span>userName</span>
          </div>
          <img src={More2} className='more-icon' onClick={handleLogout} />

        </div>


      </header>


      <div className='create-post'>

        <hr />
        <CreatePost />
        <hr />

      </div>


    </div>
  )
}

export default Home;