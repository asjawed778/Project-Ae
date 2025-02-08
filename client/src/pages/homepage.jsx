import backgroundImage from "../../public/imgs/slider/Artboard.png";
import { useState } from "react";
import { motion } from "framer-motion";
import Courses from "../components/Carousal";

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
      className="h-auto flex flex-col items-center w-full font-sans"
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

          <motion.button
            className="relative bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={itemVariants}
          >
            Explore Program
          </motion.button>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="bg-white p-6 sm:p-4 rounded-lg shadow-black w-[350px] sm:w-80 md:w-80"
          variants={itemVariants}
        >
          <h3 className="sm:text-lg font-sans text-blue-600 mb-4">
            Book a Live Class, For Free!
          </h3>

          <motion.form className="space-y-4 font-sans">
            {["Name", "Mobile No", "Education", "Course"].map((placeholder) => (
              <motion.input
                key={placeholder}
                type="text"
                placeholder={placeholder}
                className="w-full px-4 py-2 sm:py-1.5 border rounded-md font-sans focus:border-blue-600 focus:outline-none"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              />
            ))}
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span className="text-sm font-sans">
                Send me updates on WhatsApp
              </span>
            </label>

            <motion.button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans py-2 sm:py-1.5 rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </motion.form>
        </motion.div>
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
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-sans p-8 sm:p-6 rounded-lg shadow-lg h-48 w-80 md:w-56 lg:w-80 flex flex-col items-start"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              <h1 className="text-2xl lg:text-2xl">{skill} Skills</h1>
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
    </motion.div>
  );
}

export default HomePage;
