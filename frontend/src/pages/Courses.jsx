import { useState } from 'react';
import user from './slider/user.png' ;
import clock from './slider/clock.png' ;


export default function Courses() {
  const [activeTab, setActiveTab] = useState("Web Development");

  const tabs = ["Web Development", "Mobile Development", "Data Science", "Blockchain"];
  const courses = [
    {
      title: "Full Stack Website Development",
      sessions: "120 Live Sessions",
      duration: "20 Weeks",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL4kNXLTsLbjbaxapl0QFB_SBkCsuTT7pcfA&s" // Replace with actual image URLs
    },
    {
      title: "Full Stack Website Development",
      sessions: "120 Live Sessions",
      duration: "20 Weeks",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ebvWHaqyU86bEEZ3dbEwIbXYHZLNYqqwhQ&s"
    },
    {
      title: "Full Stack Website Development",
      sessions: "120 Live Sessions",
      duration: "20 Weeks",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2AUJPOuEp8CTvMqfLuaG8rHRRd13Gk7tsEg&s"
    },

    {
        title: "Full Stack Website Development",
        sessions: "120 Live Sessions",
        duration: "20 Weeks",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL4kNXLTsLbjbaxapl0QFB_SBkCsuTT7pcfA&s" // Replace with actual image URLs
      },

      {
        title: "Full Stack Website Development",
        sessions: "120 Live Sessions",
        duration: "20 Weeks",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ebvWHaqyU86bEEZ3dbEwIbXYHZLNYqqwhQ&s"
      },

      {
        title: "Full Stack Website Development",
        sessions: "120 Live Sessions",
        duration: "20 Weeks",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL4kNXLTsLbjbaxapl0QFB_SBkCsuTT7pcfA&s" // Replace with actual image URLs
      },
    
  ];


  return (
    <div className="p-8 mt-10 w-full items-center">

      {/* Title and Subtitle */}
      <div className=" mb-10 items-center lg:ml-[15%]">
        <h2 className="text-2xl font-sans text-blue-600">All the skills you need in one place</h2>
        <p className="text-gray-600 font-sans"
        >From critical skills to technical topics, AbilitaEdge supports your professional development.</p>
      </div>

      {/* Tab Menu */}
      
      <div className="flex w-auto gap-4 lg:ml-[15%] space-x-1 mb-10 overflow-x-auto carousel  scroll-snap-x scroll-smooth">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab)
              
            }}
            
           // min-w-fit font-semibold px-4 py-2 flex justify-center items-center
            className={` min-w-fit font-sans px-0 py-2 flex justify-center items-center  ${
              activeTab === tab ? "border-b-2 border-blue-600 text-blue-500" : "text-gray-600 carousel-item"
            }`}
          >
            {tab}
          </button>
          
        ))}
        
        
      </div>
      <hr style={{backgroundColor:"#36454F", marginTop:"-40px", height:"1px",}}
          className='lg:w-[75%] lg:ml-[15%]'
      /> 

       {/* Scrollable Course Cards */}
       <div className='space-x-2 carousel rounded-box w-[100%] lg:w-3/4 items-center lg:ml-[15%] p-4 '>
        
          {courses.map((course, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg shadow-md p-0  carousel-item min-w-[80%] sm:min-w-[40%] md:min-w-[30%] lg:min-w-[10%]"
            >
              <img src={course.image} alt={course.title} className="w-[100%] h-40 rounded-lg object-cover mb-4" />
              <h3 className="text-base font-sans text-blue-600 mb-2 ml-2">{course.title}</h3>
              
              <div className='flex flex-row gap-2 mb-3 ml-2'>
              <img src={user} alt='userLive' width="18px" height="20px"/> 
              <p className='text-gray-600 text-sm font-sans'>{course.sessions}</p>
              </div>
              
              <div className='flex flex-row gap-2 mb-3 ml-2'>
              <img src={clock} alt='clock' width="18px" height="15px"/>
              <p className="text-gray-600 text-sm font-sans">{course.duration}</p>
              </div>
            </div>
          ))}
       
      </div>
      
      
    </div>
  );
}
