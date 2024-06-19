import React from 'react';
import RestaurantForm from './RestaurantForm';
import RestaurantMap from './RestaurantMap';

const App = () => {
  return (
    <div>
      <h1>WitnessChain Restaurant App</h1>
      <RestaurantForm />
      <RestaurantMap />
    </div>
  );
};

export default App;