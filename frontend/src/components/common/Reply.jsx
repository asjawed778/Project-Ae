import React, { useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { editReply, deleteReply, voteOnReply } from "../../services/operations/commentApi";
import { timeAgo } from "../../utils/db/timestamp";
import boy from './boy1.png' ;

const Reply = ({ reply, postId, commentId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  console.log(reply) ;
  // Voting and editing states
  const [isEditingReply, setIsEditingReply] = useState(false);
  const [editedReplyText, setEditedReplyText] = useState(reply.reply);
  const [userVoteReply, setUserVoteReply] = useState(reply.userVote); // Assume this prop indicates the current user vote
  
  // method to look up the userid present in upvote or not 
  // change array to set to optimise the lookup from O(n) -> O(1) ;
  const upvoteSet = new Set( reply.upvotes) ;
  const downvoteSet = new Set( reply.downvotes) ; 
  const hasUserUpvoted = upvoteSet.has( user._id) ;
  const hasUserDownvoted = downvoteSet.has(user._id) ;

  // vote up and down state 
  const [upvote, setUpvote] = useState( hasUserUpvoted ) ;
  const [downvote, setDownvote] = useState( hasUserDownvoted ) ;

  const handleReplyUpvote = () => {

    dispatch(voteOnReply(postId, commentId, reply._id, 'upvote'));
    setUpvote( !upvote );

    if( downvote ) {
        setDownvote( !downvote ) ;
    }

  };

  const handleReplyDownvote = () => {

    dispatch(voteOnReply(postId, commentId, reply._id, 'downvote'));
    setDownvote(!downvote); 

    if( upvote ) {
        setUpvote( !upvote ) ;
    }

  };

  const handleEditReplySubmit = () => {
    dispatch(editReply(postId, commentId, reply._id, editedReplyText, user.username));
    setIsEditingReply(false);
  };

  const handleDeleteReply = () => {
    dispatch(deleteReply(postId, commentId, reply._id));
  };

  return (
    <div className="reply p-2 bg-gray-100 rounded mt-1">
      <div className="flex items-start gap-2">
        <div className="avatar w-6 h-6 rounded-full overflow-hidden">
          <img src={boy} />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-1">
            <span className="font-bold">{reply.tagUsername}</span>
            <span className="text-sm">{timeAgo(reply.createdAt)}</span>
          </div>

          {isEditingReply ? (
            <form onSubmit={handleEditReplySubmit} className="mt-2">
              <input
                type="text"
                value={editedReplyText}
                onChange={(e) => setEditedReplyText(e.target.value)}
                className="border-b border-gray-400 rounded-none px-2 py-1 w-full"
              />
              <button type="submit" className="bg-blue-500 text-white rounded px-3 py-1 mt-2">
                Save
              </button>
            </form>
          ) : (
            <p className="text-gray-700">{reply.reply}</p>
          )}

          <div className="flex items-center gap-4 mt-4">
            <div onClick={handleReplyUpvote} className="flex gap-1 items-center cursor-pointer">
              { upvote ? (
                <FaThumbsUp className="w-4 h-4 text-blue-600" />
              ) : (
                <FaRegThumbsUp className="w-4 h-4 text-slate-500" />
              )}
              <span>{reply.upvotes.length}</span>
            </div>

            <div onClick={handleReplyDownvote} className="flex gap-1 items-center cursor-pointer">
              { downvote ? (
                <FaThumbsDown className="w-4 h-4 text-blue-600" />
              ) : (
                <FaRegThumbsDown className="w-4 h-4 text-slate-500" />
              )}
              <span>{reply.downvotes.length}</span>
            </div>

            {user._id === reply.userId && (
              <div className="flex gap-1 items-center ml-2">
                <button onClick={() => setIsEditingReply(!isEditingReply)} className="text-sm text-blue-500">
                  Edit
                </button>
                <button onClick={handleDeleteReply} className="text-sm text-red-500">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
