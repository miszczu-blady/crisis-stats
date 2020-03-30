import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import { MainPageWithRouter } from './app/components/pages/main';

import './App.css';
import 'antd/dist/antd.css'


function App() {
  return (
  	<Router basename="/crisis-stats/">
    	<MainPageWithRouter />
    </Router>
  );
}

export default App;
