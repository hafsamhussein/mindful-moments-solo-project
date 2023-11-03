import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function MomentsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [momentsList, setMomentsList] = useState([]);

  useEffect(() => {
    fetchMoments();
  }, []);

  const fetchMoments = async () => {
    try {
      const response = await fetch("/api/moments");
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const results = await response.json();
      setMomentsList(results);
    } catch (error) {
      console.error(error);
      alert("Something went wrong fetching moments.");
    }
  };

  const deleteMoment = async (id) => {
    try {
      const response = await fetch(`/api/moments/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      fetchMoments();
    } catch (error) {
      console.error(error);
      alert("Something went wrong deleting the moment.");
    }
  };

  const editMoment = (id) => {
    const momentToEdit = momentsList.find((moment) => moment.id === id);
    if (!momentToEdit) {
      console.error(`No moment found with id: ${id}`);
      return;
    }

    dispatch({
      type: "SET_MOMENT",
      payload: momentToEdit,
    });

    history.push(`/EditMoment/${id}`);
  };

  const addNewMoment = () => {
    history.push("/AddNewMoment");
  };

  const formatDate = (isoString) => {
    return isoString.split('T')[0];
  };

  return (
    <div className="container">
      <h2>Your Moments</h2>
      {momentsList.map((moment) => (
        <div key={moment.id} className="moment-card">
          <h3>{moment.name}</h3>
          <p>{moment.notes}</p>
          {/* Use the formatDate function to display the date */}
          <p>Date: {formatDate(moment.date)}</p>
          <img src={moment.photo_url} alt={moment.name} />
          <button onClick={() => editMoment(moment.id)}>Edit</button>
          <button onClick={() => deleteMoment(moment.id)}>Delete</button>
        </div>
      ))}
      <button onClick={addNewMoment}>Add New Moment</button>
    </div>
  );
}

export default MomentsPage;


