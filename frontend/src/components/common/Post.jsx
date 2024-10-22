import { FaRegComment, FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const Post = ({ post }) => {
	
	const postOwner = post.user.name;
	console.log(post) ;

	const [isLiked, setIsLiked] = useState(false);
	const [disLiked,  setDisLiked] = useState(false);

	const [upvotes, setUpVotes] = useState(post.upvotesCount) ;
	const [downvotes, setDownVotes] = useState(post.downvotesCount) ;

    // comment section logic
	const [comment, setComment] = useState(post.comments);
	const [showAllComments, setShowAllComments] = useState(false);
	const [replyCommentId, setReplyCommentId] = useState(null);


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

	const handleLikePost = () => {
		setIsLiked(!isLiked) ;

		isLiked ?  setUpVotes(upvotes - 1) : setUpVotes(upvotes+1) ;

	};

	const handleDislikedPost = () => {
		setDisLiked(!disLiked) ;

		disLiked ? setDownVotes( downvotes - 1) : setDownVotes( downvotes + 1 ) ;

	}

	return (
		<>
			<div className='flex gap-2 items-start p-4 border border-gray-700 w-[500px] mx-auto' style={{ borderColor: '#D8D8D8' , borderWidth:'0.1px', borderBottom:'none'}}>
				<div className='avatar'>
					<Link to={`/profile/${postOwner.username}`} className='w-8 rounded-full overflow-hidden'>
						<img src={postOwner.profileImg || "/avatar-placeholder.png"} />
					</Link>
				</div>
				<div className='flex flex-col flex-1'>
					<div className='flex gap-2 items-center'>
						<Link to={`/profile/${postOwner.username}`} className='font-bold'>
							{postOwner}
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

						    
							<div
								className='flex gap-1 items-center cursor-pointer group'
								onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
							>
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
		</>
	);
};
export default Post;