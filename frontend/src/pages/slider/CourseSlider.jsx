import React from 'react';
import Slider from 'react-slick';

const CourseSlider = ({ courses }) => {
    console.log(courses) ;
     
  const settings = {
    dots: true,            // Show dots for navigation
    infinite: true,       // Infinite scrolling
    speed: 500,           // Transition speed
    slidesToShow: 3,      // Number of slides to show
    slidesToScroll: 1,    // Number of slides to scroll
    responsive: [
      {
        breakpoint: 1024, // For medium screens
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,  // For small screens
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden w-auto">
      <Slider {...settings}>
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 min-w-[200px] flex-shrink-0"
          >
            <img src={course.image} alt={course.title} className="w-full h-40 rounded-lg object-cover mb-4" />
            <h3 className="text-lg font-semibold text-blue-600 mb-2">{course.title}</h3>
            <p className="text-gray-600"><span role="img" aria-label="sessions">📅</span> {course.sessions}</p>
            <p className="text-gray-600"><span role="img" aria-label="duration">🕒</span> {course.duration}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CourseSlider;
