import React from 'react';
import {useState} from 'react';
import {Viewer, Worker} from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import './PDF.css';
import { Link } from 'react-router-dom'


function PDF() {
  const newplugin = defaultLayoutPlugin()

  const[pdfFile, setPDFfile] = useState(null);
  const[viewPDF, setViewPDF] = useState(null);

  const fileType = ['application/pdf']

  const getPDF = (e) => {
    let selectedFile = e.target.files[0]
    if(selectedFile){
      if(selectedFile && fileType.includes(selectedFile.type)){
        let reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload = (e) => {
          setPDFfile(e.target.result)
        }
      } 
      else {
        setPDFfile('')
      }
    }
    else {
      console.log("select PDF")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(pdfFile !== null){
      setViewPDF(pdfFile)
    } else {
      setViewPDF(null)
    }
  }


  return (

    <div className="PDFApp">
          <div className="pdfLink" ><Link to = {"/"}  className={"PLinkStyle"}>Mojito</Link></div>
      <div className="PDFuploadBTN">
       <button type = "button" class = "PDFAppbtn">
        <i class = "fa fa-upload"></i> Upload PDF
        <input  onChange={getPDF} className="fileUpload" type="file"/>
      </button> 
      </div>
      <hr/>
      <div className="pdfContainer">
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js'>
            {pdfFile && <>
              <Viewer fileUrl={pdfFile} plugins={[newplugin]}/>
            </>}
            {!pdfFile && <>No PDF selected</>}
          </Worker>
      </div>
    </div>
     

    
  );
}

export default PDF;
