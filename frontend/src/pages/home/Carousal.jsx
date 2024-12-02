import { useEffect, useState } from 'react';
import user from '../slider/user_icon2.png' ;
import clock from '../slider/language2.png' ;
import AndroidDevImg from '../slider/AndroidDevelopment.png' ;
import FullStackImg from '../slider/MERNFullStackBanner.png' ;
import DataScience from '../slider/DataScience.png' ;
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getAllCourses, getCourseByCategory } from '../../services/operations/addCourses';

export default function Carousal() {
  
  const dispatch = useDispatch() ; 

  // otherwise it is called again and again
  useEffect(()=>{
    dispatch(getAllCategory()) ;
  },[]) 

  const categories = useSelector((state)=> state.categories.categories) ;
  console.log(categories) ;
  const coursesAll = useSelector((state) => state.courses.courses.courses) ;
  console.log("courses", coursesAll) ;

  
  const [activeTab, setActiveTab] = useState(null); // Start with null or a default value

  useEffect(() => {
   if (categories.length > 0 && !activeTab) {
    setActiveTab(categories[0]._id); // Set the default value when categories are fetched
   }
  }, [categories]); // Run this effect whenever categories change
  

  
  useEffect(()=>{

    if( activeTab ) {
    dispatch(getCourseByCategory(activeTab)) ;
    }
  },[activeTab]) ;
  

  return (
    <div className="p-8 mt-4 w-full ">

      {/* Title and Subtitle */}
      {/* <div className=" mb-6 items-center lg:ml-[15%]"> */}
      <div className=' mb-6 items-center'>
        <h2 className="text-2xl font-sans text-blue-600">All the skills you need in one place</h2>
        <p className="text-gray-600 font-sans"
        >From critical skills to technical topics, AbilitaEdge supports your professional development.</p>
      </div>

      {/* Tab Menu */}
      
      {/* <div className="flex w-auto gap-4 lg:ml-[15%] space-x-1 mb-10 overflow-x-auto carousel  scroll-snap-x scroll-smooth"> */}
      <div className="flex w-auto gap-4 space-x-1 mb-10 overflow-x-auto carousel  scroll-snap-x scroll-smooth ">
        {categories.map((tab) => (
          <button
            key={tab._id}
            onClick={() => {
              setActiveTab(tab._id)
              
            }}
            
           // min-w-fit font-semibold px-4 py-2 flex justify-center items-center
            className={` min-w-fit font-sans px-0 py-2 flex justify-center items-center border-b-2 ${
              activeTab === tab._id ? " border-blue-600 text-blue-500" 
                                : " border-transparent text-gray-600 carousel-item"
            }`}
          >
            {tab.categoryName}
          
          </button>
          
          
        ))}
        
        
      </div>
      {/* <hr style={{backgroundColor:"#36454F", marginTop:"-40px", height:"1px",}}
          className='lg:w-[70%] lg:ml-[15%]'
      />  */}
      <hr style={{backgroundColor:"#36454F", marginTop:"-41px", height:"1px", position:"relative"}}
          className='lg:w-[70%] '
      /> 

       {/* Scrollable Course Cards */}
       {coursesAll ? (
       <div className='space-x-2 carousel rounded-box w-[100%] lg:w-3/4 items-center mt-4'>
        
          {coursesAll?.map((course, index) => (
            
            <Link to={`/course/${course._id}`} key={index} className="carousel-item min-w-[50%] sm:min-w-[40%] md:min-w-[30%] lg:min-w-[10%]">
             <div className="flex flex-col bg-white rounded-lg shadow-md p-0">
              <img src={course.thumbnail} alt={course.courseTitle} className="w-[100%] h-40 rounded-lg object-cover mb-2" />
              <h3 className="text-base font-sans mb-2 ml-2">{course.courseTitle}</h3>
              
              <div className='flex flex-row gap-4 mt-3 h-[38px] ml-2'>
              
               <div className='flex flex-row items-center mb-3 w-[60px]'>
                <img src={user} alt='userLive' className='w-[24px] h-[24px] '/> 
                <p className='text-gray-600 text-sm font-sans'>{course.courseMode.charAt(0).toUpperCase() + course.courseMode.slice(1).toLowerCase()}</p>
               </div>
              
              
               <div className='flex flex-row items-center mb-3 w-[70px] '>
                <img src={clock} alt='clock' className='w-[24px] h-[24px]'/>
                <p className="text-gray-600 text-sm font-sans ">{course.courseLanguage.charAt(0).toUpperCase()+course.courseLanguage.slice(1).toLowerCase()}</p>
               </div>

               <div className=" h-[28px] w-[95px]  px-1 text-gray-600 border-2 border-gray-600 rounded-lg hover-shadow-[4px_4px_0px_rgba(128,128,128,1)] bg-white font-medium hover:shadow-[2px_2px_0px_rgba(128,128,128,1)] transition-all duration-200"
               >
               Learn More
              </div>
             

            </div>
            </div>
            </Link>
          ))}
       
      </div> ) : (
        <div className="text-center text-gray-600">Loading courses...</div>
      )}
      
      
    </div>
  );
}
