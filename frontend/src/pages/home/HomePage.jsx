import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Courses from "./Carousal";
import { useState } from "react";
import bar from '../slider/Hamburger_icon.png'
import Footer from "../../components/common/Footer";
import backgroundImage from "../slider/Artboard.png" ;
//framer motion
import {easeIn, motion} from 'framer-motion' ;

function HomePage() {
  
  
  const [isMenuOpen, setIsMenuOpen] = useState(false) ;
  
  return (

    <div className="h-[110%] flex flex-col items-center w-auto font-sans">
      
      
      {/* Header */}
      <nav className="bg-white border-gray-200 w-full">

      <div className={`max-w-screen-xl flex flex-wrap items-center gap-20 mx-auto p-4 justify-around md:ml-[10%] sm:justify-normal`}>
      <span className="text-2xl md:text-3xl font-sans text-black-600">Abilita<span className="text-blue-600 font-sans">Edge</span>
      </span>

        <div className=" md:order-2">
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden text-gray-500 rounded-lg text-sm p-2.5 me-1 "
            aria-controls="navbar-search"
            aria-expanded={isMenuOpen}
          >
           
            <img src={bar} alt="bar" className="w-[30px] h-[30px]"/>
            <span className="sr-only">Search</span>
          </button>

        </div>

        <div className={` items-center justify-between ${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1 `} id="navbar-search">
          
          <div className=" relative w-auto md:w-1/3 mt-[-60px] md:mt-0 rounded-[14px] lg:w-[300px]">
          
          <span className="absolute inset-y-0 left-3 flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5 text-[#0b66c3]" />
          </span>
       
          <input
            type="text"
            placeholder="Type to search"
            className="w-auto pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#f1f2f5] text-[#707070] font-sans"           />
       
          </div>

       <button className="text-blue-600 font-sans mt-4  md:mt-0  md:ml-10">
         Learning
       </button>
        </div>
      </div>
      </nav>


      {/* Main Section */}
      <div  style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} 
      className={`w-full flex flex-col md:flex-row items-center justify-around p-4 `}>

        {/* Text Section */}
        <div className="flex flex-col items-start text-left text-white px-4 mb-8 ">
        <motion.h2
        className="text-2xl md:text-4xl font-sans"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease:easeIn, duration: 2 }}
      >
        Transform Your Abilities
      </motion.h2>

      <motion.h2 
        className=" text-2xl md:text-4xl font-sans mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease:easeIn, duration: 2 }}
      >
       Into Capabilities
      </motion.h2>

          <motion.p 
            className="text-white mb-1 font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease:easeIn, duration: 2 }}
          >
            Join this 20 weeks, Job-ready Program to master
          </motion.p>

          <motion.p 
            className="text-white mb-1 font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease:easeIn, duration: 2 }}
          >
            Data Analytics from scratch with Top Data Analysts
          </motion.p>

          <motion.p 
            className="text-white mb-4 font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease:easeIn, duration: 2}}
          >
            from Microsoft, KPMG, Amazon, and Rapido.
          </motion.p>

          <motion.button 
            className="relative bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease:easeIn, duration: 2}}
          >
            <span className="relative z-10 font-sans">Explore Program</span>

            {/* Decorative lines */}
            <span className="absolute right-0 bottom-0 w-1 h-full bg-white opacity-50"></span>
            <span className="absolute left-0 bottom-0 w-full h-1 bg-white opacity-50"></span>
          </motion.button> 

        </div>
        

        {/* Form Section */}
        
        <div className="bg-white p-6 sm:p-4 rounded-lg shadow-black w-[350px] sm:w-80 md:w-80">
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


      {/* Skill Boxes */} 
      <motion.div 
         className="mt-10 flex flex-wrap flex-col md:flex-row gap-4 justify-center px-4"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ ease:"linear", duration: 2}} 
      >
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-sans p-8 sm:p-6 rounded-lg shadow-lg h-48 w-80 md:w-56 lg:w-80 flex flex-col items-start">
         <h1 className="text-2xl lg:text-2xl">Foundational</h1>
         <h1 className="text-2xl lg:text-2xl">Skills</h1>
        </div>
        
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-sans p-8 sm:p-6 rounded-lg shadow-lg h-48 w-80 md:w-56 lg:w-80 flex flex-col items-start">
         <h1 className="text-2xl lg:text-2xl">Employability</h1>
         <h1 className="text-2xl lg:text-2xl">Skills</h1>
        </div>
        
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-sans p-8 sm:p-6 rounded-lg shadow-lg h-48 w-80 md:w-56 lg:w-80 flex flex-col items-start">
         <h1 className="text-2xl lg:text-2xl">Entrepreneurial</h1>
         <h1 className="text-2xl lg:text-2xl">Skills</h1>
        </div>
      </motion.div>


      {/* Courses Section */}
      <div className="flex items-center justify-center lg:w-[1000px]">
       <Courses />
      </div>
      

      <Footer/>

    </div>
  );
}

export default HomePage;

