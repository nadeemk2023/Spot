import React, { useState } from 'react';
import api from '../../../utils/api.utils';

const SearchBar = () => {
  const [zipcode, setZipcode] = useState('');
  const [breed, setBreed] = useState('');
  const [username, setUsername] = useState('');
  const [size, setSize] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    try {
      const lowercaseUsername = username.toLowerCase();
      const lowercaseBreed = breed.toLowerCase();
      const lowercaseSize = size.toLowerCase();

      if (
        zipcode.trim() !== '' ||
        lowercaseBreed.trim() !== '' ||
        lowercaseUsername.trim() !== '' ||
        lowercaseSize.trim() !== ''
      ) {
        const response = await api.get('/users/search', {
          params: {
            zipcode,
            breed: lowercaseBreed,
            username: lowercaseUsername,
            size: lowercaseSize,
          },
        });

        setSearchResults(response.data);

        setZipcode('');
        setBreed('');
        setUsername('');
        setSize('');

        setShowResults(true);
      } else {
        setShowResults(false);
      }
    } catch (error) {
      console.error('Error handling search:', error.message);
    }
  };

  return (
      <div>
      <h2>Let's Make Some Friends!</h2>
      <p>Please enter one search field below</p>

      <input
        type="text"
        value={username}
        placeholder="Username"
        style={{ width: "200px", marginLeft: "5px" }}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        value={breed}
        placeholder="Breed"
        style={{ width: "200px", marginLeft: "5px" }}
        onChange={(e) => setBreed(e.target.value)}
      />

      <input
        type="text"
        value={size}
        placeholder="Size (Small, Medium, or Large)"
        style={{ width: "250px", marginLeft: "5px" }}
        onChange={(e) => setSize(e.target.value)}
      />

      <input
        type="text"
        value={zipcode}
        placeholder="Zipcode"
        style={{ width: "150px", marginLeft: "5px" }}
        onChange={(e) => setZipcode(e.target.value)}
      />

      <button style={{ margin: "2px" }} onClick={handleSearch}>
        Search
      </button>

      
    </div>
  );
};

export default SearchBar;
