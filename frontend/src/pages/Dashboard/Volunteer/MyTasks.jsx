import React from 'react';

const donations = [
  {
    id: 1,
    photo: 'https://www.teachtci.com/wp-content/uploads/2020/09/Active-Citizenship.png',
    title: 'Charity Event 1',
    date: '2024-03-15',
    time: '10:00 AM',
    place: 'Kind City Park'
  },
  {
    id: 2,
    photo: 'https://st2.depositphotos.com/1518767/6900/i/450/depositphotos_69005549-stock-photo-volunteer-family-separating-donations-stuffs.jpg',
    title: 'Charity Event 2',
    date: '2024-05-18',
    time: '2:00 PM',
    place: 'Helping Hands Center'
  },
  {
    id: 3,
    photo: 'https://bloximages.newyork1.vip.townnews.com/guampdn.com/content/tncms/assets/v3/editorial/2/35/2356b4a0-6a32-11ed-8f9d-f347c7d0b814/637c7204e100f.image.jpg?resize=667%2C500',
    title: 'Charity Event 3',
    date: '2024-05-28',
    time: '8:30 AM',
    place: 'Super Wole Center'
  },
  {
    id: 3,
    photo: 'https://resources.karuna.lk/program/charitybanner/7cbe3e35-1df4-4650-84d2-f934edfc5582.jpeg',
    title: 'Charity Event 3',
    date: '2024-06-2',
    time: '8:30 AM',
    place: 'School Gampaha'
  },
  {
    id: 3,
    photo: 'https://content.wepik.com/statics/10742328/preview-page0.jpg',
    title: 'Charity Event 3',
    date: '2024-06-2',
    time: '8:30 AM',
    place: 'School Gampaha'
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
