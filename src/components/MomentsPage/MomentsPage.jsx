import React, { useState } from 'react';
import './MomentsPage.css';
import { useSelector } from 'react-redux';
import MomentsList from '../MomentsList/MomentsList';

function MomentsPage({ momentsList, setMomentsList }) {  // this accepts the momentslist prop
    const user = useSelector((store) => store.user);
    const [newMoment, setNewMoment] = useState({
        name: '',
        notes: '',
        date: '',
        photo_url: ''
    });

    const history = useHistory();

    const addMoment = () => {
        setMomentsList([...momentsList, { ...newMoment, id: Date.now() }]);
        setNewMoment({ name: '', notes: '', date: '', photo_url: '' });
        history.push('/moments');
    };

    const deleteMoment = (id) => {
        const updatedMoments = momentsList.filter(moment => moment.id !== id);
        setMomentsList(updatedMoments);
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

            <MomentsList moments={momentsList} onDelete={deleteMoment} />
            
            <div className="clearfix"></div>
        </div>
    );
}

export default MomentsPage;

