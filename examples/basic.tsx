import React from 'react';
//import { createRoot } from 'react-dom/client';
import { init } from '../lib';
const { Frame } = init();

const Hello = Frame("90vw", "90vh")
  .bg("yellow")
  .fg("black")
  .border(10, { color: "blue" })
  .text(48)
  .element();

export const App = () => {
  return (
    <Hello>
     9991
    </Hello>
  );
};


//const root = createRoot(document.getElementById('root'));
//root.render(<App />);
