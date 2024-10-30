import './CreatePost.css'; // Add your custom CSS here

import React, { useState } from 'react';
import { CiImageOn } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import avatar from "./boy2.png";

import { useDispatch } from 'react-redux';
import { createPost } from '../services/operations/postApi';

const CreatePost = () => { 

    const [postText, setPostText] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaType, setMediaType] = useState('') ;

    // During each re-render, if the media file's URL (e.g., video) is dynamically created inside the render method (like calling URL.createObjectURL(mediaFile)), a new URL is generated each time as on every render new function is formed. This makes the media reload or flicker.
    const [mediaURL, setMediaURL] = useState(null); // Add mediaURL state to stop Flicking of video

    const dispatch = useDispatch() ;
    
     // Handle form submission
    const handleSubmit = () => {

      if (!mediaFile) return; // Ensure there's a media file

      const postData = {
        postText,
        images: mediaType === 'image' ? [URL.createObjectURL(mediaFile)] : [], // If image, add image URL
        videos: mediaType === 'video' ? [URL.createObjectURL(mediaFile)] : [], // If video, add video URL
      };

       // Dispatch the sendCreatePost action
       dispatch(createPost(postData, resetForm));
    };
    
     // Reset the form after successful post creation
    const resetForm = () => {
       setPostText('');
       setMediaFile(null);
       setMediaType('');
       setMediaURL(null);
    };
    
     // Handle media file selection, allowing only one type of file at a time
    const handleMediaChange = (e) => {
       const file = e.target.files[0]; // Get the first selected file
       if (!file) return;

       const fileType = file.type;

       // Check if the file is an image or video and reset the state accordingly
       if (fileType.startsWith('image')) {
         setMediaType('image');
       } else if (fileType.startsWith('video')) {
         setMediaType('video');
       } else {
         alert('Only images and videos are allowed.');
         return;
       }

       // Store the selected media file
       setMediaFile(file);
       setMediaURL(URL.createObjectURL(file)); // Store URL in state
    };

    const handleRemoveMedia = () => {
        setMediaFile(null);
        setMediaType('');
        setMediaURL(null); // Reset mediaURL
      };
  

  return (
    <div className="post-input-container">
       
        {/* Profile picture */}
      <img 
        src={ avatar }
        alt="Profile" 
        className="profile-pic"
      />
      
      {/* Post text area */}
      <div className="post-input-box">

        <textarea
          placeholder="What is happening?!"
          value={postText}
          onChange={ (e) => setPostText(e.target.value) }
          rows="3"
        ></textarea>
        

        {/* Image preview (if any) */}
        { mediaType === 'image' && (
          <div className="image-preview-container">
            <img src={mediaURL} alt="Selected" className='imageUpload' />
            <CiCircleRemove onClick={handleRemoveMedia} className='remove'/>
          </div>
        )}

        {/* Video preview (if any) */}
         { mediaType === 'video' && (
          <div className="image-preview-container">
            <video 
              src={mediaURL} 
              alt="Selected" 
              className='imageUpload' 
              controls
            />
            <CiCircleRemove onClick={handleRemoveMedia} className='remove'/>
          </div>
        )}

        
        {/* Icons for additional functionality */}
        <div className="post-actions">
        
       
          <label htmlFor="image-upload">
            <CiImageOn className='upload-icon'/>
          </label>

          <input
            type="file"
            accept="image/*,video/*"
            multiple
            id="image-upload"
            style={{ display: 'none' }}
            onChange={handleMediaChange}
          />
          
        {/* Post button */}
        <button 
          className="post-button" 
          onClick={handleSubmit}
          disabled={!postText && !mediaType}
        >
          Post
        </button>
        
        
        </div>

        

      </div>


    </div>
  );
};

export default CreatePost;

