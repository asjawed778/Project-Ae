import { useState } from "react";
import { FaRegComment, FaRegThumbsDown, FaRegThumbsUp, FaReply, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { timeAgo } from "../../utils/db/timestamp";
import { useDispatch , useSelector} from "react-redux";
import { useSearchParams } from "react-router-dom";
import { editReply, replyOnComment,deleteReply, voteOnReply, voteComment, deleteComment, editComment } from "../../services/operations/commentApi";
import Reply from "./Reply";
import boy from './boy1.png' ;

const CommentSection = ( {comments, postId } ) => {

  const [replies, setReplies] = useState({}); // Manage replies for each comment
  const [votes, setVotes] = useState({}); // Manage upvotes/downvotes
  
  //console.log("upvote", comments.replies) ;

  const handleReply = (commentId, replyText) => {
    setReplies((prevReplies) => ({
      ...prevReplies,
      [commentId]: [...(prevReplies[commentId] || []), replyText], // Add reply to the specific comment
    }));
  };

   // Filter comments for the specific post
  //  const filteredComments = comments.filter(comment => comment.postId === postId);
  // console.log("filtered_comments", comments) ;

  const handleVote = (commentId, type) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [commentId]: (prevVotes[commentId] || 0) + (type === "upvote" ? 1 : -1),
    }));
  };

  return (
    <div className="comment-section border border-gray-700 p-4 w-[700px] mx-auto mr-4" style={{ borderColor: '#D8D8D8' , borderWidth:'0.1px', borderBottom:'none', borderTop:'none'}}>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          postId={postId}
          handleReply={handleReply}
          handleVote={handleVote}
          replies={ comment.replies || []}
          voteCount={votes[comment.id] || 0}
        />
      ))}
    </div>
  );
};
 
const Comment = ({ comment, postId, handleReply, handleVote, replies, voteCount }) => {
  
  const dispatch = useDispatch() ;
  console.log("comment",comment) ;
  //console.log("repliesid", replies) ;
  const { user } = useSelector((state) => state.auth);
  //console.log("user",user) ;
  // reply states
  const [showReplyInput, setShowReplyInput] = useState(false) ;
  const [showReplies, setShowReplies] = useState(false) ; // To toggle replies visibility
  const [replyText, setReplyText] = useState("") ;
  const [isEditingReply, setIsEditingReply] = useState(null) ; // Tracks which reply is being edited
  const [editedReplyText, setEditedReplyText] = useState("") ; // Holds the edited reply text

  // comment states
  const [isEditingComment, setIsEditingComment] = useState(false) ; // Tracks which comment is being edited
  const [editedCommentText, setEditedCommentText] = useState("") ;   // holds the edited comment text


  // Track user vote: 'upvote', 'downvote', or null in comment
 // const [userVote, setUserVote] = useState(null);

 // method to look up the userid present in upvote or not 
 // change array to set to optimise the lookup from O(n) -> O(1) ;
  const upvoteSet = new Set( comment.upvotes) ;
  const downvoteSet = new Set(comment.downvotes) ; 
  const hasUserUpvoted = upvoteSet.has( user._id) ;
  const hasUserDownvoted = downvoteSet.has(user._id) ;

  const [upvote, setUpvote] = useState( hasUserUpvoted ) ;
  const [downvote, setDownvote] = useState( hasUserDownvoted) ;

   // Track user vote: 'upvote', 'downvote', or null in reply
   const [userVoteReply, setUserVoteReply] = useState({});

   // Handle upvote
   const handleUpvote = () => {

    dispatch(voteComment(postId, comment._id, 'upvote'));
    setUpvote(!upvote); 

    if( downvote )
     setDownvote(!downvote) ;
    
  };
  
   // Handle downvote
   const handleDownvote = () => {
    
    dispatch(voteComment(postId, comment._id, 'downvote'));
    setDownvote(!downvote);

    if( upvote )
    setUpvote(!upvote) ;
   
  };

  // submit the edited comment
  const handleEditCommentSubmit = () => {
    dispatch(editComment(postId, comment._id, editedCommentText ));
    setIsEditingComment(null);
    setEditedCommentText('');
  };

  // Handle upvote
  const handleReplyUpvote = ( replyId) => {
    if (userVoteReply[replyId] !== 'upvote') {
      dispatch(voteOnReply(postId, comment._id, replyId ,'upvote'));
      setUserVoteReply((prevVotes) => ({ ...prevVotes, [replyId]: 'upvote' }));
    }
    
  };
  
   // Handle downvote
   const handleReplyDownvote = (replyId) => {
    if (userVoteReply[replyId] !== 'downvote') {
      dispatch(voteOnReply(postId, comment._id, replyId ,'downvote'));
      setUserVoteReply((prevVotes) => ({ ...prevVotes, [replyId]: 'downvote' }));
    }
   
  };

  // Toggle for reply input
  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };
  
  // Toggle replies visibility
  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  // Submit a new reply
  const handleReplySubmit = (e) => {
    e.preventDefault();
    dispatch(replyOnComment(postId, comment._id, replyText, user.username));
    setReplyText('');
    setShowReplyInput(false);
  };

  // Submit the edited reply
  const handleEditReplySubmit = (replyId) => {
    dispatch(editReply(postId, comment._id, replyId, editedReplyText, user.username));
    setIsEditingReply(null);
    setEditedReplyText('');
  };

  // Delete the reply
  const handleDeleteReply = (replyId) => {
    dispatch(deleteReply(postId, comment._id, replyId));
  };

  //delete comment
  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(postId, commentId));
  };


  return (
    <div className="comment p-4">
      <div className="flex items-start gap-2">
        {/* Avatar */}
        <div className="avatar w-8 h-8 rounded-full overflow-hidden">
          <img
            src={boy}
            
          />
        </div>

        {/* Comment Content */}
        <div className="flex-grow">
          <div className="flex items-center gap-1">
            <span className="font-bold">{comment.user.name}</span>
            <span className="text-sm">{timeAgo(comment.createdAt)}</span>
          </div>
            {/* Edit Mode for Comment */}
            { isEditingComment === comment.user.id ? (
                        <form onSubmit={() => handleEditCommentSubmit( user._id )} className="mt-2">
                          <input
                            type="text"
                            value={editedCommentText}
                            onChange={(e) => setEditedCommentText(e.target.value)}
                            className="border-b border-gray-400 rounded-none px-2 py-1 w-full"
                          />
                          <button type="submit" className="bg-blue-500 text-white rounded px-3 py-1 mt-2">
                            Save
                          </button>
                        </form>
                      ) : (
                        <p className="text-gray-700">{comment.comment}</p>
            )} 

          {/* Voting */}
          <div className="flex justify-between mt-3">
            <div className="flex gap-4 items-center w-full">
              {/* Upvote */}
              <div className="flex gap-1 items-center cursor-pointer" onClick={handleUpvote}>
                
                { upvote ? (
                  
                  <FaThumbsUp className='w-4 h-4 cursor-pointer text-blue-600 '/>
                  
                 ) : (
                  <FaRegThumbsUp className='w-4 h-4 text-slate-500'/>
                  
                ) 
                }
                
                <span>{comment.upvotes.length}</span>
                <span>voteUp</span>
              </div>

               {/* Downvote */}
               <div className="flex gap-1 items-center cursor-pointer" onClick={handleDownvote}>
               { downvote ? (
                  <FaThumbsDown className='w-4 h-4 cursor-pointer text-blue-600 '/>
                 ) : (
                  <FaRegThumbsDown className='w-4 h-4 text-slate-500'/>
                  
                ) 
                }
                <span>{comment.downvotes.length}</span>
                <span>voteDown</span>
              </div>

              {/* Reply Section */}
              <div className="flex gap-1 items-center cursor-pointer group" onClick={handleReplyClick}>
                <FaReply className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                <span>reply</span>
              </div>

              <div className="flex gap-1 items-center">
                  {/* Edit/Delete Buttons for Own Reply */}
                    {user._id === comment.user.id && (
                      <>
                        <button onClick={() => {
                           setIsEditingComment(user._id);
                           setEditedCommentText(comment.comment);
                        }} className="text-sm text-blue-500 ml-2">
                              Edit
                        </button>
                      
                       <button onClick={() => handleDeleteComment(comment._id)} className="text-sm text-red-500 ml-2">
                             Delete
                       </button>
                      </>
                     )}
              </div>

            </div>
          </div>

          {/* Conditional rendering of the input box */}
          {showReplyInput && (
            <form onSubmit={handleReplySubmit} className="mt-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="write your reply..."
                className="border-b border-gray-400 rounded-none px-2 py-1 w-full"
              />
              <button type="submit" className="bg-blue-500 text-white rounded px-3 py-1 mt-2">
                Submit
              </button>
            </form>
          )}

          {/* Show Replies Button */}
          {replies.length > 0 && (
            <button onClick={toggleReplies} className="text-blue-500 text-sm mt-2">
              {showReplies ? `Hide Replies (${replies.length})` : `Show Replies (${replies.length})`}
            </button>
          )}

         {showReplies && comment.replies.map((reply) => (
            <Reply key={reply._id} reply={reply} postId={postId} commentId={comment._id} />
          ))}

        </div>
      </div>
    </div>
  );
};






export default CommentSection;
