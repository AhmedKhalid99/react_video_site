import React, { useState } from 'react';

const Sidebar = ({ courses, selectedCourse, setSelectedCourse, selectedSubCourse, setSelectedSubCourse }) => {
  return (
    <div className="w-1/4 bg-gray-200 p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course, index) => (
            <li key={index}>
              <div
                className={`p-2 cursor-pointer rounded ${
                  selectedCourse === index ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
                onClick={() => setSelectedCourse(index)}
              >
                {course.course_name}
              </div>
              {selectedCourse === index && (
                <ul className="ml-4 mt-2">
                  {course.course_part.map((part, subIndex) => (
                    <li
                      key={subIndex}
                      className={`p-1 cursor-pointer rounded ${
                        selectedSubCourse === subIndex ? "bg-green-500 text-white" : "bg-gray-300"
                      }`}
                      onClick={() => setSelectedSubCourse(subIndex)}
                    >
                      {typeof part === 'string' ? part : Object.keys(part)[0]}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default Sidebar;
