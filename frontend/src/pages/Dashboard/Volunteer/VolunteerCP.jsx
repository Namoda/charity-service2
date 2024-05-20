import React from 'react';
import { useUser } from '../../../hooks/useUser';

const Header = ({ currentUser }) => (
    <div className="flex justify-between items-center bg-white shadow-lg p-4">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {currentUser?.name}!</h1>
    </div>
);

const ActivityCard = ({ title, description, date }) => (
    <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
        <p className="text-gray-500 mt-4">{date}</p>
    </div>
);

const StatisticsCard = ({ title, value }) => (
    <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-3xl text-gray-700">{value}</p>
    </div>
);

const AnnouncementCard = ({ title, content }) => (
    <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{content}</p>
    </div>
);

const VolunteerDashboard = () => {
    const { currentUser } = useUser();
    
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 flex flex-col">
                <Header currentUser={currentUser} />
                <main className="flex-1 p-6">
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <StatisticsCard title="No of Enrolled Donors" value="120" />
                        <StatisticsCard title="No of Donations" value="15" />
                        <StatisticsCard title="Available Donations" value="3" />
                    </section>
                    <section className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <ActivityCard title="Beach Cleanup" description="Helped clean up the local beach." date="May 15, 2024" />
                            <ActivityCard title="Food Drive" description="Collected and distributed food to the needy." date="April 20, 2024" />
                            <ActivityCard title="Charity Run" description="Participated in a charity run to raise funds." date="March 30, 2024" />
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Announcements</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnnouncementCard title="Volunteer Appreciation Day" content="Join us for a day of celebration and appreciation." />
                            <AnnouncementCard title="New Volunteer Training" content="Sign up for our upcoming training session." />
                            <AnnouncementCard title="Fundraising Gala" content="Support our cause by attending the fundraising gala." />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default VolunteerDashboard;
