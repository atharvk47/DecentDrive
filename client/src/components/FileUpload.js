// import React from 'react';
import axios from "axios";
import {useState} from "react";
import "./FileUpload.css";

const FileUpload = ({account, provider, contract}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No Image Selected");
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(file){
      try{
        const formData=new FormData()
        formData("file", file);

        
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `Enter Your Key`,
            pinata_secret_api_key: `Enter Your Secret Key`,
            "Content-Type": "multipart/form-data",
          },
        });       

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        // const signer = contract.connect(provider.getSigner())
        await contract.add(account, ImgHash);
        alert("Image uploaded successfully");
        setFileName("No Image selected");
        setFile(null);
      }catch(e){
        alert("Unable to upload file to Pinata")
      }
    }
  };
  const retrieveFile =()=> {};
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile}/>
        <span className="textArea">Image: {fileName} </span>
        <button type="submit" className="upload">Upload File</button>
      </form>
    </div>
  );
}

export default FileUpload;
