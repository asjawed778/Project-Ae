import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";
import { getAllPost } from "../../services/operations/postApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Posts = () => {
	const isLoading = false;

	const dispatch = useDispatch() ;
	const { posts, loading, error } = useSelector( (store) => store.posts ) ;

	console.log("the post data",posts) ;

	useEffect(() => {
		dispatch(getAllPost());  // Fetch posts when component mounts
	  }, [dispatch]);

	return (
		<>
			{/* {isLoading && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)} */}
			{/* {!isLoading && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch </p>} */}
			{!isLoading && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;