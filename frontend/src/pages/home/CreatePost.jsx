import React, { useState, useRef, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../services/operations/createPostApi.js";
import Cookies from "js-cookie" ;

const CreatePost = () => {

  const token = Cookies.get("token") ;
  console.log("token on cookies", token) ;

  const dispatch = useDispatch() ;
  const {loading} = useSelector( store => store.loading ) ;

  const [content, setText] = useState("");
  const [images, setImages] = useState([]); // Array for images
  const [videos, setVideos] = useState([]); // Array for videos
  const imgRef = useRef(null);
  const videoRef = useRef(null);

  const data = {
    profileImg: "/avatars/boy1.png",
  };

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      images.forEach((file) => URL.revokeObjectURL(file.preview));
      videos.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [images, videos]);

  // Handle media selection (both images and videos)
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files
      .filter((file) => file.type.startsWith("image"))
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file), // Create object URL for image preview
      }));

    const newVideos = files
      .filter((file) => file.type.startsWith("video"))
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file), // Create object URL for video preview
      }));

    // Update the images and videos arrays separately
    setImages((prevImages) => [...prevImages, ...newImages]);
    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
  };

  // Remove an image from the list
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    URL.revokeObjectURL(images[index].preview); // Revoke object URL to free memory
    setImages(updatedImages);
  };

  // Remove a video from the list
  const removeVideo = (index, videoRef) => {
	// Stop the video playback if it's currently playing
	console.log("Removing video at index", index) ;

	if (videoRef.current) {
	  videoRef.current.pause(); // Stop playback
	  videoRef.current.currentTime = 0; // Reset playback time
	}
  
	// Revoke the object URL to free memory
	URL.revokeObjectURL(videos[index].preview); 
  
	// Update the videos state by filtering out the removed video
	const updatedVideos = videos.filter((_, i) => i !== index);
	setVideos(updatedVideos);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare post data to send to the API
    // const postData = {
    //   content,
    //   images: images.map((img) => img.file),
    //   videos: videos.map((vid) => vid.file),
    //   token: token
    // };

    const formData = new FormData();
  formData.append('content', content); // Add text content

  // Add images to the formData object
  images.forEach((img, index) => {
    formData.append('images', img.file); // Images will be sent as 'images' key
  });

  // Add videos to the formData object
  videos.forEach((vid, index) => {
    formData.append('videos', vid.file); // Videos will be sent as 'videos' key
  });

  formData.append('token', token) ;
    
    dispatch( createPost( formData) )
    .then ( () => {
      setText("") ;
      setImages([]) ;
      setVideos([]) ;
      
    })
    .catch( (error) => {
      console.error("Error creating post", error ) ;
    }) ;
    console.log("Post Data: ", formData);
    alert("Post created successfully!");
  };

  return (
    <div
      className="md:flex-[2_2_0] flex p-4 items-start gap-2 w-[500px] mx-auto mt-5"
      style={{ borderColor: "#D8D8D8", borderWidth: "0.1px", borderBottom: "none", borderTop: "none" }}
    >
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={data.profileImg || "/avatar-placeholder.png"} alt="Profile" />
        </div>
      </div>

      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <textarea
          className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none border-gray-800"
          style={{ borderColor: "#D8D8D8" }}
          placeholder="What is happening?!"
          value={content}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Display uploaded images */}
        <div className="media-preview grid grid-cols-2 gap-2">
          {images.map((fileObj, index) => (
            <div key={index} className="relative w-full">
              <IoCloseSharp
                className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
                onClick={() => removeImage(index)}
              />
              <img
                src={fileObj.preview}
                className="w-full h-48 object-contain rounded"
                alt="Preview"
              />
            </div>
          ))}
        </div>

        {/* Display uploaded videos */}
        <div className="media-preview grid grid-cols-2 gap-2">
          {videos.map((fileObj, index) => (
            <div key={index} className="relative w-full">
              <IoCloseSharp
                className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer z-10"
                onClick={() => removeVideo(index, videoRef)}
              />
              <video
			    ref={videoRef}
                src={fileObj.preview}
                className="w-full h-48 object-contain rounded "
                controls
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between ">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="fill-primary w-6 h-6 cursor-pointer"
              style={{ fill: "#1D9BF0" }}
              onClick={() => imgRef.current.click()}
            />
          </div>
          <input
            type="file"
            hidden
            ref={imgRef}
            onChange={handleMediaChange}
            accept="image/*, video/*"
            multiple
          />
          <button
            className="btn btn-primary rounded-full btn-sm text-white px-4 border-none"
            style={{ backgroundColor: "#1DA1F2" }}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
