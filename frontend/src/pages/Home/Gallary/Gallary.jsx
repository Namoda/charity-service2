import React from 'react';

const memories = [
  { id: 1, title: 'Helping Hands Event', date: '2023-05-10', img: 'https://example.com/photo1.jpg' },
  { id: 2, title: 'Community Clean Up', date: '2023-04-22', img: 'https://example.com/photo2.jpg' },
  { id: 3, title: 'Food Drive', date: '2023-03-15', img: 'https://example.com/photo3.jpg' },
  // Add more memories as needed
];

const MemoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Memories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map(memory => (
            <div
              key={memory.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img src={memory.img} alt={memory.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">{memory.title}</h2>
                <p className="text-gray-600 mt-2">{new Date(memory.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoriesPage;
