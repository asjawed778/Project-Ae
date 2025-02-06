import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Button from "../../components/Button/Button";
import BookDemoClass from "./BookDemoClass";
import CourseHeadline from "./CourseHeadline";
import Overview from "./Overview";
import Curriculum from "./Curriculum";
import { useState } from "react";

export default function courseLandingpage() {
  const [overview, setOverview] = useState(true);

  const handleSection = () => setOverview(!overview);

  const courses = useSelector((state) => state.courses);
  const specificCourse = courses.courses.courses;
  const { id } = useParams();

  return (
    <div className="flex flex-col gap-5 mb-10">
      <CourseHeadline specificCourse={specificCourse} />

      {/* Second Section */}
      <div className="flex gap-8 px-[250px]">
        <div className="flex flex-col gap-3">
          <div>
            <Button onClick={handleSection}>Overview</Button>
            <button
              onClick={handleSection}
              className="text-[var(--color-primary)] px-5 py-2 rounded-t-md"
            >
              Curriculum
            </button>
          </div>

          {overview ? (
            <Overview specificCourse={specificCourse} />
          ) : (
            <Curriculum specificCourse={specificCourse} />
          )}
        </div>

        <BookDemoClass />
      </div>
    </div>
  );
}
