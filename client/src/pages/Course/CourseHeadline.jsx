import { GoHome } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import { PiGreaterThanBold } from "react-icons/pi";

import Button from "../../components/Button/Button";
import coder from "../../../public/imgs/slider/coder.jpg";

export default function CourseHeadline({ specificCourse }) {
  return (
    <div className="bg-[#FFF7ED] flex flex-col gap-5 px-10 md:px-40 lg:px-[250px] pt-5 pb-16">
      <div className="flex gap-3">
        <GoHome size={20} />
        <PiGreaterThanBold color="grey" size={15} className="mt-1" />
        <h1 className="text-gray-600 font-semibold">Course</h1>
        <PiGreaterThanBold color="grey" size={15} className="mt-1" />
        <h1 className="text-gray-600 font-semibold">
          {Array.isArray(specificCourse) && specificCourse[0]?.courseTitle}
        </h1>
      </div>
      <div className="flex justify-between gap-10">
        <div className="flex flex-col gap-5">
          <section>
            <h1 className="text-3xl font-bold">
              {Array.isArray(specificCourse) && specificCourse[0]?.courseTitle}{" "}
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
          <Button className="w-fit">Download Brochure</Button>
        </div>

        {/* Course Image */}
        <img src={coder} className="h-[196px] w-[346px] rounded-md" />
      </div>
    </div>
  );
}
