import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Button from "../../components/Button/Button";
import BookDemoClass from "./BookDemoClass";
import CourseHeadline from "./CourseHeadline";
import Overview from "./Overview";
import Curriculum from "./Curriculum";
import { useState } from "react";

export default function courseLandingpage() {
  const [section, setSection] = useState(0);

  const courses = useSelector((state) => state.courses);
  const specificCourse = courses.courses.courses;
  const { id } = useParams();

  return (
    <div className="flex flex-col gap-5 mb-10">
      <CourseHeadline specificCourse={specificCourse} />

      {/* Second Section */}
      <div className="flex flex-wrap md:flex-nowrap gap-8 px-10 md:px-40 lg:px-[250px]">
        <div className="flex flex-col gap-3 min-w-[20rem]">
          <div>
            <Button
              onClick={() => setSection(0)}
              variant={`${section === 1 && "inverse"}`}
              className="rounded-b-none"
            >
              Overview
            </Button>
            <Button
              onClick={() => setSection(1)}
              variant={`${section === 0 && "inverse"}`}
              className="rounded-b-none"
            >
              Curriculum
            </Button>
          </div>

          <div>
            {section === 0 ? (
              <Overview specificCourse={specificCourse} />
            ) : (
              <Curriculum specificCourse={specificCourse} />
            )}
          </div>
        </div>

        <div className="flex-1">
          <BookDemoClass />
        </div>
      </div>
    </div>
  );
}
