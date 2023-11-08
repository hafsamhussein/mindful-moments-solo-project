// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import './MomentsPage.css'; 

// function MomentsPage() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [momentsList, setMomentsList] = useState([]);
  

//   useEffect(() => {
//     fetchMoments();
//   }, []);

//   const fetchMoments = async () => {
//     try {
//       const response = await fetch("/api/moments");
//       if (!response.ok) {
//         throw new Error("Network response was not OK");
//       }
//       const results = await response.json();
//       setMomentsList(results);
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong fetching moments.");
//     }
//   };

//   const deleteMoment = async (id) => {
//     try {
//       const response = await fetch(`/api/moments/${id}`, { method: "DELETE" });
//       if (!response.ok) {
//         throw new Error("Network response was not OK");
//       }
//       fetchMoments();
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong deleting the moment.");
//     }
//   };

//   const editMoment = (id) => {
//     const momentToEdit = momentsList.find((moment) => moment.id === id);
//     if (!momentToEdit) {
//       console.error(`No moment found with id: ${id}`);
//       return;
//     }

//     dispatch({
//       type: "SET_MOMENT",
//       payload: momentToEdit,
//     });

//     history.push(`/EditMoment/${id}`);
//   };

//   const addNewMoment = () => {
//     history.push("/AddNewMoment");
//   };

//   const formatDate = (isoString) => {
//     return isoString.split('T')[0];
//   };

//   return (
//     <div className="container">
      
//       <h2>Your Moments</h2>
//       {momentsList.map((moment) => (
//         <div key={moment.id} className="moment-card">
          
//           <h3>{moment.name}</h3>
//           <p>{moment.notes}</p>
//           <p>Date: {formatDate(moment.date)}</p>
//           <img src={moment.photo_url} alt={moment.name} />
//           <button onClick={() => editMoment(moment.id)}>Edit</button>
//           <button onClick={() => deleteMoment(moment.id)}>Delete</button>
//         </div>
//       ))}
//       <button onClick={addNewMoment}>Add New Moment</button>
//     </div>
//   );
// }

// export default MomentsPage;

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './MomentsPage.css';
import { useDispatch } from 'react-redux';

function MomentsPage() {
  const history = useHistory();
  const [momentsList, setMomentsList] = useState([]);
 

  // New state for favorite moments
  const [favoriteMoments, setFavoriteMoments] = useState(() => {
    // Load favorites from local storage if available
    const savedFavorites = localStorage.getItem("favoriteMoments");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    fetchMoments();
    // Save favorite moments to local storage whenever it changes
    localStorage.setItem("favoriteMoments", JSON.stringify(favoriteMoments));
  }, [favoriteMoments]);

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
  const dispatch = useDispatch();

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

  const toggleFavorite = (moment) => {
    const isFavorite = favoriteMoments.includes(moment.id);
    if (isFavorite) {
      setFavoriteMoments(favoriteMoments.filter((id) => id !== moment.id));
    } else {
      setFavoriteMoments([...favoriteMoments, moment.id]);
    }
  };

  const formatDate = (isoString) => {
        return isoString.split('T')[0];
      };

  const renderMoment = (moment, isFavoriteList = false) => (
    <div key={moment.id} className="moment-card">
      <h3>{moment.name}</h3>
      <p>{moment.notes}</p>
      <p>Date: {formatDate(moment.date)}</p>
      <img src={moment.photo_url} alt={moment.name} />
      {!isFavoriteList && (
        <>
          <button onClick={() => editMoment(moment.id)}>Edit</button>
          <button onClick={() => deleteMoment(moment.id)}>Delete</button>
        </>
      )}
      <button onClick={() => toggleFavorite(moment)}>
        {favoriteMoments.includes(moment.id) ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );

  return (
    <div className="container">
      <h2>Your Moments</h2>
      <div className="moments-list">
        {momentsList.map((moment) => renderMoment(moment))}
      </div>
      <button onClick={addNewMoment}>Add New Moment</button>
      
      <hr />
      
      <h2>Your Favorite Moments</h2>
      <div className="favorites-list">
        {momentsList
          .filter((moment) => favoriteMoments.includes(moment.id))
          .map((moment) => renderMoment(moment, true))}
      </div>
    </div>
  );
}

export default MomentsPage;