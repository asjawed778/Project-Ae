import React, { useState } from "react";
import { Lock, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

const LessonsComponent = () => {
  // Track which section is expanded using its index
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleExpand = (sectionIndex) => {
    // If clicking the same section, close it. Otherwise, open the clicked section
    setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex);
  };

  const lessons = [
    { title: "Lessons with video content", duration: "12:30", status: "complete" },
    { title: "Lessons with video content", duration: "10:05", status: "complete" },
    { title: "Lessons with video content", duration: "2:25", status: "locked" },
  ];

  // Array of section data
  const sections = [
    { title: "Introduction to Web Development", lessonsCount: 3, duration: "45mins" },
    { title: "HTML & CSS Basics", lessonsCount: 3, duration: "45mins" },
    { title: "JavaScript Essentials", lessonsCount: 3, duration: "45mins" },
  ];

  return (
    <div className="space-y-4">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="max-w-screen-md bg-slate-100  shadow-md p-4">
          <div className="flex pt-2">
            <span>
              {expandedSection === sectionIndex ? 
                <ChevronUp size={20}/>:
                <ChevronDown size={20}/> 
              }
            </span>
            <button
              onClick={() => toggleExpand(sectionIndex)}
              className="flex items-center justify-between w-full bg-slate-50 h-14 text-black hover:text-orange-500 font-semibold text-s"
            >
              <span>{section.title}</span>
              <span className="text-xs">
                <p className="text-gray-600 mr-2">
                  {section.lessonsCount} Lesson {section.duration}
                </p>
              </span>
            </button>
          </div>
          
          {expandedSection === sectionIndex && (
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
                        <span className="material-icons text-gray-500 mr-2">
                          <img src="image.png" alt="lesson" />
                        </span>
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
                          <span className="text-green-500">
                            <CheckCircle size={16} />
                          </span>
                        )}
                        {lesson.status === "locked" && (
                          <span className="text-gray-500">
                            <Lock size={16} />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LessonsComponent;