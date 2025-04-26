import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import ReactGA from "react-ga4";

const root = createRoot(document.getElementById('root')!);

ReactGA.initialize('G-HGS3ECJ9EK');
ReactGA.send('pageview');


root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
