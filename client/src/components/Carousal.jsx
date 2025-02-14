import user from "../../public/imgs/slider/user_icon2.png";
import clock from "../../public/imgs/slider/language2.png";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../store/reducers/coursesReducer";
import { setCategories } from "../store/reducers/adminCategoryReducer";
import CourseSkeleton from "./skeletons/CourseSkeleton";
import {
  useGetAllCategoryQuery,
  useGetCategoryCourseQuery,
} from "../services/course.api";


// import {
//   getAllCategory,
//   getCourseByCategory,
// } from "../services/operations/addCourses";

export default function Carousal() {
  const dispatch = useDispatch();


  const [skeleton, setSkeleton] = useState(false);

  // otherwise it is called again and again
  // useEffect(() => {
  //   dispatch(getAllCategory());
  // }, []);

  const categories = useSelector((state) => state.categories.categories);
  const coursesAll = useSelector((state) => state.courses.courses);

  const [activeTab, setActiveTab] = useState(null); // Start with null or a default value

  const { data: allCategories } = useGetAllCategoryQuery();
  const { data: categoryCourse } = useGetCategoryCourseQuery(activeTab, {
    skip: !activeTab,
  });

  useEffect(() => {
    if (allCategories?.success) {
      dispatch(setCategories(allCategories.categories || []));
    }
  }, [allCategories, dispatch]);

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0]._id); // Set the default value when categories are fetched
    }
  }, [categories]); // Run this effect whenever categories change


  useEffect(() => {
    if (activeTab && categoryCourse?.success) {
      setSkeleton(true)
      dispatch(setCourses(categoryCourse.courses));
      setSkeleton(false)
    }
  }, [activeTab, categoryCourse, dispatch]);


  // async function getcourses(){
  //   setSkeleton(true)
  //   await dispatch(getCourseByCategory(activeTab));
  //   setSkeleton(false)
  // }
  // useEffect(() => {
  //   if (activeTab) {
  //     getcourses()
  //   }
  // }, [activeTab]);

  return (
    <div className="p-8 mt-4 w-full mx-auto">
      {/* Title and Subtitle */}
      <div className=" mb-6 items-center">
        <h2 className="font-sans font-semibold text-2xl text-[var(--color-primary)]">
          All the skills you need in one place
        </h2>
        <p className="text-gray-600 font-sans">
          From critical skills to technical topics, AbilitaEdge supports your
          professional development.
        </p>
      </div>

      {/* Tab Menu */}
      <div className="flex w-auto gap-4 space-x-1 overflow-x-auto carousel  scroll-snap-x scroll-smooth ">
        {categories
          .filter((_, i) => i < 4)
          .map((tab) => (
            tab.courses.length !== 0 && <button
              key={tab._id}
              onClick={() => {
                setActiveTab(tab._id);
              }}
              className={`flex justify-center items-center w-fit px-0 py-2 border-b-2 cursor-pointer ${
                activeTab === tab._id
                  ? " border-[var(--color-primary)] text-[var(--color-primary)]"
                  : " border-transparent text-gray-600 carousel-item"
              }`}
            >
              {tab.categoryName}
            </button>
          ))}
      </div>
      <div className="relative w-[80%]">
        <hr className="border-gray-200" />
        {coursesAll && <Link
          to="/course"
          className="absolute right-0 -top-3 font-bold text-xs text-[var(--color-primary)] bg-white px-5"
        >
          View More 
        </Link>}
      </div>

      {/* Scrollable Course Cards */}
      {!skeleton ? (
        <div className="flex items-center flex-wrap md:flex-nowrap gap-5 p-4 mx-auto">
          {coursesAll?.map((course, index) => (
            <Link
              key={index}
              to={`/course/${course._id}`}
              className="bg-white flex flex-col gap-2 w-[296px] pb-3 rounded-lg shadow-md mx-auto md:mx-0"
            >
              <img
                src={course.thumbnail}
                alt={course.courseTitle}
                className="w-[100%] h-40 rounded-lg object-cover"
              />
              <div className="flex flex-col px-5">
                <h3 className="font-sans text-[var(--color-secondary)]">
                  {course.courseTitle}
                </h3>

                <hr className="mt-5 border-gray-200" />
                <div className="text-xs flex flex-row items-center justify-between gap-2 h-[38px]">
                  <div className="flex flex-row items-center gap-1">
                    <img
                      src={user}
                      alt="userLive"
                      className="w-[25px] h-[25px] text-blue-950"
                    />
                    <p className="text-gray-600">
                      {course.courseMode.charAt(0).toUpperCase() +
                        course.courseMode.slice(1).toLowerCase()}
                    </p>
                  </div>

                  <div className="flex flex-row items-center gap-1">
                    <img
                      src={clock}
                      alt="clock"
                      className="w-[25px] h-[25px]"
                    />
                    <p className="text-gray-600">
                      {course.courseLanguage.charAt(0).toUpperCase() +
                        course.courseLanguage.slice(1).toLowerCase()}
                    </p>
                  </div>

                  <button className="text-white whitespace-nowrap bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)] px-3 py-1 ml-auto rounded-md duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <CourseSkeleton />
      )}
    </div>
  );
}
