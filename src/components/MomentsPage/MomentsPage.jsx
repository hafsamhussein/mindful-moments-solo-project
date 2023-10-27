import React, { useState } from 'react';
import './MomentsPage.css';
import { useSelector } from 'react-redux';

function MomentsPage() {
    const user = useSelector((store) => store.user);
    const [momentList, setMomentList] = useState([]);
    const [newMoment, setNewMoment] = useState({
        name: '',
        notes: '',
        date: '',
        photo_url: ''
    });

    const [isEditing, setIsEditing] = useState(null);
    const [editedMoment, setEditedMoment] = useState({});

    const addMoment = () => {
        setMomentList([...momentList, { ...newMoment, id: Date.now() }]);
        setNewMoment({name: '', notes: '', date: '', photo_url: '' });
    };

    const startEditing = (moment) => {
        setIsEditing(moment.id);
        setEditedMoment(moment);
    };

    const saveEdits = () => {
        setMomentList(momentList.map(moment => moment.id === isEditing ? editedMoment : moment));
        setIsEditing(null);
        setEditedMoment({});
    };

    const deleteMoment = (id) => {
        const updatedMoments = momentList.filter(moment => moment.id !== id);
        setMomentList(updatedMoments);
    };

    return (
        <div className="container">
        <h2>My Moments</h2>
            <div>
             <input 
                value={newMoment.name}
                onChange={(e) => setNewMoment({ ...newMoment, name: e.target.value })}
                placeholder="Name"
                />
                <textarea 
                    value={newMoment.notes}
                    onChange={(e) => setNewMoment({ ...newMoment, notes: e.target.value })}
                    placeholder="Notes"
                />
                <input 
                    type="date"
                    value={newMoment.date}
                    onChange={(e) => setNewMoment({ ...newMoment, date: e.target.value })}
                    placeholder="Date"
                />
                <input 
                    value={newMoment.photo_url}
                    onChange={(e) => setNewMoment({ ...newMoment, photo_url: e.target.value })}
                    placeholder="Photo URL"
                />
                <button onClick={addMoment}>Add Moment</button>
            </div>

            {
                momentList.length === 0 && (
                    <div>No moments to display.</div>
                )
            }
            
            {
        momentList.map(moment => {
            if (moment.id === isEditing) {
                return (
                    <div className="responsive" key={moment.id}>
                        <div className="gallery">
                            <input value={editedMoment.name} onChange={e => setEditedMoment({...editedMoment, name: e.target.value})} />
                            <textarea value={editedMoment.notes} onChange={e => setEditedMoment({...editedMoment, notes: e.target.value})} />
                            <input type="date" value={editedMoment.date} onChange={e => setEditedMoment({...editedMoment, date: e.target.value})} />
                            <input value={editedMoment.photo_url} onChange={e => setEditedMoment({...editedMoment, photo_url: e.target.value})} />
                            <button onClick={saveEdits}>Save</button>
                        </div>
                    </div>
                );
                    } else {
                        return (
                            <div className="responsive" key={moment.id}>
                                <div className="gallery">
                                    <div className="desc">{moment.name}</div>
                                    <div className="desc">{moment.notes}</div>
                                    <div className="desc">{moment.date}</div>
                                    <img src={moment.photo_url} alt={`Moment from ${moment.date}`} />
                                    <br />
                                    <div style={{ textAlign: 'center', padding: '5px' }}>
                                        <button onClick={() => startEditing(moment)}>Edit</button>
                                        <button onClick={() => deleteMoment(moment.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })
            }
            <div className="clearfix"></div>
        </div>
    );
}

export default MomentsPage;
