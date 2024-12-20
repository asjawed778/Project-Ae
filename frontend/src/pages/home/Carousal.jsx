import { useEffect, useState, useRef } from 'react';
import user from '../../assets/user_icon2.png' ;
import live from '../../assets/liveTv.png' ;
// import clock from '../../assets/language2.png' ;
import clock from "../../assets/translate.png" ;
import noImage from "../../assets/no-image.png" ;
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getCourseByCategory } from '../../services/operations/addCourses';
import CourseCardSkeleton from '../../components/skeletons/CourseCardSkeleton';


export default function Carousal() {
  
  const carouselRef = useRef(null) ;
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
    <div className="p-4 lg:ml-0 lg:p-0 mt-10 w-full ">

      {/* Title and Subtitle */}
      {/* <div className=" mb-6 items-center lg:ml-[15%]"> */}
      <div className=' mb-6 items-center'>
        <h2 className="text-[32px] font-bold font-rale text-[#0768BB]">All the skills you need in one place</h2>
        <p className="text-black text-[20px] font-medium font-rale"
        >From critical skills to technical topics, AbilitaEdge supports your professional development.</p>
      </div>

      {/* Tab Menu */}
      
      {/* <div className="flex w-auto gap-4 lg:ml-[15%] space-x-1 mb-10 overflow-x-auto carousel  scroll-snap-x scroll-smooth"> */}
      <div className="flex w-auto gap-4 space-x-1 mb-[-17.5px] overflow-x-auto carousel  scroll-snap-x scroll-smooth lg:ml-3 ">
        {categories.map((tab) => (
          tab.courses.length > 0 && <button
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
    
      <hr style={{backgroundColor:"#36454F", height:"1px", position:"relative"}}
          className='w-[90vw] sm:w-[650px] md:w-[620px] lg:w-[900px] lg:ml-3 inline-block'
      /> <span className='text-[#0766C6] ml-1 text-nowrap'>View More</span>

       {/* Scrollable Course Cards, coursesAll */}
       { coursesAll ? ( 
        
       <div ref={carouselRef}
       className='space-x-2 carousel w-[90vw] sm:w-[650px] md:w-[700px] lg:w-[920px] items-center  mt-4 mb-2'>
        
          {coursesAll?.map((course, index) => (
            
            <Link to={`/course/${course._id}`} key={index} className="carousel-item min-w-[50%] sm:min-w-[40%] md:min-w-[30%] lg:min-w-[10%]">
             <div className="flex flex-col bg-white rounded-[14px] shadow-custom p-0 w-[296px] h-[321px] mb-2 m-0">
              { 
                (typeof course.thumbnail === "string" && course.thumbnail.includes("[object Object]")) ? 
                <img src={noImage} alt={course.title} className="w-[40%] h-40 rounded-lg object-fill mb-2 mx-auto" />
                : 
                <img src={course.thumbnail} alt={course.title} className="w-[100%] h-[165px] rounded-lg object-fill mb-2" />
                
              }
              <div className=" flex flex-row flex-wrap items-center justify-center text-[15.52px] w-[246px] h-[46px] text-[#0B7077] font-extrabold font-sans mb-2 ml-2 ">{course.courseTitle}</div>
              
              <hr style={{backgroundColor:"#E0E0E0", height:"1px"}} 
                className='w-[258px] ml-[14px] mt-6'
              />
              <div className='flex flex-row justify-between items-start gap-4 mt-4 h-[38px] ml-2'>
              
              <div className='flex flex-row gap-5'>
              
               <div className='flex flex-row items-center mb-3 w-[60px]'>
                <img src={live} alt='userLive' className='w-[24px] h-[24px]'/> 
                <p className='text-[#000000] text-[12px] font-medium font-rale p-1'>{course.courseMode.charAt(0).toUpperCase() + course.courseMode.slice(1).toLowerCase()}</p>
               </div>
              
              
               <div className='flex flex-row items-center mb-3 w-[70px] '>
                <img src={clock} alt='clock' className='w-[22px] h-[22px]'/>
                <p className="text-[#000000] text-[12px] font-medium font-rale p-1.5">{course.courseLanguage.charAt(0).toUpperCase()+course.courseLanguage.slice(1).toLowerCase()}</p>
               </div>
              
              </div>

               <div className="mr-3 h-[34px] w-[102px] px-1 text-[#FFFFFF] text-[12px]  rounded-md hover-shadow-[4px_4px_0px_rgba(128,128,128,1)] bg-[#0C7077] font-medium hover:shadow-[2px_2px_0px_rgba(128,128,128,1)] transition-all duration-200 flex items-center justify-center "
               >
               Learn More
              </div>
             

              </div>

            </div>
            </Link>
          ))}
        
      </div> ) : (
        <CourseCardSkeleton/>
      )}
      
      {/* navigation buttons */}
       <div className='flex flex-row item-center justify-between w-[90vw] sm:w-[650px] md:w-[700px] lg:w-[1010px] mt-8'>
          
          {/* backward */}
          <div
          onClick={() => carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })}
          className=" z-10 w-[50px] h-[50px] bg-[#FFFFFF] text-[#5F6368] text-[24px] rounded-full shadow-custom flex items-center justify-center cursor-pointer "
        >
           &#x2190;
        </div>

        {/* forward */}
        <div
          onClick={() => carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
          className="z-10 w-[50px] h-[50px] bg-[#FFFFFF] text-[#5F6368] text-[24px] rounded-full shadow-custom flex items-center justify-center cursor-pointer "
        >
           &#x2192;
        </div>

      </div> 
    </div>
  );
}
