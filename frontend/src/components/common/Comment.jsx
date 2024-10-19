import React, { useState } from 'react';

const Comment = ({ comment, handleReply, replyCommentId, handlePostReply }) => {
  const [replyText, setReplyText] = useState('');

  return (
    <div className='flex gap-2 items-start'>
      <div className='avatar'>
        <div className='w-8 rounded-full'>
          <img src={comment.user.profileImg || '/avatar-placeholder.png'} />
        </div>
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex items-center gap-1'>
          <span className='font-bold'>{comment.user.fullName}</span>
          <span className='text-gray-700 text-sm'>@{comment.user.username}</span>
        </div>
        <div className='text-sm'>{comment.text}</div>

        {/* Reply and Like option */}
        <div className='flex gap-4 mt-2'>
          <span
            className='text-sm text-gray-500 cursor-pointer'
            onClick={() => handleReply(comment._id)}
          >
            Reply
          </span>
          <span className='text-sm text-gray-500 cursor-pointer'>Like</span>
        </div>

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className='ml-8 mt-2'>
            {comment.replies.map((reply) => (
              <div key={reply._id} className='flex gap-2 items-start'>
                <div className='avatar'>
                  <div className='w-6 rounded-full'>
                    <img src={reply.user.profileImg || '/avatar-placeholder.png'} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex items-center gap-1'>
                    <span className='font-bold'>{reply.user.fullName}</span>
                    <span className='text-gray-700 text-sm'>@{reply.user.username}</span>
                  </div>
                  <div className='text-sm'>{reply.text}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reply Form */}
        {replyCommentId === comment._id && (
          <form
            className='mt-2 flex gap-2 items-center'
            onSubmit={(e) => {
              e.preventDefault();
              handlePostReply(replyText, comment._id);
              setReplyText('');
            }}
          >
            <textarea
              className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none border-gray-800'
              placeholder='Write a reply...'
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
              Post
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Comment;
