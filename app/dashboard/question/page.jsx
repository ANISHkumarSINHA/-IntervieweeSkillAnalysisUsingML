"use client";

import React, { useState, useEffect } from 'react';

const PracticeTopQuestions = () => {
  const sections = [
    { title: 'DSA', question: 'Why do we use DP instead of recursion?' },
    { title: 'AI/ML', question: 'What is the difference between supervised and unsupervised learning?' },
    { title: 'MERN STACK', question: 'What is the purpose of middleware in Express?' },
    { title: 'Cloud Computing', question: 'What are the key differences between IaaS and PaaS?' },
  ];

  const [displayedTexts, setDisplayedTexts] = useState(Array(sections.length).fill(''));
  const [isDeleting, setIsDeleting] = useState(Array(sections.length).fill(false));
  const [typingSpeeds, setTypingSpeeds] = useState(Array(sections.length).fill(100));

  useEffect(() => {
    const handleTyping = (index) => {
      const currentText = sections[index].question;
      if (isDeleting[index]) {
        setDisplayedTexts(prev => {
          const updatedTexts = [...prev];
          updatedTexts[index] = updatedTexts[index].substring(0, updatedTexts[index].length - 1);
          return updatedTexts;
        });
        setTypingSpeeds(prev => {
          const updatedSpeeds = [...prev];
          updatedSpeeds[index] = 50;
          return updatedSpeeds;
        });
      } else {
        setDisplayedTexts(prev => {
          const updatedTexts = [...prev];
          updatedTexts[index] = currentText.substring(0, prev[index].length + 1);
          return updatedTexts;
        });
        setTypingSpeeds(prev => {
          const updatedSpeeds = [...prev];
          updatedSpeeds[index] = 100;
          return updatedSpeeds;
        });
      }

      if (!isDeleting[index] && displayedTexts[index] === currentText) {
        setIsDeleting(prev => {
          const updatedDeleting = [...prev];
          updatedDeleting[index] = true;
          return updatedDeleting;
        });
        setTypingSpeeds(prev => {
          const updatedSpeeds = [...prev];
          updatedSpeeds[index] = 1000;
          return updatedSpeeds;
        });
      } else if (isDeleting[index] && displayedTexts[index] === '') {
        setIsDeleting(prev => {
          const updatedDeleting = [...prev];
          updatedDeleting[index] = false;
          return updatedDeleting;
        });
        setTypingSpeeds(prev => {
          const updatedSpeeds = [...prev];
          updatedSpeeds[index] = 500;
          return updatedSpeeds;
        });
      }
    };

    const timers = sections.map((_, index) => {
      return setTimeout(() => handleTyping(index), typingSpeeds[index]);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [displayedTexts, isDeleting, typingSpeeds]);

  return (
    <div className="relative flex flex-col items-center my-8">
      <h1 className="text-4xl text-gray-800 mb-6 shadow-md">Practice Top Questions</h1>
      <div className="grid grid-cols-2 gap-8 max-w-4xl w-full">
        {sections.map((section, index) => (
          <div key={index} className="bg-white bg-opacity-80 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl text-gray-700 mb-4">{section.title}</h2>
            <div className="text-lg text-black">
              <span>{displayedTexts[index]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Train Simulation */}
      <TrainAnimation />
    </div>
  );
};

const TrainAnimation = () => {
  return (
    <div className="train-container">
      <div className="train flex items-center">
        {/* Train Engine */}
        <div className="engine flex items-center justify-center bg-blue-500 text-white text-lg font-bold p-4 rounded-l-lg shadow-lg">
          🚂 Interview
        </div>
        
        {/* Train Coaches */}
        {['Google', 'Microsoft', 'Facebook', 'Apple', 'Netflix'].map((company, index) => (
          <div key={index} className="coach flex items-center justify-center bg-gray-300 text-black text-lg font-bold p-4 border-l-4 border-gray-400 shadow-lg">
            {company}
          </div>
        ))}

        {/* Smoke */}
        <div className="smoke"></div>
        <div className="smoke delay-1"></div>
        <div className="smoke delay-2"></div>
      </div>

      {/* Embedded CSS for Train Animation */}
      <style jsx>{`
        .train-container {
          width: 100%;
          height: 150px; /* Adjust height as needed */
          position: fixed;
          bottom: 20px; /* Move the train further down */
          left: 0;
          overflow: hidden;
          z-index: 100;
        }

        .train {
          position: absolute;
          transform: translateX(100%); /* Start off-screen to the right */
          animation: moveTrain 12s linear infinite; /* Adjust duration for speed */
        }

        @keyframes moveTrain {
          0% { transform: translateX(100%); } /* Start from the rightmost part */
          100% { transform: translateX(-100%); } /* Move to the leftmost part */
        }

        .smoke {
          position: absolute;
          width: 20px;
          height: 20px;
          background-color: rgba(192, 192, 192, 0.7);
          border-radius: 50%;
          animation: puff 2s ease-in-out infinite;
        }

        .smoke.delay-1 { animation-delay: 0.5s; }
        .smoke.delay-2 { animation-delay: 1s; }

        @keyframes puff {
          0% { transform: scale(0.5) translate(0, 0); opacity: 1; }
          100% { transform: scale(2) translate(-100px, -100px); opacity: 0; }
        }

        .engine, .coach {
          position: relative;
        }

        .engine::before, .coach::before {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 20%;
          width: 10px;
          height: 10px;
          background-color: black;
          border-radius: 50%;
        }

        .engine::after, .coach::after {
          content: "";
          position: absolute;
          bottom: -10px;
          right: 20%;
          width: 10px;
          height: 10px;
          background-color: black;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default PracticeTopQuestions;