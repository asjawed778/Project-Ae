import React from "react";

export default function Overview({ specificCourse }) {
  return (
    <div>
      <h1 className="font-bold">
        Explore Our Immersive{" "}
        {specificCourse?.courseTitle}{" "}
        Bootcamp
      </h1>

      <section className="text-justify">
        <p dangerouslySetInnerHTML={{ __html: specificCourse?.description }} />
      </section>
      {/* <div className="mt-8 flex gap-3 flex-wrap">
        {specificCourse?.tags?.map((highlight, index) => <span className="text-sm mt-2 font-semibold px-5 py-2 bg-blue-500 rounded-full hover:bg-primary-hover text-white capitalize" key={index}>{highlight}</span> )}
      </div> */}
    </div>
  );
}
