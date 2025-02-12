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
        {/* <p>
          Designed to get you hired, our power-packed{" "}
          {specificCourse?.courseTitle}{" "}
          Developer Bootcamp features bect in-class hardng, plenty of harals-on
          exercises and assignments with Cloud Labs, and so much more. Build a
          stellar project portfolio get ready to crack interviews at product
          based companies, and launch your career as a Full Stack Developer
        </p> */}
        {/* <br /> */}
        <p>
          {specificCourse?.courseDescription}
        </p>

        <p className="font-bold text-blue-500 pt-3.5">Course Highlights</p>
      </section>
    </div>
  );
}
