import { GoHome } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import { PiGreaterThanBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import coder from "../assets/coder.jpg" ;
import { useEffect } from "react";
import Header from "../components/common/Header";
import { getCourseDetails } from "../services/operations/addCourses";
import {easeIn, motion} from 'framer-motion' ;
import parse from "html-react-parser" ;
import { Link } from "react-router-dom"; 

const CourseDetails = () => { 

  const dispatch = useDispatch() ;

  const {id} = useParams() ;
  const courseDetail = useSelector((state) => state.courseDetails) ;
  console.log("courseDetail", courseDetail.courseDetails.course) ;

  const title = courseDetail?.courseDetails?.course?.courseTitle ;
  const subtitle = courseDetail?.courseDetails?.course?.courseSubTitle ;
  const brochure = courseDetail?.courseDetails?.course?.brochure ;
  const courseDesciption = courseDetail?.courseDetails?.course?.courseDescription ;
  //console.log(courseDesciption.toString()) ;
  const keyPoints = courseDetail?.courseDetails.course?.keyPoints ;

  const openPDF = () => {
    window.open(brochure,"_blank") ;
  } ;

  useEffect(()=>{
    dispatch(getCourseDetails(id)) ;
  },[dispatch]) ;

  
  useEffect(()=> {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional for a smooth scroll animation
      });
    };

    scrollToTop() ;
  },[]) 

  return (
    
      <div className="">
        <Header/>
        
      <div className="bg-amber-50 mt-1 max-h-35 " >
       <div className=" flex space-x-5  max-w-5xl mx-auto ">
        <h1 classname="size-2.5 "> 
          <div style={{color: 'grey'}}>
            <Link to="/">
             <GoHome size={30} />
            </Link>
          
          </div>
        </h1>
        <p className="size-2"><PiGreaterThanBold color="slate" size={16} className="mt-2 p-0 "/>{""}</p>
        <h1 className="text-gray-600 font-medium pt-1 pl-3">{title}</h1>
      </div>
      <div className="  mt-5 max-w-5xl mx-auto flex space-x-40">
        <div className="w-[500px]">
        <h1 className="text-3xl font-bold">{title}</h1>
        <h2 className="mt-1.5 font-semibold">{subtitle}</h2>
        <ul className="mt-10">
          {keyPoints?.map((point, index) => (
           <li key={index} className="mb-2 font-medium flex">
            <div style={{ color: "#3B82F6" }}>
              <FaCircleCheck size={15} className="mt-1" />
            </div>
            <div className="ml-2">{point}</div>
           </li>
          ))}
        </ul> 

        <button onClick = {openPDF} className="bg-blue-500 text-white p-3 rounded-md mt-5">Download Brochure</button>
        </div>
        
        <div>
            <img src={coder} alt="coding" className="h-[200px] rounded-lg mr-1 "/>
        </div>
      </div>
      </div>
      <div className="mt-10 max-w-5xl mx-auto flex space-x-10 mb-10">
        <div className="w-[560px]">
        <h1 className="font-bold">Explore Our Immersive {title} Bootcamp</h1>
        {/* <p>{courseDesciption}</p> */}
        <div
         dangerouslySetInnerHTML={{ __html: courseDesciption }}
        />
        <p className="font-bold text-blue-500 pt-3.5">Course Highlights</p>
        </div>
        
        <div className="p-5 space-y-4 flex-col border-[2px] shadow-lg h-full">

        
        <div className="bg-white p-2 sm:p-4 rounded-lg w-[350px] sm:w-80 md:w-80">
          <h3 className=" sm:text-lg font-sans text-blue-600 mb-4">
           Book a Live Class, For Free!
          </h3>

        <form className="space-y-4 font-sans">
          
          <motion.input
           type="text"
           placeholder="Name"
           className="w-full px-4 py-2 sm:py-1.5 border rounded-md font-sans focus:border-blue-600 focus:outline-none"
           initial={{ borderColor: "#ccc" }}
           whileFocus={{ borderColor: "#00BFFF", scale: 1.05 }}
           transition={{ duration: 0.2 }}
          />
          
          <motion.input
           type="number"
           placeholder="Mobile No"
           className="w-full px-4 py-2 sm:py-1.5 border rounded-md focus:border-blue-600 focus:outline-none"
           initial={{ borderColor: "#ccc" }}
           whileFocus={{ borderColor: "#00BFFF", scale: 1.05 }}
           transition={{ duration: 0.2 }}
          />
          
          <motion.input
           type="text"
           placeholder="Education"
           className="w-full px-4 py-2 sm:py-1.5 border rounded-md focus:border-blue-600 focus:outline-none"
           initial={{ borderColor: "#ccc" }}
           whileFocus={{ borderColor: "#00BFFF", scale: 1.05 }}
           transition={{ duration: 0.2 }}
          />
          
          <motion.input
           type="text"
           placeholder="Course"
           className="w-full px-4 py-2 sm:py-1.5 border rounded-md focus:border-blue-600 focus:outline-none"
           initial={{ borderColor: "#ccc" }}
           whileFocus={{ borderColor: "#00BFFF", scale: 1.05 }}
           transition={{ duration: 0.2 }}
          />

         <label className="flex items-center space-x-2">
           <input type="checkbox" />
           <span className="text-sm font-sans">Send me updates on WhatsApp</span>
         </label>
         
         <motion.button 
           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans py-2 sm:py-1.5 rounded-md"
           whileHover={{ scale: 1.05, backgroundColor: "#007BFF" }}
           whileTap={{ scale: 0.95 }}
         >
           Submit
         </motion.button>

       </form>
      </div>
</div>
      </div>
    </div>
  )
}


export default CourseDetails