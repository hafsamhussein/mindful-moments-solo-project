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

    const addMoment = () => {
        setMomentList([...momentList, { ...newMoment, id: Date.now() }]);
        setNewMoment({name: '', notes: '', date: '', photo_url: '' });
    };

    const deleteMoment = (id) => {
        const updatedMoments = momentList.filter(moment => moment.id !== id);
        setMomentList(updatedMoments);
    };

    return (
        <div className="container">
            <h2>My Moments</h2>
            
            {/* Input Form */}
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

            {/* Displaying Moments */}
            {
                momentList.length === 0 && (
                    <div>No moments to display.</div>
                )
            }
            {
                momentList.map(moment => {
                    return (
                        <div className="responsive" key={moment.id}>
                            <div className="gallery">
                                <div className="desc">{moment.name}</div>
                                <div className="desc">{moment.notes}</div>
                                <div className="desc">{moment.date}</div>
                                <img src={moment.photo_url} alt={`Moment from ${moment.date}`} />
                                <br />
                                <div style={{ textAlign: 'center', padding: '5px' }}>
                                    <button style={{ cursor: 'pointer' }} onClick={() => deleteMoment(moment.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="clearfix"></div>
        </div>
    );
}

export default MomentsPage;
