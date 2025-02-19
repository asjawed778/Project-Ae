import React from "react";
import InputField from "../Input Field";

const CourseFirstStep = () => {
  return (
    <div className="w-full">
      <div className="h-14 text-xl mb-8 font-semibold border-b border-neutral-500">
        <h2>Course Details</h2>
      </div>

      <div className="p-3 flex flex-col gap-4">
        <div className="border p-4 rounded-md border-neutral-400">
          <InputField placeholder="Enter the course title">Course Title <span className="text-red-600">*</span> </InputField>
        </div>

        <div className="border p-4 rounded-md border-neutral-400">
          <InputField placeholder="Enter the subtitle">Subtitle <span className="text-red-600">*</span></InputField>
        </div>

        <div className="border p-4 rounded-md border-neutral-400 flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between">
          <div className="flex gap-1">

          <select
            name="language"
            className="border p-2 rounded-lg border-neutral-300 outline-none cursor-pointer"
            >
            <option value="">Select Language</option>
            <option value="">Hindi</option>
            <option value="">English</option>
            <option value="">Hindi + English</option>
          </select>
          <span className="text-red-600">*</span>
              </div>

          <div className="flex gap-2 items-center border p-2 rounded-lg border-neutral-300">
            <span>Mode: <span className="text-red-600">*</span> </span>
            <label htmlFor="offline" className="text-sm font-semibold cursor-pointer">
              Offline
            </label>
            <input id="offline" type="radio" name="mode" value="offline" className="cursor-pointer" />
            <label htmlFor="online" className="text-sm font-semibold cursor-pointer">
              Online
            </label>
            <input id="online" type="radio" name="mode" value="online" className="cursor-pointer" />
            <label htmlFor="hybrid" className="text-sm font-semibold cursor-pointer">
              Hybrid
            </label>
            <input id="hybrid" type="radio" name="mode" value="hybrid" className="cursor-pointer" />
          </div>
        </div>

        <div className="border p-4 rounded-md border-neutral-400">
          <InputField placeholder="Enter Name of Instructor">Instructor <span className="text-red-600">*</span></InputField>
        </div>

        <div className="border p-4 rounded-md border-neutral-400">
          <InputField type="image">Thumbnail Image <span className="text-red-600">*</span></InputField>
        </div>

        <div className="border p-4 rounded-md border-neutral-400">
          <InputField type="pdf">Brochure pdf</InputField>
        </div>
      </div>
    </div>
  );
};

export default CourseFirstStep;
