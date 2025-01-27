import React, { useState } from 'react';

const UserDashboard = () => {
    const [profile, setProfile] = useState({
        city: '',
        phone: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle profile update logic here (e.g., API call)
        alert('Profile updated successfully!');
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">User Dashboard</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        placeholder="Enter your city"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        placeholder="Enter your phone number"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Address
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        placeholder="Enter your address"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UserDashboard;
