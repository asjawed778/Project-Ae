import bar from '../../assets/Hamburger_icon.png'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline" ;
import { useState } from 'react';
function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false) ;

    return(
       <header className='shadow-sm'>
           {/* Header w-full*/}
       <nav className="bg-white flex flex-row border-gray-200 lg:ml-[10%] md:gap-4 ">
         
         {/* Logo and Hamburger Icon in small screen and logo else only */}
        <div className=" mt-4 mb-4 md:mt-0 md:mb-0 flex flex-row items-center justify-around w-full md:justify-normal md:w-auto">
           
           {/* Logo */}
           <div className="md:p-6 ">
             <span className="text-2xl md:text-3xl font-sans text-black-600 ">Abilita
              <span className="text-blue-600 font-sans">Edge</span>
             </span>
           </div>
           
           {/* Hamburger Icon */}
            <div
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className="md:hidden text-gray-500 rounded-lg text-sm "
            >
             <img src={bar} alt="bar" className="w-[30px] h-[30px]"/>
           </div>

        </div>

         {/* Menu */}
        <div className="flex flex-row ">
            
            {/* Search bar */}
            <div className="hidden md:block relative w-auto rounded-[14px] ">
             <span className="absolute inset-y-0 left-3 flex items-center">
             <MagnifyingGlassIcon className="h-5 w-5 text-[#0b66c3]" />
             </span>
      
             <input
              type="text"
              placeholder="Type to search"
              className="w-auto mt-5 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#f1f2f5] text-[#707070] font-sans"           
             />

            </div>
         
           {/* Learning */}
            <button className=" hidden md:block text-blue-600 font-sans mt-4  md:mt-0  md:ml-10">
              Learning
            </button>

        </div>

       </nav>
       
       {/* Hamburger Action Section */}
          <section className={`overflow-hidden transition-all duration-700 ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0' } md:hidden ml-8`}>
              <div className="relative">
                 <span className="absolute inset-y-10 left-3 flex items-center">
                 <MagnifyingGlassIcon className="h-5 w-5 text-[#0b66c3]" />
                 </span>

                 <input
                   type="text"
                   placeholder="Type to search"
                   className="w-auto mt-5 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#f1f2f5] text-[#707070] font-sans"
                 />
              </div>

                {/* Learning */}
              <button className="text-blue-600 font-sans mt-4 mb-4">Learning</button>
          </section>
        </header>
    )
}

export default Header ;