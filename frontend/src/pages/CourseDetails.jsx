import { GoHome } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import { PiGreaterThanBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import coder from "./slider/coder.jpg" ;

const CourseDetails = () => { 

  const courses = useSelector((state) => state.courses);
  console.log("CourseDetials", courses.courses.allCourse) ;
  const course = courses.courses.allCourse ;
  const {id} = useParams() ;
  console.log("id", id) ;
  const specificCourse = course.filter((course) => course._id === id);
  console.log("specific course",specificCourse) ;
  
  return (
    <div className="">
        <div className="mt-3 border-b-2 pb-5">
            <div className="max-w-5xl mx-auto flex justify-between">
      <h1 className="text-3xl font-bold">Abilita<span className="text-blue-500">Edge</span></h1>
     <div className="flex gap-1"><div  className="pt-3"style={{color:'grey'}}><RiSearchLine size={20} /></div> <input type="text"  placeholder="Type to Search" className="border-2 w-[400px] px-2 rounded-lg  flex justify-center"/></div>
      <button className="text-blue-500">Learning</button>
      </div>
      </div>
      <div className="flex space-x-5 mt-3 max-w-5xl mx-auto">
        <h1 classname="size-2.5"> <div style={{color: 'grey'}}>
  <GoHome size={30} />
</div></h1>
        <p className="size-3"><PiGreaterThanBold color="grey" size={20} className="mt-1"/>{""}</p>
        <h1 className="text-gray-600 font-semibold">{specificCourse[0].courseTitle}</h1>
      </div>
      <div className="mt-5 max-w-5xl mx-auto flex space-x-40">
        <div>
        <h1 className="text-3xl font-bold">{specificCourse[0].courseTitle} Course</h1>
        <h2 className="mt-1.5 font-semibold">Learn Complete {specificCourse[0].courseTitle} from Basic to Advanced</h2>
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
             className="w-[290px] rounded-md"
             />
        </div>
      </div>
      <div className="mt-10 max-w-5xl mx-auto flex space-x-10 mb-10">
        <div>
        <h1 className="font-bold">Explore Our Immersive {specificCourse[0].courseTitle} Bootcamp</h1>
        <p>Designed to get you hired, our power-packed {specificCourse[0].courseTitle} Developer Bootcamp features bect in-class hardng, plenty of harals-on exercises and assignments with Cloud Labs, and so much more. Build a stellar project portfolio get ready to crack interviews at product based companies, and launch your career as a Full Stack Developer</p><br />
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