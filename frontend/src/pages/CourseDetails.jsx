import { GoHome } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import { PiGreaterThanBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import coder from "../assets/coder.jpg" ;
import { useEffect } from "react";
import Header from "../components/common/Header";
import { getCourseDetails } from "../services/operations/addCourses";

const CourseDetails = () => { 

  const dispatch = useDispatch() ;

  const {id} = useParams() ;
  const courseDetail = useSelector((state) => state.courseDetails) ;
  console.log("courseDetail", courseDetail.courseDetails.course) ;

  const title = courseDetail?.courseDetails?.course?.courseTitle ;

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

      <div className="flex space-x-5 mt-3 max-w-5xl mx-auto">
        
        <h1 className="size-2.5"> 
          <div style={{color: 'grey'}}>
            <GoHome size={30} />
          </div>
        </h1> 

        <p className="size-3"><PiGreaterThanBold color="grey" size={20} className="mt-2"/>{""}</p>
        <h1 className="text-gray-600 font-semibold mt-1">{title}</h1>
      </div>
      <div className="mt-5 max-w-5xl mx-auto flex space-x-40">
        <div>
        { courseDetail ? (
            <h1 className="text-3xl font-bold">{title} Course</h1>
        ) : (
          <p>Loading....</p>
        )
      }
       
        <h2 className="mt-1.5 font-semibold">Learn Complete {title} from Basic to Advanced</h2>
        <ul className="mt-10">
          <li className="mb-1 font-medium flex"> <div style={{color: '#3B82F6'}}>
          <FaCircleCheck size={15} className="mt-2" /></div><div className="ml-2">Master  the core concepts of Python programming</div></li>
            <li className="mb-1 font-medium  flex"><div style={{color: '#3B82F6'}}>
            <FaCircleCheck size={15}  className="mt-1" /></div><div className="ml-2">Learn under the guidance of experienced trainners</div></li>
             <li className="mb-2 font-medium flex">  <div style={{color: '#3B82F6'}}>
             <FaCircleCheck size={15}  className="mt-1" /></div><div className="ml-2">Get hands on practise with guided excercises,work-like projects and more</div> </li>
        </ul>
        <button className="bg-blue-500 text-white p-3 rounded-md mt-5">Download Brochure</button>
        </div>
        <div>
            <img src={coder}
             className="w-[290px] rounded-md ml-5"
             />
        </div>
      </div>
      <div className="mt-10 max-w-5xl mx-auto flex space-x-10 mb-10">
        <div>
        <h1 className="font-bold">Explore Our Immersive {title} Bootcamp</h1>
        <p>Designed to get you hired, our power-packed {title} Developer Bootcamp features bect in-class hardng, plenty of harals-on exercises and assignments with Cloud Labs, and so much more. Build a stellar project portfolio get ready to crack interviews at product based companies, and launch your career as a Full Stack Developer</p><br />
        <p>Due revamped Full Stack Developer Bootcamp Online, now offers expertly crafted recorded streaming sessions that elevate your educationa вкритное. Those meticulously planned sessions, created by top intruttore and progenators, promsse unmutched clarity and engagement</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consequuntur velit corporis unde. Reprehenderit dignissimos dolor cum. Alias, hic enim voluptatum necessitatibus ad, quod quibusdam earum pariatur iusto corrupti qui!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consequuntur velit corporis unde. Reprehenderit dignissimos dolor cum. Alias, hic enim voluptatum necessitatibus ad, quod quibusdam earum pariatur iusto corrupti qui!
        </p><br />
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cum repellendus sed voluptates. Tempora, laboriosam animi.</p>
       
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consequuntur velit corporis unde. Reprehenderit dignissimos dolor cum. Alias, hic enim voluptatum necessitatibus ad, quod quibusdam earum pariatur iusto corrupti qui!
        </p><br />
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cum repellendus sed voluptates. Tempora, laboriosam animi.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, veniam?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consequuntur velit corporis unde. Reprehenderit dignissimos dolor cum. Alias, hic enim voluptatum necessitatibus ad, quod quibusdam earum pariatur iusto corrupti qui!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consequuntur velit corporis unde. Reprehenderit dignissimos dolor cum. Alias, hic enim voluptatum necessitatibus ad, quod quibusdam earum pariatur iusto corrupti qui!
        </p>
        <p className="font-bold text-blue-500 pt-3.5">Course Highlights</p>
        </div>
        

        <div className="p-5 space-y-4 flex-col border-[2px] shadow-lg h-full">
            <h1 className="text-blue-500 font-bold">Book a Live Class, For Free!</h1>
            <input type="text" placeholder="Name" className="w-full border-2 px-2 text-blue-400"/>
            <input type="text" placeholder="Mobile No." className="w-full border-2 px-2"/>
            <input type="text" placeholder="Education" className="w-full border-2 px-2"/>
            <input type="text" placeholder="Course" className="w-full border-2 px-2"/><br /> 
            <input type="radio" name="Whatsapp" id="Whatsapp" className=""/><span className="pl-2">Send me an update on Whatsapp</span>
            <br />
            <input type="submit" className="w-full p-1 bg-blue-500 text-white rounded-md"/>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails