import { useDispatch, useSelector } from "react-redux";
import { getUserPost } from "../../services/operations/postApi";
import { useEffect } from "react";
import Post from "./Post";

const UserPost = () => {

   const dispatch = useDispatch() ;
   const { userPosts, loading, error, page } = useSelector( (state) => state.userposts ) ;
   
   console.log("userPosts", userPosts) ;
   useEffect( () => {
     dispatch(getUserPost())  ;
   } ,[dispatch]) ;
  

   return(
    <>
     { userPosts && (
				<div>
					{ userPosts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
	  )}
    </>
   )
}

export default UserPost ;