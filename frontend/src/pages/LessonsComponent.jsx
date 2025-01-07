import React, { useState } from "react";
import { MdLock } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import './Lessons.css';



 const LessonsComponent = ({ courseContent }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  console.log("courseContent in lessons",courseContent);

  const lessons = [
    { title: "Lessons with video content", duration: "12:30", status: "complete" },
    { title: "Lessons with video content", duration: "10:05", status: "complete" },
    { title: "Lessons with video content", duration: "2:25", status: "locked" },
  ];
     return (
    
        <div>
        {/* {courseContent.map((lesson, index) => (
          <div key={index}>
            <h2>{lesson.topicname}</h2>
            <p>{lesson.subtopic}</p>
          </div>
        ))}   */}
<div class='main2'>
    <div className=" max-w-screen-lg bg-slate-100   shadow-md p-4">
      <div className="flex pt-2 " >       <span className="pt-4" >{isExpanded ? <RiArrowDropUpLine size={20}/> : <RiArrowDropDownLine size={20}/>}</span>
    <button class='b2'
      onClick={toggleExpand}
      className="flex items-center justify-between w-full bg-slate-50 h-14 text-black hover:text-orange-500 font-semibold text-s"
    >
      <span></span>
      <span className="text-xs  "><p className="text-gray-600 mr-2">3 Lesson   45mins</p></span>
    </button>
    </div>
    {isExpanded && (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Lesson</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Action</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Duration</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-700 flex items-center">
                  <span className="material-icons text-gray-500 mr-2"><img src="image.png"></img></span>
                  {lesson.title}
                </td>
                <td className="py-2 px-4">
                  <button
                    className={`px-4 py-1 text-sm font-medium rounded-md ${
                      lesson.status === "locked"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={lesson.status === "locked"}
                  >
                    Preview
                  </button>
                </td>
                <td className="py-2 px-4 text-gray-600">{lesson.duration}</td>
                <td className="py-2 px-4">
                  {lesson.status === "complete" && (
                    <span className="material-icons text-green-500"><TiTick/></span>
                  )}
                  {lesson.status === "locked" && (
                    <span className="material-icons text-gray-500"><MdLock /></span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  <div className=" max-w-screen-md bg-slate-100   shadow-md p-4">
      <div className="flex pt-2 " >       <span className="pt-4">{isExpanded ? <RiArrowDropUpLine size={20}/> : <RiArrowDropDownLine size={20}/>}</span>
    <button
      onClick={toggleExpand}
      className="flex items-center justify-between w-full bg-slate-50 h-14 text-black hover:text-orange-500 font-semibold text-s"
    >
      <span>{}</span>
      <span className="text-xs  "><p className="text-gray-600 mr-2">3 Lesson   45mins</p></span>
    </button>
    </div>
    {isExpanded && (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Lesson</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Action</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Duration</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-700 flex items-center">
                  <span className="material-icons text-gray-500 mr-2"><img src="image.png"></img></span>
                  {lesson.title}
                </td>
                <td className="py-2 px-4">
                  <button
                    className={`px-4 py-1 text-sm font-medium rounded-md ${
                      lesson.status === "locked"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={lesson.status === "locked"}
                  >
                    Preview
                  </button>
                </td>
                <td className="py-2 px-4 text-gray-600">{lesson.duration}</td>
                <td className="py-2 px-4">
                  {lesson.status === "complete" && (
                    <span className="material-icons text-green-500"><TiTick/></span>
                  )}
                  {lesson.status === "locked" && (
                    <span className="material-icons text-gray-500"><MdLock /></span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  <div className=" max-w-screen-lg bg-slate-100   shadow-md p-4">
      <div className="flex pt-2 " >       <span className="pt-4" >{isExpanded ? <RiArrowDropUpLine size={20}/> : <RiArrowDropDownLine size={20}/>}</span>
    <button
      onClick={toggleExpand}
      className="flex items-center justify-between w-full bg-slate-50 h-14 text-black hover:text-orange-500 font-semibold text-s"
    >
      <span>{}</span>
      <span className="text-xs  "><p className="text-gray-600 mr-2">3 Lesson   45mins</p></span>
    </button>
    </div>
    {isExpanded && (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Lesson</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Action</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Duration</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-700 flex items-center ">
                  <span className="material-icons text-gray-500 mr-2"><img src="image.png"></img></span>
                  {lesson.title}
                </td>
                <td className="py-2 px-4 ">
                  
                  <button 
                    className={`px-4 py-1 text-sm font-medium rounded-md ${
                      lesson.status === "locked"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={lesson.status === "locked"}
                  >
                    Preview
                  </button>
                </td>
                <td className="py-2 px-4 text-gray-600">{lesson.duration}</td>
                <td className="py-2 px-4">
                  {lesson.status === "complete" && (
                    <span className="material-icons text-green-500"><TiTick/></span>
                  )}
                  {lesson.status === "locked" && (
                    <span className="material-icons text-gray-500"><MdLock /></span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  <div className=" max-w-screen-md bg-slate-100   shadow-md p-4">
      <div className="flex pt-2 " >       <span className="pt-4" >{isExpanded ? <RiArrowDropUpLine size={20}/> : <RiArrowDropDownLine size={20}/>}</span>
    <button
      onClick={toggleExpand}
      className="flex items-center justify-between w-full bg-slate-50 h-14 text-black hover:text-orange-500 font-semibold text-s"
    >
      <span>{}</span>
      <span className="text-xs  "><p className="text-gray-600 mr-2">3 Lesson   45mins</p></span>
    </button>
    </div>
    {isExpanded && (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Lesson</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Action</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Duration</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-700 flex items-center">
                  <span className="material-icons text-gray-500 mr-2"><img src="image.png"></img></span>
                  {lesson.title}
                </td>
                <td className="py-2 px-4">
                  <button
                    className={`px-4 py-1 text-sm font-medium rounded-md ${
                      lesson.status === "locked"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={lesson.status === "locked"}
                  >
                    Preview
                  </button>
                </td>
                <td className="py-2 px-4 text-gray-600">{lesson.duration}</td>
                <td className="py-2 px-4">
                  {lesson.status === "complete" && (
                    <span className="material-icons text-green-500"><TiTick/></span>
                  )}
                  {lesson.status === "locked" && (
                    <span className="material-icons text-gray-500"><MdLock /></span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  <div className=" max-w-screen-md bg-slate-100   shadow-md p-4">
      <div className="flex pt-2 " >       <span className="pt-4" >{isExpanded ? <RiArrowDropUpLine size={20}/> : <RiArrowDropDownLine size={20}/>}</span>
    <button
      onClick={toggleExpand}
      className="flex items-center justify-between w-full bg-slate-50 h-14 text-black hover:text-orange-500 font-semibold text-s"
    >
      <span>{{}}</span>
      <span className="text-xs  "><p className="text-gray-600 mr-2">3 Lesson   45mins</p></span>
    </button>
    </div>
    {isExpanded && (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Lesson</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Action</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Duration</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-700 flex items-center">
                  <span className="material-icons text-gray-500 mr-2"><img src="image.png"></img></span>
                  {lesson.title}
                </td>
                <td className="py-2 px-4">
                  <button
                    className={`px-4 py-1 text-sm font-medium rounded-md ${
                      lesson.status === "locked"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={lesson.status === "locked"}
                  >
                    Preview
                  </button>
                </td>
                <td className="py-2 px-4 text-gray-600">{lesson.duration}</td>
                <td className="py-2 px-4">
                  {lesson.status === "complete" && (
                    <span className="material-icons text-green-500"><TiTick/></span>
                  )}
                  {lesson.status === "locked" && (
                    <span className="material-icons text-gray-500"><MdLock /></span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>

    </div>
  


  
      </div>
  )
}
             
export default LessonsComponent
