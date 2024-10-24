import { useState } from "react";

import Posts from "../../components/common/Posts.jsx";
import CreatePost from "./CreatePost";

const HomePage = () => {
	const [feedType, setFeedType] = useState("forYou");

	return (
		<>
			<div className=' flex-[4_4_0] mr-auto min-h-screen '>
				
                
				<div className=' flex w-[700px] h-[30px] mx-auto top-0 left-0 right-0 z-20 bg-white mr-4' >
					<h1 className='text-2xl font-bold leading-[28.13px] text-left fixed z-20 bg-white w-[700px] h-[50px] border-b border-gray-700 mr-4' style={{ borderColor: '#D8D8D8' }}>Home</h1>
				</div>
                
				
                 {/* CREATE POST INPUT */}
				   <CreatePost />

                 {/* POSTS */}
                   <Posts />
				
                
               
		   </div>
		</>
	);
};
export default HomePage;