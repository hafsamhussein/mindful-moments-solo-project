import React, { useState, useEffect } from 'react';
import './MomentsPage.css'
import { useSelector } from 'react-redux';

function MomentsPage() {
    const user = useSelector((store) => store.user); 
    const [momentList, setMomentList] = useState([]);

    useEffect(() => {
        fetchMoments();
    }, []);

    const fetchMoments = () => {
        fetch('/api/moments')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Network response was not OK");
                }
            })
            .then(momentList => {
                setMomentList(momentList);
            })
            .catch((error) => {
                console.log(error);
                alert('Something went wrong.');
            });
    }

    const deleteMoment = (id) => {
        fetch(`/api/moments/${id}`, { method: 'DELETE' })
            .then((response) => {
                if (response.ok) {
                    fetchMoments();
                } else {
                    throw new Error("Network response was not OK");
                }
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong.');
            });
    }

    return (
        <div className="container">
            <h2>My Moments</h2>
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
                                <img src={moment.photo_url} alt={`Moment from ${moment.date}`} />
                                <br />
                                <div className="desc">{moment.name}</div>
                                <div className="desc">{moment.notes}</div>
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
