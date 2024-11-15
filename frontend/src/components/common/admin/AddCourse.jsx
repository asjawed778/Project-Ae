import React, { useState } from 'react';
import ReactQuill from 'react-quill' ;
import 'react-quill/dist/quill.snow.css' ;

function AddCourse() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [brochure, setBrochure] = useState(null);
  const [value, setValue] = useState(null) ;

  //handle on change
  const handleOnChange = () => {
     setValue(value) ;
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  // Handle brochure upload
  const handleBrochureUpload = (e) => {
    const file = e.target.files[0];
    if (file) setBrochure(file.name);
  };

  return (
    <div className="p-5 space-y-5 w-full">
      {/* Upper Section */}
      <div className="grid lg:grid-cols-2 gap-5 ">
        
        {/* Left Section */}
        <div className="space-y-4 bg-white p-5 shadow-md rounded-md w-[100%]">
          
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              className="w-full border-b border-gray-300 p-1 focus:outline-none focus:border-blue-500 text-gray-400"
            //   placeholder="Enter title"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium">Subtitle</label>
            <input
              type="text"
              className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
            //  placeholder="Enter subtitle"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium">Key Highlights</label>
            <textarea
              rows="3"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
              
            ></textarea>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium">Add Brochure</label>
            <input
              type="file"
              className="w-full"
              onChange={handleBrochureUpload}
            />
            {brochure && <p className="text-sm text-green-600 mt-1">Uploaded: {brochure}</p>}
          </div>

        </div>

        {/* Right Section (Image Upload) */}
        <div className="flex justify-center items-center bg-white p-5 shadow-md rounded-md">
          <label
            htmlFor="image-upload"
            className="w-full h-48 border-dashed border-2 border-gray-300 flex justify-center items-center cursor-pointer hover:bg-gray-50"
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Click to upload image</span>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>

      {/* Lower Section */}
      {/* <div className="bg-white p-5 shadow-md rounded-md">
        <h2 className="text-xl font-bold text-gray-700">Lower Section</h2>
        <p>Content for the lower section goes here...</p>
      </div> */}
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={handleOnChange} 
        className='lg:h-[30vh] mb-10 '
        
      />
    </div>
  );
}

export default AddCourse;
