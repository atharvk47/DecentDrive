// import React from 'react';
import { useEffect } from "react";
import "./Modal.css";

const Modal = ({setModalOpen, contract}) => {
  const sharing = async() => {
    const address = document.querySelector(".address").value;
    await contract.allow(address)
    console.log("Shared!");
  }
  useEffect(() => {
    const accessList = async() => {                // Providing a dropdown menu for the list of shared access
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for(let i =0; i< options.length;i++){
        let opt = options[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    }
    contract && accessList();
  },[])
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input type="text" className="address" placeholder="Enter Address"></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button onClick={() => {setModalOpen(false)}} id="cancelBtn">Cancel</button>
            <button onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
