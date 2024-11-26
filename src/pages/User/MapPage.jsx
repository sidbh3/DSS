import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import logo from '../../assets/logo.jpeg';
const MapPage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Handle search logic here
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] dark:bg-background flex flex-col items-center p-6">
      <header className="w-full flex items-center justify-between p-4 bg-[#001F54] dark:bg-background text-white shadow-md">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg" />
          <h1 className="text-2xl font-bold">Map Search</h1>
        </div>
      </header>

      <main className="flex flex-col items-center w-full mt-6 space-y-4">
        <div className="flex items-center w-full max-w-3xl bg-white dark:bg-gray-800 rounded-md shadow-md p-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-l focus:outline-none dark:bg-gray-800 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-[#001F54] dark:bg-gray-700 text-white px-4 py-2 rounded-r hover:opacity-90 transition"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center gap-4 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Latitude"
            className="w-full px-4 py-2 rounded-md focus:outline-none bg-white dark:bg-gray-800 dark:text-white shadow-md"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            type="text"
            placeholder="Longitude"
            className="w-full px-4 py-2 rounded-md focus:outline-none bg-white dark:bg-gray-800 dark:text-white shadow-md"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <button
            className="bg-[#001F54] dark:bg-gray-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition shadow-md"
            onClick={handleSearch}
          >
            <FaMapMarkerAlt />
          </button>
        </div>

        <div className="w-full max-w-4xl mt-4">
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-md overflow-hidden">
            <div className="h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12529714.228080893!2d-104.99025122627162!3d39.7437419807338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1637779915183!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapPage
