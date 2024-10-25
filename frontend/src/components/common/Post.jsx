import { FaRegComment, FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getAllComments } from "../../services/operations/commentApi";
import CommentSection from "./Comment";

const Post = ({ post }) => {

	const dispatch = useDispatch() ;

	// fetching comment of specific post from redux store
	const { commentsByPost, loading, error } = useSelector( (store) => store.comments) ;
	
	const comments = commentsByPost[post._id] || []; //get comments for this post
	
	const postOwner = post.user.name;
	
	const [isLiked, setIsLiked] = useState(false);
	const [disLiked,  setDisLiked] = useState(false);

	const [upvotes, setUpVotes] = useState(post.upvotesCount) ;
	const [downvotes, setDownVotes] = useState(post.downvotesCount) ;

    // comment section logic
	const [commentText, setCommentText] = useState({
		comment:""
	});
	const [showAllComments, setShowAllComments] = useState({});
	const [replyCommentId, setReplyCommentId] = useState(null);
    
	// whenever post._id , or showcomments event clicked , it would  fetch comments from server
    useEffect(() => {

		if( showAllComments ) {
		  dispatch(getAllComments(post._id));  // Fetch posts when component mounts
		}

	}, [dispatch, post._id, showAllComments]);

    // to show comments
	const toggleComments = (postId) => {
		setShowAllComments((prevState) => ({
			...prevState,
			[postId]: !prevState[postId], // Toggle the specific post's comment section
		}));
	};

	  const handleReply = (commentId) => {
		setReplyCommentId(commentId);
	  };
	
	  const handlePostReply = (replyText, commentId) => {
		// Logic to post a reply to a specific comment
		console.log(`Reply to comment ${commentId}:`, replyText);
	  };



	const isMyPost = true;

	const formattedDate = "1h";

	const isCommenting = false;

	const handleDeletePost = () => {};

	const handlePostComment = (e) => {
		e.preventDefault();
	};

	// to like post 
	const handleLikePost = () => {
		
	
		if( disLiked ) {
			setDisLiked(!disLiked) ;
			setDownVotes( downvotes -1 ) ;
		}

		setIsLiked(!isLiked) ;
		isLiked ?  setUpVotes(upvotes - 1) : setUpVotes(upvotes+1) ;

	};

	// to dislike the post
	const handleDislikedPost = () => {
		
		
        if( isLiked ) {
			setIsLiked(!isLiked) ;
			setUpVotes( upvotes -1 ) ;
		}

		setDisLiked(!disLiked) ;
		disLiked ? setDownVotes( downvotes - 1) : setDownVotes( downvotes + 1 ) ;


	}

	const handleSubmit = (e) => {

		e.preventDefault();

		// handlePostComment(commentText);
		dispatch(addComment(post._id, commentText)) ;
		setCommentText({
			"comment":""
		}); // Clear the input after posting

	};

	return (
		<>
			<div className='flex gap-2 items-start p-4 border border-gray-700 w-[700px] mx-auto mr-4' 
			  style={{ 
				borderColor: '#D8D8D8' , 
				borderWidth:'0.1px', 
				borderBottom:'none' ,
				
				
			  }}>
				<div className='avatar'>
					<Link to={`/profile/${postOwner.username}`} className='w-8 rounded-full overflow-hidden'>
						<img src={post.user.profilePic || "/avatar-placeholder.png"} />
					</Link>
				</div>
				<div className='flex flex-col flex-1'>
					<div className='flex gap-1 items-center'>
						<Link to={`/profile/${postOwner.username}`} className='font-bold'>
							{post.user.name}
						</Link>
						<span className='text-gray-700 flex gap-1 text-sm'>
							<Link to={`/profile/${postOwner.username}`}>@{post.user.name}</Link>
						</span>
						{isMyPost && (
							<span className='flex justify-end flex-1'>
								<FaTrash className='cursor-pointer hover:text-red-500' onClick={handleDeletePost} />
							</span>
						)}
					</div>
					<div className='flex flex-col gap-3 overflow-hidden'>
						<span>{post.content}</span>
						{post.images[0] && (
							<img
								src={post.images[0]}
								className='h-80 object-contain rounded-lg border border-gray-700' style={{ borderColor: '#D8D8D8' }}
								alt=''
							/>
						)}
					</div>
					<div className='flex justify-between mt-3'>
						<div className='flex gap-4 items-center w-full justify-between'>

						<div className='flex gap-1 items-center group cursor-pointer' onClick={handleLikePost}>
								{!isLiked && (
									<FaRegThumbsUp className='w-4 h-4 cursor-pointer text-slate-500' />
								)}
								{isLiked && <FaThumbsUp className='w-4 h-4 cursor-pointer text-blue-600 ' />}

								<span
									className={`text-sm text-slate-500 group-hover:text-pink-500 ${
										isLiked ? "text-pink-500" : ""
									}`}
								>
									{upvotes}
								</span>
							</div>

							<div className='flex gap-1 items-center group cursor-pointer' onClick={handleDislikedPost}>
								{!disLiked && (
									<FaRegThumbsDown className='w-4 h-4 cursor-pointer text-slate-500' />
								)}
								{ disLiked && <FaThumbsDown className='w-4 h-4 cursor-pointer text-blue-600 ' />}

								<span
									className={`text-sm text-slate-500 group-hover:text-pink-500 ${
										isLiked ? "text-pink-500" : ""
									}`}
								>
									{downvotes}
								</span>
							</div>

						    
							<div className='flex gap-1 items-center cursor-pointer group'
								onClick={() => toggleComments(post._id)}>

								<FaRegComment className='w-4 h-4  text-slate-500 group-hover:text-sky-400' />
								<span className='text-sm text-slate-500 group-hover:text-sky-400'>
									{post.commentsCount}
								</span>
							</div>
							

							<div className='flex gap-1 items-center group cursor-pointer'>
								<BiRepost className='w-6 h-6  text-slate-500 group-hover:text-green-500' />
								<span className='text-sm text-slate-500 group-hover:text-green-500'>0</span>
							</div>
							
						</div>
						
					</div> 

					
				</div>
				
			</div>

		  {/* comment section */}

          { showAllComments[post._id] && (

          <div className="flex gap-2 items-start p-4 border border-gray-500 w-[700px] mx-auto mr-4"
           style={{ borderColor: '#D8D8D8', borderWidth: '0.1px', borderBottom: 'none' }}>
          {/* Avatar */}
             <div className='avatar'>
             <Link to={`/profile/${postOwner.username}`} className='w-8 rounded-full overflow-hidden'>
             <img src={post.user.profilePic || '/avatar-placeholder.png'} />
             </Link>
             </div>

          {/* Comment Input */}
          <div className='flex-grow'>
             <form className='flex items-center' onSubmit={handleSubmit}>
                <input
                  type='text'
                  value={commentText.comment}
                  onChange={(e) => setCommentText((prev) => ({ 
					...prev, // Spread the previous object to retain other fields
					comment: e.target.value // Update the specific field
				}))}

                  placeholder="Enter your comment"
                  className="ml-4 border w-full focus:outline-none focus:border-transparent"
                  style={{ borderColor: '#D8D8D8', borderWidth: '0.1px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                />
          
                {/* Post Button */}
                {commentText.comment && (
                    <button
                      type='submit'
                      className='btn btn-secondary btn-ghost bg-blue-500 ml-2 text-xs text-white px-4 py-1 btn-sm' 
			          style={{ height: '5px'}}
					  
                    > 
                       Post
                    </button>
                )}
              </form>
            </div>
			
            </div>
			
           )} 
               
			   {/* Show loader while loading */}
			   { showAllComments[post._id] && (<>
					{loading ? (
						<div className="flex justify-center items-center p-4">
							<span>Loading comments...</span>
						</div>
					) : (
						<CommentSection
							comments={comments}
							postId={post._id}
						/>
					)}

					{/* Error handling */}
					{error && (
						<div className="flex justify-center items-center p-4">
							<span className="text-red-500">Error loading comments: {error}</span>
						</div>
				)}
				</>
			)}
		</>
	);
};
export default Post;