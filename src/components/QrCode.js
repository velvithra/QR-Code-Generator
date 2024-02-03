import React from 'react';
import '../qrcode.css';
import { useState } from 'react';
const QrCode = () => {
  const [ig,setIg]=useState('');
  const [load,setLoad]=useState(false);
  const [qrData,setQrdata]=useState("");
  const [qrSize,setQrsize]= useState("150");

  async function generateQr(){
    setLoad(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?
      size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setIg(url);
    }catch(err){
      console.error('Error generate QR code');
    }finally{
      setLoad(false);
    }
  }

  function downloadQr(){
    fetch(ig)
    .then((response)=>response.blob())
    .then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link)
    })
    .catch((error)=>{
      console.error("Error downloading QR code",error);
    });
  }
  
  return (
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {load && <p>Please wait...</p>}
       {ig && <img src={ig} alt="" className='qr-code-img'/>}
        <div>
            <label htmlFor='Inputdata' className='datainput'>Enter site code</label>
            <input type="text" id="Inputdata" placeholder='Enter data for QR code' 
            onChange={(e)=>setQrdata(e.target.value)}/>
            
            <label htmlFor='Inputsize' className='datainput'>size of image QRcode</label>
            <input type="text" value={qrSize} id="Inputsize"  
            onChange={(e)=>setQrsize(e.target.value)}/>

            <button className="generate-code" onClick={generateQr}  disabled={load}>To Generate QRcode</button>
            <button className="download-code" onClick={downloadQr}>To Download QRcode</button>
        </div>
      <p className="footer">Designed by <i>Pavithra</i></p>
    </div>
  )
}

export default QrCode
