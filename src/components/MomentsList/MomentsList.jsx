import React from 'react';

function MomentsList({ moments, onDelete }) {
    return (
        <>
            {
                moments.length === 0 ? (
                    <div>No moments to display.</div>
                ) : (
                    moments.map(moment => (
                        <div className="responsive" key={moment.id}>
                            <div className="gallery">
                                <div className="desc">{moment.name}</div>
                                <div className="desc">{moment.notes}</div>
                                <div className="desc">{moment.date}</div>
                                <img src={moment.photo_url} alt={`Moment from ${moment.date}`} />
                                <br />
                                <div style={{ textAlign: 'center', padding: '5px' }}>
                                    <button style={{ cursor: 'pointer' }} onClick={() => onDelete(moment.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </>
    );
}

export default MomentsList;
