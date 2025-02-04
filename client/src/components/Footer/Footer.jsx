import logo from "../../../public/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#1f2737] flex flex-col gap-20 px-4 py-8 md:px-14 md:py-10">
      {/* Top component */}
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-start md:justify-between md:gap-16 lg:gap-36">
        {/* Logo */}
        <img src={logo} alt="logo" />

        {/* Program Section */}
        <ul className="text-white flex flex-col gap-5">
          <li className="text-xl font-semibold mb-2">AbilitaEdge Program</li>
          <li>MERN Stack Website</li>
          <li>Android Development</li>
          <li>Frontend Development</li>
          <li>Backend Development</li>
        </ul>

        {/* Resources Section */}
        <ul className="text-white flex flex-col gap-5">
          <li className="text-xl font-semibold mb-2">Resources</li>
          <li>Documentation</li>
          <li>Tutorials</li>
          <li>Community</li>
          <li>Support</li>
        </ul>
      </div>

      {/* Bottom component */}
      <div className="text-white">
        <hr className="border-t border-gray-500" />
        <h1 className="mt-4 text-sm font-semibold">Trending Courses</h1>
        <div className="flex flex-wrap text-[13px] mt-2 ">
          <span className="mr-2">Data Science Course</span>
          <span className="mr-2">Android App Development Course</span>
          <span className="mr-2">
            MERN Full Stack Website Development Course
          </span>
          <span className="mr-2">Frontend Website Development Course</span>
          <span className="mr-2">Backend Website Development Course</span>
          <span className="mr-2">Machine Learning Course</span>
          <span className="mr-2">DevOps Course</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
