import React from 'react';
import Preloader from './misc/Preloader';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="brand-logo">
        Welcome to BluJS!
      </h1>
      <br/>
      <h4>Coming soon:<br/><br/>
      <span style={{fontWeight: 300}}>JavaScript Challenges &amp; Playground</span></h4>
      <br/>
      <Preloader />
    </div>
  );
};

export default Landing;
