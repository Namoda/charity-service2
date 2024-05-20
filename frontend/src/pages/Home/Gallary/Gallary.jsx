import React from 'react';

import image2 from '../../../assets/gallary/image2.jpg';
import image3 from '../../../assets/gallary/image3.jpg';
import image4 from '../../../assets/gallary/image4.jpg';
import image5 from '../../../assets/gallary/image5.jpg';
import image8 from '../../../assets/gallary/image8.jpg';
import image9 from '../../../assets/gallary/image9.jpg';

const Gallary = () => {
  return (
    <div className="container mx-auto my-28 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold">Our Gallery</h1>
      </div>
      <div className="grid md:grid-cols-1 gap-2">
        
          <img
            src={image4}
            alt="Gallery Image 4"
            className="w-full h-96 object-cover rounded-md transition-transform duration-700 transform hover:scale-105 shadow-lg hover:shadow-2xl animate-image"
          />
        
        <div className="grid grid-cols-2 gap-2">
          {[image2, image3, image3, image5, image8, image9].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Gallery Image ${idx + 1}`}
              className="w-full h-60 object-cover rounded-md transition-transform duration-700 transform hover:scale-105 shadow-lg hover:shadow-2xl animate-image"
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes image-fade-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-image {
          animation: image-fade-in 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Gallary;
