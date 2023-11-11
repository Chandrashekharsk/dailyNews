// import logo from './logo.svg';
import './App.css';

import React,{useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

const App = ()=> {
  const pageSize = 6;
  // apiKey = process.env.REACT_APP_NEWS_API
  const apiKey = "bcd2042a91774d2d802e4b23c3625032";
  const [progress,setProgress] = useState(0);

    return (
      <div>
        <Router>

        <Navbar/>
        <LoadingBar color='#f11946' height={3} progress={progress}/>

        <Routes>


          <Route exact strict path="/home" element={<News setProgress = {setProgress} apiKey={apiKey} key="general" pageSize = {pageSize} country= "in" category= "general"/>} />

          <Route exact strict path="/entertainment" element={<News setProgress = {setProgress} apiKey={apiKey} key="entertainment" pageSize = {pageSize} country= "in" category= "entertainment"/>}/>

          <Route exact strict path="/business" element={<News setProgress = {setProgress} apiKey={apiKey} key="business" pageSize = {pageSize} country= "in" category= "business"/>} />

          <Route exact strict path="/technology" element={<News setProgress = {setProgress} apiKey={apiKey} key="technology" pageSize = {pageSize} country= "in" category= "technology"/>} />

          <Route exact strict path="/health" element={<News setProgress = {setProgress} apiKey={apiKey} key="health" pageSize = {pageSize} country= "in" category= "health"/>} />

          <Route exact strict path="/sports" element={<News setProgress = {setProgress} apiKey={apiKey} key="sports" pageSize = {pageSize} country= "in" category= "sports"/>} />

          <Route exact strict path="/science" element={<News setProgress = {setProgress} apiKey={apiKey} key="science" pageSize = {pageSize} country= "in" category= "science"/>} />


        </Routes>

        </Router>
      </div>
    )
}
export default App;