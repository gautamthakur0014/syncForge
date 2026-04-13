import { useState, useEffect } from 'react'
// import reactLogo from './assets/something.ext'
import { getSocket } from "./utils/socket";

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
      <p>Hello</p>
    </>
  );
}

export default App
