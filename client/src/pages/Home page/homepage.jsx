import backgroundImage from "../../../public/imgs/slider/Artboard.png";
import { useState } from "react";
import { motion } from "framer-motion";
import BookDemoClass from "../Course/BookDemoClass";
import Courses from "../../components/Carousal";
import Membership from "../../components/Membership";
import { Link } from "react-router-dom";

const gradientBackground = {
  background:
    "linear-gradient(to bottom left, #E69CC1, #8C6BED, #426BE1, #4896EC)",
};

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80 },
    },
  };

  return (
    <motion.div
      className="h-auto flex flex-col items-center w-full font-sans overflow-x-hidden lg:overflow-x-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Main Section */}
      <motion.div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full flex flex-col md:flex-row items-center justify-around p-4"
        variants={itemVariants}
      >
        {/* Text Section */}
        <motion.div
          className="flex flex-col items-start text-left text-white px-4 mb-8"
          variants={itemVariants}
        >
          <motion.h2
            className="text-2xl md:text-4xl font-sans"
            variants={itemVariants}
          >
            Transform Your Abilities
          </motion.h2>
          <motion.h2
            className="text-2xl md:text-4xl font-sans mb-4"
            variants={itemVariants}
          >
            Into Capabilities
          </motion.h2>

          <motion.p
            className="text-white mb-1 font-sans"
            variants={itemVariants}
          >
            Join this 20 weeks, Job-ready Program to master
          </motion.p>
          <motion.p
            className="text-white mb-1 font-sans"
            variants={itemVariants}
          >
            Data Analytics from scratch with Top Data Analysts
          </motion.p>
          <motion.p
            className="text-white mb-4 font-sans"
            variants={itemVariants}
          >
            from Microsoft, KPMG, Amazon, and Rapido.
          </motion.p>

          <Link
            to="/course"
            variants={itemVariants}
            className="relative bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg duration-200"
          >
            Explore Program
          </Link>
        </motion.div>

        {/* Form Section */}
        <BookDemoClass />
      </motion.div>

      {/* Skill Boxes */}
      <motion.div
        className="mt-10 flex flex-wrap flex-col md:flex-row gap-4 justify-center px-4"
        variants={containerVariants}
      >
        {["Foundational", "Employability", "Entrepreneurial"].map(
          (skill, index) => (
            <motion.div
              key={index}
              style={gradientBackground}
              className="text-white font-sans flex flex-col items-start justify-center p-8 sm:p-6 h-48 w-80 md:w-56 lg:w-80 rounded-lg shadow-lg"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              <h1 className="font-semibold text-2xl lg:text-3xl">
                {skill} Skills
              </h1>
            </motion.div>
          )
        )}
      </motion.div>

      {/* Courses Section */}
      <motion.div
        className="flex items-center justify-center lg:w-[1000px]"
        variants={itemVariants}
      >
        <Courses />
      </motion.div>

      <Membership />
    </motion.div>
  );
}

export default HomePage;
