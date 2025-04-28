import React, { useRef } from 'react';
import "../assets/css/style.css";
import { Link } from 'react-router-dom';
const LearningSection = (props) => {
  const gridRef = useRef(null); // Unique ref for this component instance

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -gridRef.current.offsetWidth * 0.8, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: gridRef.current.offsetWidth * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <section className='bg-[#f9f9f9]'>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-20`}>
        <div className='text-center mb-8 md:mb-12'>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Start <span className="text-[#0a63b0]">{props.name}</span>
          </h2>
        </div>

        <div className="flex justify-between items-center mb-6 md:mb-8">
          <button onClick={scrollLeft} className="p-2 md:p-3 rounded-md bg-gray-100 shadow-md hover:bg-white text-gray-700" aria-label="Scroll left">
            &#10094;
          </button>

          <button onClick={scrollRight} className="p-2 md:p-3 rounded-md bg-gray-100 shadow-md hover:bg-white text-gray-700" aria-label="Scroll right">
            &#10095;
          </button>
        </div>

        <div className="relative">
          <div 
            ref={gridRef}
            className="flex overflow-x-auto pb-6 space-x-4 sm:space-x-6 mb-8 scroll-smooth pt-6"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#9CA3AF #F3F4F6'
            }}
          >
            {props.courses.map((course, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 h-[5rem] sm:h-[6rem] w-[14rem] sm:w-[18rem] text-[#0a63b0] bg-white p-4 sm:p-6 transform hover:-translate-y-3 transition-transform duration-300 text-center flex justify-center items-center font-extrabold rounded-lg shadow-xl hover:shadow-2xl cursor-pointer"
              >
                <h3 className="text-lg sm:text-xl font-semibold">{course}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to={props.portion}>
          <button className="px-5 py-2 sm:px-6 sm:py-2 bg-[#0a63b0] border-2 hover:border-[#0a63b0] text-white hover:bg-white hover:text-[#0a63b0] font-bold transform transition-all duration-300 rounded-md">
            SEE MORE →
          </button>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default LearningSection;
