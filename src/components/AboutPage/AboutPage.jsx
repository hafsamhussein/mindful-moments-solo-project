import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <h2>About This App</h2>
      <h3>Technologies Used</h3>
      <ul>
        <li>JavaScript</li>
        <li>React</li>
        <li>Redux</li>
        <li>Saga</li>
        <li>Node.js</li>
        <li>Express</li>
        <li>PostgreSQL</li>
      </ul>
    </div>
  );
}

export default AboutPage;