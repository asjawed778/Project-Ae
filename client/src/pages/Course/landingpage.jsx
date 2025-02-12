import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Button from "../../components/Button/Button";
import BookDemoClass from "./BookDemoClass";
import CourseHeadline from "./CourseHeadline";
import Overview from "./Overview";
import Curriculum from "./Curriculum";
import { useEffect, useState } from "react";
import { getFullCourseDetails } from "../../services/operations/addCourses";

export default function courseLandingpage() {
  const [section, setSection] = useState(0);
  const dispatch = useDispatch()
  const { id } = useParams();

  async function getcourseDetails(id){
    await dispatch(getFullCourseDetails(id))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getcourseDetails(id)
  }, [id])

  const courses = useSelector((state) => state.courses);
  const specificCourse = courses.specificCourse.course;
  console.log("specificCourse: ", specificCourse)



  return (
    <div className="flex flex-col gap-5 mb-10">
      <CourseHeadline specificCourse={specificCourse} />

      {/* Second Section */}
      <div className="flex flex-col lg:flex-row gap-8  2xl:px-[200px] lg:px-[150px]">
        <div className="flex flex-col gap-3 w-[90vw] md:w-[70vw] lg:w-[50vw] mx-auto">
          <div>
            <Button
              onClick={() => setSection(0)}
              variant={`${section === 1 && "inverse"}`}
              className="rounded-b-none"
            >
              Overview
            </Button>
            <Button
              onClick={() => {setSection(1); getcourseDetails(id)}}
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

        <div className="mx-auto flex-1">
          <BookDemoClass />
        </div>
      </div>
    </div>
  );
}
