import React from 'react';

const donations = [
  {
    id: 1,
    photo: 'https://via.placeholder.com/400x200',
    title: 'Charity Event 1',
    date: '2024-06-15',
    time: '10:00 AM',
    place: 'Kind City Park'
  },
  {
    id: 2,
    photo: 'https://via.placeholder.com/400x200',
    title: 'Charity Event 2',
    date: '2024-06-18',
    time: '2:00 PM',
    place: 'Helping Hands Center'
  },
  // Add more donations as needed
];

const DonationCard = ({ photo, title, date, time, place }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={photo} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          <strong>Date:</strong> {date}<br />
          <strong>Time:</strong> {time}<br />
          <strong>Place:</strong> {place}
        </p>
      </div>
    </div>
  );
};

const DonationList = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Complete Donations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {donations.map(donation => (
            <DonationCard
              key={donation.id}
              photo={donation.photo}
              title={donation.title}
              date={donation.date}
              time={donation.time}
              place={donation.place}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationList;
