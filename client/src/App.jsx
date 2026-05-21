import { useState, useEffect } from 'react'
// import reactLogo from './assets/something.ext'
import { getSocket } from "./utils/socket";
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router';
import Playground from './pages/Playground';

function App() {
  

useEffect(()=>{
  const socket = getSocket();
  if(!socket.conncted) socket.connect();

  return ()=>{
    socket.disconnect();
  }
},[])

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/playground' element={<Playground/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
