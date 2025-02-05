import React from "react";

export default function Overview({ specificCourse }) {
  return (
    <div>
      <h1 className="font-bold">
        Explore Our Immersive{" "}
        {Array.isArray(specificCourse) && specificCourse[0]?.courseTitle}{" "}
        Bootcamp
      </h1>

      <section>
        <p>
          Designed to get you hired, our power-packed{" "}
          {Array.isArray(specificCourse) && specificCourse[0]?.courseTitle}{" "}
          Developer Bootcamp features bect in-class hardng, plenty of harals-on
          exercises and assignments with Cloud Labs, and so much more. Build a
          stellar project portfolio get ready to crack interviews at product
          based companies, and launch your career as a Full Stack Developer
        </p>
        <br />
        <p>
          Due revamped Full Stack Developer Bootcamp Online, now offers expertly
          crafted recorded streaming sessions that elevate your educationa
          вкритное. Those meticulously planned sessions, created by top
          intruttore and progenators, promsse unmutched clarity and engagement
        </p>

        <p className="font-bold text-blue-500 pt-3.5">Course Highlights</p>
      </section>
    </div>
  );
}
