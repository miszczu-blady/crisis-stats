import React, { FC } from 'react';
import { HashRouter } from "react-router-dom";

import { MainPageWithRouter } from './app/components/pages/main';

import './App.css';
import 'antd/dist/antd.css'

const App: FC = () => (
  <HashRouter>
    <MainPageWithRouter />
  </HashRouter>
)

export default App;
