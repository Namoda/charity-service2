import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 p-16 animate-fade-in">About Us</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 animate-slide-up flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-3/4">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to our charity organization! We are dedicated to making a positive impact in our community through various outreach programs and events. Our mission is to provide support and resources to those in need, and to foster a sense of community and togetherness.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our team is comprised of passionate individuals who are committed to our cause. We believe that every small act of kindness can make a big difference, and we work tirelessly to ensure that our efforts reach those who need it most.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Thank you for taking the time to learn more about us. Together, we can create a brighter future for everyone.
            </p>
          </div>
          <div className="md:w-1/4 md:ml-6 mt-6 md:mt-0 flex justify-center md:block">
            <img
              src="https://us.123rf.com/450wm/macrovector/macrovector1512/macrovector151200749/49547850-charity-concept-icons-set-with-online-donations-symbols-flat-isolated-vector-illustration.jpg?ver=6"
              alt="About Us"
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg shadow-lg animate-zoom-in"
            />
          </div>
        </div>
        <div className="mt-12">
          <video
            src="https://videos.pexels.com/video-files/6893775/6893775-sd_640_360_25fps.mp4"
            autoPlay
            muted
            loop
            className="w-full h-64 object-cover rounded-lg shadow-lg animate-zoom-in"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
