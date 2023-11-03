import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './AddNewMoment.css';

function AddNewMoment() {
  const [momentData, setMomentData] = useState({
    name: '',
    notes: '',
    date: '',
    photo_url: ''
  });
  const history = useHistory();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') {
      const formattedDate = value ? value.split('T')[0] : ''; 
      setMomentData({ ...momentData, [name]: formattedDate });
    } else {
      setMomentData({ ...momentData, [name]: value });
    }
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...momentData
      };

      // Use Axios to send a POST request
      const response = await axios.post('/api/moments', submitData);
      if (response.status === 200 || response.status === 201) {
        // If the request was successful, redirect to the moments page
        history.push('/moments');
      } else {
        // If the server response is not OK, throw an error
        throw new Error('Failed to add moment.');
      }
    } catch (error) {
      // Handle the error here
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Error adding moment: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  // Render the form
  return (
    <div>
      <h2>Add a New Moment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Moment Name"
          value={momentData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={momentData.notes}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={momentData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="photo_url"
          placeholder="Photo URL"
          value={momentData.photo_url}
          onChange={handleChange}
        />
        <button type="submit">Add Moment</button>
      </form>
    </div>
  );
}

export default AddNewMoment;
