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
        <p dangerouslySetInnerHTML={{ __html: specificCourse?.courseDescription }} />
        <p className="font-bold text-blue-500 pt-3.5">Course Highlights</p>
        <ul className="list-disc ml-8">
          {specificCourse?.keyPoints.map((highlight, index) => <li className="text-sm mt-2 font-semibold" key={index}>{highlight}</li> )}
        </ul>
      </section>
    </div>
  );
}
