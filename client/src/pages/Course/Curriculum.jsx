import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { ImFilesEmpty } from "react-icons/im";
import { useState } from "react";
import Button from "../../components/Button/Button";
export default function Curriculum({ specificCourse }) {
  // console.log("specific", specificCourse)
  const [expandedLessons, setExpandedLessons] = useState({});
  const toggleLesson = (index, hasSubLessons) => {
    if (!hasSubLessons) return;
    setExpandedLessons((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const lessonsData = [
    {
      title: "Lessons With Video Content",
      totalLessons: 5,
      totalDuration: "45 Mins",
      expanded: false,
      subLessons: [],
    },
    {
      title: "Lessons With Video Content",
      totalLessons: 3,
      totalDuration: "45 Mins",
      expanded: true,
      subLessons: [
        {
          title: "Lessons with video content",
          duration: "12:30",
          completed: true,
          locked: false,
        },
        {
          title: "Lessons with hello video content",
          duration: "2:25",
          completed: false,
          locked: false,
        },
        {
          title: "Lessons with video content",
          duration: "12:30",
          completed: true,
          locked: false,
        },
        {
          title: "Lessons with hello video content",
          duration: "2:25",
          completed: false,
          locked: true,
        },
      ],
    },
    {
      title: "Lessons With Video Content",
      totalLessons: 5,
      totalDuration: "45 Mins",
      expanded: false,
      subLessons: [
        {
          title: "Lessons with video content",
          duration: "12:30",
          completed: true,
          locked: false,
        },
        {
          title: "Lessons with hello video content",
          duration: "2:25",
          completed: false,
          locked: true,
        },
      ],
    },
  ];

  return (
    <div
      style={{ backgroundColor: "rgb(244, 246, 252)" }}
      className="px-6 py-4 rounded-2xl mx-auto text-xs md:text-sm lg:text-lg"
    >
      <div className="flex flex-col gap-4 w-full">
        {lessonsData?.map((lesson, index) => {
          const isExpanded = expandedLessons[index] || false;
          const hasSubLessons = lesson.subLessons.length > 0;

          return (
            <div key={index} className="bg-white p-2 md:p-4 rounded-lg">
              <div
                className="flex justify-between cursor-pointer px-1 py-1"
                onClick={() => toggleLesson(index, hasSubLessons)}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    {hasSubLessons ? (
                      isExpanded ? (
                        <RiArrowDropUpLine className="text-2xl" />
                      ) : (
                        <RiArrowDropDownLine className="text-2xl" />
                      )
                    ) : (
                      <span className="md:w-6 w-0" />
                    )}
                    <span
                      className={`${
                        isExpanded && "text-orange-500"
                      } font-semibold md:text-lg text-sm`}
                    >
                      {lesson.title}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-zinc-600">
                  <span>{lesson.totalLessons} Lessions</span>
                  <span>{lesson.totalDuration}</span>
                </div>
              </div>

              <div
                className={`${
                  isExpanded && "mt-6"
                } overflow-hidden transition-all duration-400 ${
                  isExpanded
                    ? "max-h-[1200px] opacity-100"
                    : "max-h-0 opacity-0"
                } `}
              >
                {lesson.subLessons.map((subLesson, index) => (
                  <div key={index} className="mb-4 ml-6 pr-2">
                    <div className="flex flex-col md:flex-row justify-between gap-5">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 w-[15rem]">
                          <ImFilesEmpty className="text-xl" />
                          <span className="">{subLesson.title}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 text-zinc-600 justify-evenly items-center w-auto md:w-[40%]">
                        <Button className="h-fit">Preview</Button>
                        <span>{subLesson.duration}</span>
                        <span>
                          {subLesson.locked ? (
                            <FaLock />
                          ) : subLesson.completed ? (
                            <FaCheck />
                          ) : null}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
