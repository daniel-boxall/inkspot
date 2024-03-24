// ArtistProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ArtistProfile() {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch artist profile data from the backend
    axios.get('/api/artist/profile')
      .then(response => {
        setArtist(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching artist profile:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!artist) {
    return <div>No artist profile found</div>;
  }

  return (
    <div>
      <h2>Artist Profile</h2>
      <div>
        <h3>Username: {artist.username}</h3>
        <p>Email: {artist.email}</p>
        <p>Bio: {artist.bio}</p>
        <p>Location: {artist.location}</p>
        {/* Render other profile fields as needed */}
      </div>
    </div>
  );
}

export default ArtistProfile;
