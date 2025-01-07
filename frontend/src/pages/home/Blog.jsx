import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import { GoHome } from "react-icons/go";
import { PiGreaterThanBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import data from "./dummyData" ;
import data2 from "./dummyData2" ;
import mice from "../../assets/dummyData/mice.png" ;

function Blog(){
    return(
        <div className="max-w-[1920px] mx-auto">
        <Header/>
        
        <div className="max-w-7xl mx-auto p-5">
           
           <header className="w-[108px] h-[24px] flex flex-row items-center mt-3 gap-2">
              
              <div className="">
                <Link to="/">
                 <GoHome size={24}/>
                </Link>  
              </div>

              <div><PiGreaterThanBold className="w-[22px] h-[22px] text-[#8080808C]"/></div>
              <div className="w-[42px] h-[23px] font-sans font-extrabold text-[15.52px] leading-5 text-[#8080808C]">Blogs</div>
           
           </header>
           
           <span className=" h-[48px] text-[40px] font-sans font-bold text-[#0766C6]">Popular Feeds.</span> <span className=" h-[48px] text-[40px] font-sans font-bold text-[#555555]"> Click On The Post And Enjoy.</span>
           
           <div className="sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 md:gap-x-4 lg:grid lg:grid-cols-3 gap-x-4 gap-y-5 mt-5 ">
           { 
             
             data.map((item , index) => (
                <div className="mt-5 sm:mt-0"> 
                    <div className="relative">
                     <img src={item.thumbnail} alt="img1" className="w-[400px] h-[280px] rounded-[14px]"/>  
                     <div className="absolute flex flex-row">
                      <p className="w-[80px] h-[24px] font-sans font-normal rounded-[15px] -mt-[270px] ml-2 bg-white text-black text-[12px] text-center py-0.5">Technology</p>
                      <p className="w-[80px] h-[24px] font-sans font-normal rounded-[15px] -mt-[270px] ml-2 bg-white text-black text-[12px] text-center py-0.5">Technology</p>
                     </div>
                    </div>
                    <h1 className="max-w-[352px] min-h-[48px] font-bold font-rale text-[18px] leading-5 text-[#09090B] mt-2 p-1">{item.title}</h1>
                    <p className="max-w-[370px] h-[44px] font-normal font-rale text-[12.4px] leading-5 text-[#555555] p-1 mt-3 sm:mt-0">{item.subtitle}</p>
                </div>
             ))

             
           }  
               <div className="flex flex-col gap-2 mt-5 md:mt-0">

                 <div className="flex flex-row items-center gap-2">
                  <div><img src={mice} alt="mice" className="max-w-[62px] min-h-[62px] rounded-full"/></div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-sans text-[20px] leading-5 font-bold text-[#09090B]">Self Driving Car: Everything You N...</h1>
                    <p className="w-[80px] h-[24px] rounded-[15px] bg-[#0766C6] text-[#FFFFFF] text-[12px] text-center py-0.5">Technology</p>
                  </div>
                 </div>

                 <div className="flex flex-row items-center gap-2">
                  <div><img src={mice} alt="mice" className="max-w-[62px] min-h-[62px] rounded-full"/></div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-sans text-[20px] leading-5 font-bold text-[#09090B]">Self Driving Car: Everything You N...</h1>
                    <p className="w-[80px] h-[24px] rounded-[15px] bg-[#0766C6] text-[#FFFFFF] text-[12px] text-center py-0.5">Technology</p>
                  </div>
                 </div>

                 <div className="flex flex-row items-center gap-2">
                  <div><img src={mice} alt="mice" className="max-w-[62px] min-h-[62px] rounded-full"/></div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-sans text-[20px] leading-5 font-bold text-[#09090B]">Self Driving Car: Everything You N...</h1>
                    <p className="w-[80px] h-[24px] rounded-[15px] bg-[#0766C6] text-[#FFFFFF] text-[12px] text-center py-0.5">Technology</p>
                  </div>
                 </div>

                 <div className="flex flex-row items-center gap-2">
                  <div><img src={mice} alt="mice" className="max-w-[62px] min-h-[62px] rounded-full"/></div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-sans text-[20px] leading-5 font-bold text-[#09090B] overflow-hidden">Self Driving Car: Everything You N...</h1>
                    <p className="w-[80px] h-[24px] rounded-[15px] bg-[#0766C6] text-[#FFFFFF] text-[12px] text-center py-0.5">Technology</p>
                  </div>
                 </div>

                 <div className="flex items-end justify-end px-2 -mt-2">
                  <p className="text-[#0766C6] font-bold text-[12px]">view more</p>
                 </div>

              </div>

           </div>

           <div className="sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-x-4 gap-y-4 mt-5 ">
            {
              data2.map((item, index) => (
                <div className="mt-5 p-2 sm:p-0">
                  <div className="relative">
                     <img src={item.thumbnail} alt="img1" className="w-[400px] h-[280px] rounded-[14px]"/>  
                     <div className="absolute flex flex-row">
                      <p className="w-[80px] h-[24px] rounded-[15px] font-sans font-normal -mt-[270px] ml-2 bg-white text-black text-[12px] text-center py-0.5">Technology</p>
                      <p className="w-[80px] h-[24px] rounded-[15px] font-sans font-normal -mt-[270px] ml-2 bg-white text-black text-[12px] text-center py-0.5">Technology</p>
                     </div>
                    </div>
                  <h1 className="max-w-[352px] min-h-[48px] font-bold font-rale text-[18px] leading-5 text-[#09090B] mt-2 p-1">{item.title}</h1>
                  <p className= "max-w-[370px] h-[44px] font-normal font-rale text-[12.4px] leading-5 text-[#555555] p-1">{item.subtitle}</p>
                </div>
              ))
            }
           </div>

        </div>

        <Footer/>
        </div>
    )
}

export default Blog ;