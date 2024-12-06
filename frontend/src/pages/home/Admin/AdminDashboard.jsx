// import React from 'react' ;
// import AddCourse from '../../../components/common/admin/AddCourse';
// import HambergIcon from '../../../assets/menu.png' ;


// const AdminDashboard = () => {
    
//     const[isOpen, setIsOpen] = React.useState(false) ;
//     const [drawer, setDrawer] = React.useState(false) ;

//     const toggleDropdown = () => {
//         setDrawer(!drawer);
//     };

//     return(
//         <div className=' flex flex-row'>
         
//         { /* Left component Admin Sidebar */ }
//         <div className={`h-auto ${ !isOpen ? "items-start": ""}`}>
//          {/* Sidebar */}
//            <div
//              className={`fixed z-50 inset-y-0 left-0 transform bg-gray-800 text-white w-64 max-h-full p-4 transition-transform duration-300 ease-in-out
//              ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:w-80 lg:h-screen`}
//            >  
            
//             <p className='lg:hidden ml-[90%] text-2xl font-thin text-white'
//                onClick={() => setIsOpen(!isOpen)}
//             >
//                X
//             </p>
        
//             <h2 className="text-2xl mb-6">Dashboard </h2>   
        
//            <div>

//       {/* Dropdown Element */}
//       <div
//         onClick={toggleDropdown}
//         className="flex items-center space-x-2 px-4 py-2 bg-gray-800  hover:bg-gray-700 text-white rounded-md focus:outline-none"
//       >
        
//         {/* Text label */}
//         <span className="text-[20px]">Courses</span>
//         {/* Down arrow icon */}
//         <svg
//           className={`w-4 h-4 text-gray-400 transform transition-transform ${drawer ? 'rotate-180' : ''}`}
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </div>

//       {/* Dropdown Menu */}
//       {drawer && (
//         <div className="left-0 mt-2 w-48  text-white rounded-md z-10">
//           <a
//             href="#add-course"
//             className="block px-8 py-2 text-sm hover:bg-gray-700 rounded-t-md"
//           >
//             Add Course
//           </a>
//           <a
//             href="#manage-courses"
//             className="block px-8 py-2 text-sm hover:bg-gray-700"
//           >
//             Manage Courses
//           </a>
//           <a
//             href="#view-courses"
//             className="block px-8 py-2 text-sm hover:bg-gray-700 rounded-b-md"
//           >
//             View Courses
//           </a>
//         </div>
//       )}
//     </div>

//   </div>

//       {/* Toggle button for mobile */}
//       <div className='flex flex-col w-full'>
//       {  !isOpen &&
//       <button
//         className={`lg:hidden top-2 left-4 ml-3 z-20 ${isOpen ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-2 rounded`}

//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <img src={HambergIcon} alt='sorry' className='w-[25px] h-4' />
//       </button>
//       } 

      
//       </div>
//         </div>
        
//         {/* Right Component Admin */}
//         <div className=" w-full overflow-y-auto h-screen">
//          <AddCourse />
//         </div>

//        </div>
//     )
// }

// export default AdminDashboard ;

import React from 'react';
import AddCourse from '../../../components/common/admin/AddCourse';
import HambergIcon from '../../../assets/menu.png';
import logo from "../../../assets/logo.jpg" ;

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [drawer, setDrawer] = React.useState(false);

  const toggleDropdown = () => {
    setDrawer(!drawer);
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-50 inset-y-0 left-0 transform bg-[#11101d] text-white w-64 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:w-80`}
      >
        <div className="flex justify-between items-center px-6 py-4 font-sans">
          <h2 className="text-xl font-sans">Admin</h2>
          <button onClick={() => setIsOpen(false)} className="text-white text-2xl lg:hidden">
            ✖
          </button>
        </div>
        <h2 className="text-xl px-6 py-4 font-sans">Dashboard</h2>
        <div className="px-4">
          {/* Dropdown */}
          <div
            onClick={toggleDropdown}
            className="flex items-center justify-between px-4 py-3 hover:bg-[#fff] hover:text-[#1d1b31] text-white rounded-lg cursor-pointer"
          >
            <span>Courses</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${drawer ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {drawer && (
            <div className="bg-[#1d1b31] mt-2 rounded-lg shadow-lg">
              <a href="#add-course" className="block px-6 py-2 hover:bg-[#fff] hover:text-[#1d1b31]">
                Add Course
              </a>
              <a href="#manage-courses" className="block px-6 py-2 hover:bg-[#fff] hover:text-[#1d1b31]">
                Manage Courses
              </a>
              <a href="#view-courses" className="block px-6 py-2 hover:bg-[#fff] hover:text-[#1d1b31]">
                View Courses
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header for mobile */}
        <header className="bg-white shadow-lg flex items-center justify-between px-4 py-3 lg:hidden">
          <button onClick={() => setIsOpen(true)} className="text-gray-800">
            <img src={HambergIcon} alt="Menu" className="w-6 h-6" />
          </button>
          <img src={logo} alt='AbilitaEdge' className='w-[150px]'/>
          {/* <h1 className="text-xl font-sans">Admin Dashboard</h1> */}
        </header>

        {/* Main Content Area */}
        <div className="p-6 bg-gray-100 h-full overflow-y-auto">
          <AddCourse />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
