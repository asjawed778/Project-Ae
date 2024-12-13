import Courses from "./Carousal";
import Footer from "../../components/common/Footer";
import backgroundImage from "../../assets/Artboard.png" ;
import banner_girl from "../../assets/banner_girl.png"
//framer motion
import {easeIn, motion} from 'framer-motion' ;
import Header from "../../components/common/Header";

function HomePage() {

  return (

    <> 
     <Header/>

     <div className=" flex flex-col items-center w-full font-sans">
      
      {/* Main Section */}
      <div  style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} 
      className={`w-full flex flex-col sm:flex-row items-center justify-around p-4 `}>

        {/* Text Section */}
        <div className="flex flex-col items-start text-left text-white px-4 mb-8 ">
        <motion.h2
        className="text-[42px] md:text-4xl font-semibold font-sans"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease:easeIn, duration: 2 }}
      >
        Transform Your Abilities Into
      </motion.h2>

      <motion.h2 
        className=" text-[42px] md:text-4xl font-sans mb-4 font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease:easeIn, duration: 2 }}
      >
       Capabilities
      </motion.h2>

          <motion.p 
            className="text-white font-sans text-[20px] font-semibold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease:easeIn, duration: 2 }}
          >
            Join this 20 weeks, Job-ready Program to master
          </motion.p>

          <motion.p 
            className="text-white font-sans text-[20px] font-semibold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease:easeIn, duration: 2 }}
          >
            Data Analytics from scratch with Top Data Analysts
          </motion.p>

          <motion.p 
            className="text-white mb-4 font-sans text-[20px] font-semibold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease:easeIn, duration: 2}}
          >
            from Microsoft, KPMG, Amazon, and Rapido.
          </motion.p>

          <motion.button 
            className="relative bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-[2px_2px_0px_rgba(255,255,255,1)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease:easeIn, duration: 2}}
          >
            <span className="relative z-10 font-sans ">Explore Program</span>
          </motion.button> 

        </div>
        

        {/* Form Section */}
        
        <div className="bg-[#FFFFFF] p-6 sm:p-4 rounded-lg shadow-black lg:w-[400px] lg:h-[408px] sm:w-80 md:w-80">
          <h3 className=" sm:text-lg font-extrabold font-sans text-[#0766C6] mb-4 text-[20px]">
           Book Your Free Demo Class
          </h3>

        <form className="space-y-4 font-sans">
          
          <div className="flex flex-row gap-2">
          <motion.input
           type="text"
           placeholder="First Name"
           className="w-[50%] px-4 py-2 sm:py-1.5 text-[#000] border rounded-md font-rale text-[15px] focus:border-blue-600 focus:outline-none inline-block"
           initial={{ borderColor: "#ccc" }}
           whileFocus={{ borderColor: "#00BFFF", scale: 1.05 }}
           transition={{ duration: 0.2 }}
          />  
          
          <motion.input
          type="text"
          placeholder=" Last Name"
          className="w-[50%] px-4 py-2 sm:py-1.5 text-[#000] border rounded-md font-rale text-[15px] focus:border-blue-600 focus:outline-none "
          initial={{ borderColor: "#ccc" }}
          whileFocus={{ borderColor: "#00BFFF", scale: 1.05 }}
          transition={{ duration: 0.2 }}
         />
          </div>
          
          <motion.input
           type="email"
           placeholder="Email Address"
           className="w-full px-4 py-2 sm:py-1.5 text-[#000] border rounded-md font-rale text-[15px] focus:border-blue-600 focus:outline-none"
           initial={{ borderColor: "#ccc" }}
           whileFocus={{ borderColor: "#00BFFF", scale: 1.05 }}
           transition={{ duration: 0.2 }}
          />

          <motion.input
           type="number"
           placeholder="Mobile No"
           className="w-full px-4 py-2 sm:py-1.5 text-[#000] border rounded-md font-rale text-[15px] focus:border-blue-600 focus:outline-none"
           initial={{ borderColor: "#ccc" }}
           whileFocus={{ borderColor: "#00BFFF", scale: 1.05 }}
           transition={{ duration: 0.2 }}
          />
          
          <motion.input
           type="text"
           placeholder="Education"
           className="w-full px-4 py-2 sm:py-1.5 text-[#000] border rounded-md font-rale text-[15px] focus:border-blue-600 focus:outline-none"
           initial={{ borderColor: "#ccc" }}
           whileFocus={{ borderColor: "#00BFFF", scale: 1.05 }}
           transition={{ duration: 0.2 }}
          />
          
          <motion.input
           type="text"
           placeholder="Interested Course"
           className="w-full px-4 py-2 sm:py-1.5 text-[#000] border rounded-md font-rale text-[15px] focus:border-blue-600 focus:outline-none"
           initial={{ borderColor: "#ccc" }}
           whileFocus={{ borderColor: "#00BFFF", scale: 1.05 }}
           transition={{ duration: 0.2 }}
          />

         <label className="flex items-center space-x-2">
           <input type="checkbox" />
           <span className="text-sm font-rale font-normal text-[12px]">Send me updates on WhatsApp</span>
         </label>
         
         <motion.button 
           className="w-full bg-[#0766C6] hover:bg-blue-700 text-white font-sans py-2 sm:py-1.5 rounded-md"
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
         className="mt-10 flex flex-col sm:flex-row gap-4 justify-center px-4"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ ease:"linear", duration: 2}} 
      >
        <div className="bg-custom-gradient text-white font-sans p-8 sm:p-6 rounded-lg shadow-lg h-48 w-80 sm:w-48 md:w-56 lg:w-80 lg:h-[226px] flex flex-col items-start justify-center">
         <h1 className="text-[38px] sm:text-[28px] md:text-[25px] lg:text-[40px] ">Foundational</h1>
         <h1 className="text-[38px] sm:text-[28px] md:text-[25px] lg:text-[40px]">Skills</h1>
        </div>
        
        <div className="bg-custom-gradient text-white font-sans p-8 sm:p-6 rounded-lg shadow-lg h-48 w-80 sm:w-48 md:w-56 lg:w-80 lg:h-[226px] flex flex-col items-start justify-center">
         <h1 className="text-[38px] sm:text-[28px] md:text-[25px] lg:text-[40px] ">Employability</h1>
         <h1 className="text-[38px] sm:text-[28px] md:text-[25px] lg:text-[40px]">Skills</h1>
        </div>
        
        <div className="bg-custom-gradient text-white font-sans p-8 sm:p-6 rounded-lg shadow-lg h-48 w-80 sm:w-48 md:w-56 lg:w-80 lg:h-[226px] flex flex-col items-start justify-center">
         <h1 className="text-[38px] sm:text-[28px] md:text-[25px] lg:text-[40px]">Entrepreneurial</h1>
         <h1 className="text-[38px] sm:text-[28px] md:text-[25px] lg:text-[40px]">Skills</h1>
        </div>
      </motion.div>


      {/* Courses Section */}
      <div className="flex items-center justify-center lg:w-[1000px]">
       <Courses />
      </div>

     
      
      {/* Banner Section */} 
    <div className= " w-[74%] sm:w-[80%] md:w-[700px] md:h-[220px] lg:w-[880px] lg:h-[254px]  mb-20 mt-20 bg-[#DF1C25] text-white md:p-10 rounded-lg flex flex-col md:flex-row p-2 md:items-center justify-between relative">
      
      <div className=" w-[50%] md:w-1/2">
        <h2 className="text-[8px] sm:text-[14px] mb-1 md:text-md lg:text-3xl font-bold ">
          Why You should buy <br /> Abilita Membership?
        </h2>
        <ul className="sm:space-y-2 w-[190px] sm:w-[500px] md:w-[600px] md:mt-4">
          <li className="flex items-center text-[6px] sm:text-[10px] lg:text-base">
            <span className=" w-2 h-2 md:w-4 md:h-4 flex items-center justify-center bg-white text-red-500 rounded-full mr-2">
              ✓
            </span>
            Teachers don't get lost in the grid view and have a dedicated Podium
            space.
          </li>
          <li className="flex items-start text-[6px] sm:text-[10px] lg:text-base">
            <span className=" w-2 h-2 md:w-4 md:h-4 flex items-center justify-center bg-white text-red-500 rounded-full mr-2">
              ✓
            </span>
            Teachers don't get lost in the grid view and have a dedicated Podium
            space.
          </li>
        </ul>
        <button className="bg-white text-red-500 mt-2 sm:mt-4 text-[4px] md:text-[12px] py-1 px-1 md:px-4 md:py-1 lg:px-6 lg:py-2 font-semibold rounded-lg shadow-lg hover:bg-gray-100">
          BUY NOW
        </button>
      </div>

      
      <div className="md:mt-0 md:w-1/2 flex right-0 mb-24  absolute ">
        <img
          src={banner_girl}
          alt="Membership"
          className="w-[181px] -mt-6 ml-[20%] sm:mt-[-83px] sm:w-[213px] sm:h-[200px] md:w-[270px] md:h-[313px] md:mt-0 lg:w-[380px] lg:h-[350px] lg:ml-32 md:ml-28 sm:object-cover "
        />
      </div>
    </div> 

   


      <Footer/>

    </div>
    </>
  );
}

export default HomePage;

