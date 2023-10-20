// import React from 'react';
import { useState } from "react";
import "./Display.css";
const Display = ({contract, account}) => {
  const getData = async() => {};
  return (
    <>
    <div className="image-list">Image Display</div>
    <input type="text" placeholder="Enter address" className="address"></input>
    <button className="center button" onClick={getData}> Get Data</button>
    </>
  );
}

export default Display;
