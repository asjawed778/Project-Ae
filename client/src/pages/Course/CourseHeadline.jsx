import { GoHome } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import { PiGreaterThanBold } from "react-icons/pi";
import { RiArrowRightWideLine } from "react-icons/ri";


import Button from "../../components/Button/Button";
import coder from "../../../public/imgs/slider/coder.jpg";

export default function CourseHeadline({ specificCourse }) {
  return (
    <div className="bg-[#FFF7ED] flex flex-col gap-5 px-10 md:px-20  lg:px-[250px] pt-5 pb-16">
      <div className="flex gap-3 items-center">
        <GoHome size={20} />
        <RiArrowRightWideLine color="grey" size={20}  />
        <h1 className="text-gray-600 font-semibold">Course</h1>
        <RiArrowRightWideLine color="grey" size={20}  />
        <h1 className="text-neutral-500 font-semibold text-xs">
          {specificCourse?.courseTitle}
        </h1>
      </div>
      <div className="flex justify-between flex-col-reverse md:flex-row gap-10">
        <div className="flex flex-col gap-5 mx-auto">
          <section>
            <h1 className="text-3xl font-bold">
              {specificCourse?.courseTitle}{" "}
              Course
            </h1>
            <h2 className="flex items-center gap-1 mt-1.5 font-semibold">
              Learn Complete from Basic to Advanced
            </h2>
          </section>

          {/* Course Features */}
          <ul>
            <li className="mb-1 font-medium flex">
              <FaCircleCheck
                size={15}
                style={{ color: "#3B82F6" }}
                className="mt-2"
              />
              <div className="ml-2">
                Master the core concepts of Python programming
              </div>
            </li>
            <li className="mb-1 font-medium  flex">
              <FaCircleCheck
                size={15}
                style={{ color: "#3B82F6" }}
                className="mt-1"
              />
              <div className="ml-2">
                Learn under the guidance of experienced trainners
              </div>
            </li>
            <li className="mb-2 font-medium flex">
              <FaCircleCheck
                size={15}
                style={{ color: "#3B82F6" }}
                className="mt-1"
              />
              <div className="ml-2">
                Get hands on practise with guided excercises,work-like projects
                and more
              </div>
            </li>
          </ul>
          <Button onClick={() => window.open(specificCourse?.brochure, "_blank")} className="w-fit">Download Brochure</Button>
        </div>

        {/* Course Image */}
        <img src={coder} className="md:h-[196px] h-[220px] md:w-[346px] w-[500px] object-cover rounded-md mx-auto" />
      </div>
    </div>
  );
}
