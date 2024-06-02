import React from 'react';

const memories = [
  { id: 1, title: 'Helping School', date: '2023-05-10', img: 'https://www.globalgiving.org/pfil/47064/ph_47064_181418.jpg' },
  { id: 2, title: 'Helping Orphanage ', date: '2023-04-22', img: 'https://clubrunner.blob.core.windows.net/00000001150/Images/International%20Committee/Sri%20Lanka%20Orphanage/sri-lanka-Orphanage.jpg' },
  { id: 3, title: 'Preschool Happy Child', date: '2023-03-15', img: 'https://www.faithtoaction.org/wp-content/uploads/2015/05/Screen-Shot-2015-05-19-at-4.23.24-PM.png' },
  { id: 3, title: 'Food Drive', date: '2024-01-02', img: 'https://cdn.pixabay.com/photo/2017/05/30/07/05/social-work-2356009_1280.jpg' },
  { id: 3, title: 'Happy Child', date: '2024-03-15', img: 'https://cdn.pixabay.com/photo/2019/10/16/00/46/children-4553208_1280.jpg' },
  { id: 3, title: 'Enjoy Child', date: '2024-03-25', img: 'https://images.prestigeonline.com/wp-content/uploads/sites/3/2024/03/27130915/Kate-Middleton-royal-duties-and-charity-work-1600x900.jpg' },
  { id: 3, title: 'Food Donate', date: '2024-04-18', img: 'https://www.bethanychurches.org/Images/content/3279/1283354.jpeg' },
  { id: 3, title: 'Donation Campaing', date: '2024-04-28', img: 'https://www.servelk.org/wp-content/uploads/2018/07/Volunteers_Youth_Tom-v1.jpg' },
  { id: 3, title: 'Education Donate', date: '2024-05-10', img: 'https://media-cdn.tripadvisor.com/media/photo-s/16/95/a2/32/book-donation-for-norwood.jpg' },

  // Add more memories as needed
];

const MemoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 p-11">Memories</h1>
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
