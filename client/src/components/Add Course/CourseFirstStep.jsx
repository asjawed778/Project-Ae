import React from "react";
import InputField from "../Input Field";

const CourseFirstStep = () => {
  return (
    <div className="w-full">
      <div className="h-14 text-xl mb-3 font-semibold border-b border-neutral-400">
        <h2>Course Details</h2>
      </div>

      <div className="p-3 flex flex-col gap-3">
        <div className="border p-4 rounded-md border-neutral-300">
          <InputField>Course Title</InputField>
        </div>

        <div className="border p-4 rounded-md border-neutral-300">
          <InputField>Subtitle</InputField>
        </div>

        <div className="border p-4 rounded-md border-neutral-300 flex items-center justify-between">
            <select
              name="language"
              className="border p-2 rounded-lg border-neutral-300 outline-none cursor-pointer"
            >
              <option value="">Select Language</option>
              <option value="">Hindi</option>
              <option value="">English</option>
              <option value="">Hindi + English</option>
            </select>
            <div className="flex gap-2 items-center">
                <span>Mode: </span>
                <label htmlFor="offline" className="text-sm font-semibold">Offline</label>
                <input id="offline" type="radio" name="mode" value="offline" />
                <label htmlFor="online" className="text-sm font-semibold">Online</label>
                <input id="online" type="radio" name="mode" value={"online"}/>
                <label htmlFor="hybrid" className="text-sm font-semibold">Hybrid</label>
                <input id="hybrid" type="radio" name="mode" value={"hybrid"} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFirstStep;
