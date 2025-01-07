import React, { useState } from 'react';
import LessonsComponent from './LessonsComponent.jsx'; 


const Curriculam = () => {
    const [showOverview, setShowOverview] = useState(true);
    const handleOverviewClick = () => {
        setShowOverview(true);
      };
    
      const handleCurriculumClick = () => {
        setShowOverview(false);
      };
    

  

  return (
    <div  class='cont'>
      <button  onClick={handleOverviewClick}>Overview</button>
      <button onClick={handleCurriculumClick}>Curriculum</button>

      {showOverview ? (
        <div class='main1'>
        <div className='="bg-white p-6 sm:p-4 rounded-lg shadow-black w-[350px] sm:w-80 md:w-80'>
          <h2 >Overview</h2>

          <div className="mt-10 max-w-5xl mx-auto flex space-x-10 mb-10">
        <h1 className="font-bold">Explore Our Immersive Full Stack Development Bootcamp</h1>
        <p>Designed to get you hired, our power-packed Full-Stack Developer Bootcamp features bect in-class hardng, plenty of harals-on exercises and assignments with Cloud Labs, and so much more. Build a stellar project portfolio get ready to crack interviews at product based companies, and launch your career as a Full Stack Developer</p><br />
        <p>Due revamped Full Stack Developer Bootcamp Online, now offers expertly crafted recorded streaming sessions that elevate your educationa вкритное. Those meticulously planned sessions, created by top intruttore and progenators, promsse unmutched clarity and engagement</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consequuntur velit corporis unde. Reprehenderit dignissimos dolor cum. Alias, hic enim voluptatum necessitatibus ad, quod quibusdam earum pariatur iusto corrupti qui!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia consequuntur velit corporis unde. Reprehenderit dignissimos dolor cum. Alias, hic enim voluptatum necessitatibus ad, quod quibusdam earum pariatur iusto corrupti qui!
        </p>

         <p id='a1'>Read More</p>
        </div>
        </div>
        </div>
        
     ) : (
        <div>
      <LessonsComponent />              
        </div>
        
      )
    }
    </div>

)
}
  

export default Curriculam
