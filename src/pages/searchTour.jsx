  import React, { useState, useEffect, useRef } from 'react';
  import axios from 'axios';

  const tagColors = [
    'bg-blue-200', 'bg-green-200', 'bg-red-200', 'bg-yellow-200', 
    'bg-purple-200', 'bg-pink-200', 'bg-indigo-200', 'bg-orange-200',
    'bg-teal-200', 'bg-cyan-200'
  ];

  function getColorForTag(tagId) {
    return tagColors[tagId % tagColors.length];
  }

  const AutocompleteSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState({ destinations: [], products: [] });
    const [token, setToken] = useState('');
    const cancelTokenRef = useRef(null);
    const [date, setDate] = useState('');

    // Simulate login on component mount
    useEffect(() => {
      async function authenticate() {
        try {
          const response = await axios.post('https://dev.intraversewebservices.com/api/main/v1/account/login?populate=detail', {
            email: "abebe2@yopmail.com",
            password: "Password.1"
          });
          setToken(response?.data?.data?.token);
        } catch (error) {
          console.error('Login error:', error);
        }
      }
      authenticate();
    }, []);

    useEffect(() => {
      if (!searchTerm.trim() || !token) {
        setSuggestions({ destinations: [], products: [] });
        return;
      }

      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel("Canceled due to new request");
      }

      cancelTokenRef.current = axios.CancelToken.source();

      axios.get(`https://dev.intraversewebservices.com/api/product/v1/package/auto-complete?q=${encodeURIComponent(searchTerm)}`, {
        headers: { Authorization: `Bearer ${token}` },
        cancelToken: cancelTokenRef.current.token
      }).then(response => {
        setSuggestions(response.data.data);
      }).catch(error => {
        if (!axios.isCancel(error)) {
          console.error('Failed to fetch suggestions:', error);
        }
      });

      return () => {
        if (cancelTokenRef.current) {
          cancelTokenRef.current.cancel("Component unmounted");
        }
      };
    }, [searchTerm, token]);

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white p-4 shadow-lg rounded-lg">
          <div className="flex flex-col gap-4">
              <h1 className='font-bold text-[18px]'>Search for Tours</h1>
              <p className="text-[#818083 tex-[14px]">Search for a place or activity</p>
            <input
              type="text"
              placeholder="e.g., Lagos, Nigeria"
              className="border -mt-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="mt-2 bg-white shadow overflow-hidden rounded-md">
              <ul>
                {suggestions.destinations.map((destination) => (
                  <li key={destination.dbid} className="px-4 py-2 border-b border-gray-200 hover:bg-gray-50">
                    <div className="font-semibold">{destination.destinationName}</div>
                    <div className="text-sm flex flex-wrap gap-1">
                      {destination.tags.map((tag) => (
                        <span key={tag.tagId} className={`${getColorForTag(tag.tagId)} text-gray-800 px-2 py-1 rounded`}>
                          {tag.tagName}
                        </span> 
                      ))}
                    </div>
                  </li>
                ))}
                {suggestions.products.map((product) => (
                  <li key={product.id} className="px-4 py-2 border-b border-gray-200 hover:bg-gray-50">
                    <div className="font-semibold">{product.name}</div>
                  </li>
                ))}
              </ul>
            <div className='flex flex-col gap-3'>
              <p className='text-[#818083] text-[14px]'>When</p>
              <input
            type="date"
            className="border -mt-2 border-gray-300 p-2 max-sm:w-[400px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          //   onClick={handleSearch}
          >
              Search for tours
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default AutocompleteSearch;
