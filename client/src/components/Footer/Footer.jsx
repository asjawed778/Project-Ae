const Footer = () => {
  return (
    <footer className="bg-[#1f2737] w-full px-4 py-8 md:px-14 md:py-10">
      {/* Top component */}
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-start md:gap-16 lg:gap-36">
        {/* Logo */}
        <div className="text-white text-2xl md:text-4xl font-bold">
          Logo Here
        </div>

        {/* Program Section */}
        <div className="text-white">
          <ul>
            <li className="text-[14px] font-semibold mb-2">
              AbilitaEdge Program
            </li>
            <li className="text-[12px]">MERN Stack Website</li>
            <li className="text-[12px]">Android Development</li>
            <li className="text-[12px]">Frontend Development</li>
            <li className="text-[12px]">Backend Development</li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="text-white">
          <ul>
            <li className="text-[14px] font-semibold mb-2">Resources</li>
            <li className="text-[12px]">Documentation</li>
            <li className="text-[12px]">Tutorials</li>
            <li className="text-[12px]">Community</li>
            <li className="text-[12px]">Support</li>
          </ul>
        </div>
      </div>

      {/* Bottom component */}
      <div className="mt-52 text-white">
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
