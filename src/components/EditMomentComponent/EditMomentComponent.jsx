import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

const EditMomentComponent = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const moment = useSelector((state) =>
    state.moments.find((m) => m.id === parseInt(id))
  );
  const [formData, setFormData] = useState({
    name: '',
    notes: '',
    date: '', 
    photo_url: '',
  });

  const formatDateToInput = (dateString) => {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`.padStart(2, '0'); 
    let day = `${date.getDate()}`.padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (moment) {
      setFormData({
        ...moment,
        date: formatDateToInput(moment.date), 
      });
    }
  }, [moment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_MOMENT',
      payload: { id: parseInt(id), ...formData },
    });
    history.push('/moments');
  };

  return (
    <div>
      <h2>Edit Moment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Photo URL:
          <input
            type="text"
            name="photo_url"
            value={formData.photo_url}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditMomentComponent;
