import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import Main from './Main';
import Navbar from './Navbar';
import SideBar from "../components/Sidebar";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div id='App' className='d-flex flex-column app'>
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <Navbar />
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
