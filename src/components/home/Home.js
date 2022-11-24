import React, {useState}from 'react'
import kiwi from '../images/kiwi.png';
import list from '../images/list.png';
import pdf from '../images/pdf.png';
import weather from '../images/weather.png';
import mojito from '../images/mojito.png';

    
 const Home = ({setSearch}) => {
  const[input,setInput] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(/^[a-zA-Z0-9].*/.test(input) || /^[a-zA-Z0-9]+" "*/.test(input)){
        setSearch(input)
    }
  }

  const handleClick = () => {
    setInput('');
  };

  return (
    <div className="container">
        <div className="row mt-5">
        
            <div className="col-md-12 d-flex flex-column align-items-center justify-content-center" id="homeCont">
            <img src={mojito} 
                     alt="icon"
                     className="mx-auto mt-5"
                     height="144px"
                /> 
               
                <div className="formDiv col-md-7 my-4 ">
                  <form className="px-auto" onSubmit={handleSubmit}>   
                    <div className="input-group" id="searchForm">
                      <input type="text" 
                            id = "gmt"
                            value = {input} 
                            onChange = {(event) => setInput(event.target.value)} 
                            className = "form-control d-flex mx-auto justify-content-between border-end-0 shadow-none" 
                            placeholder = "Explore the web..."
                        />
                        <div className="input-group-text bg-white border-start-0 clrBtn">
                                {input ? (<i onClick = {handleClick} className="fa fa-times" ></i>) :  ""}
                        </div>
                        <button className="input-group-text searchBtn"  onClick = {handleSubmit}> <i className="fa fa-search"></i> </button>
                    </div>
                  </form> 
                </div>
                <div className = "AppsDiv">
                  <div className = "d-flex align-items-center pt-3 mx-auto ">
                      <a href="/kiwiMojito"> 
                        <img className="imgs shadow rounded mx-3" src={kiwi}
                            alt="kiwi" title="Kiwi Mojito"/> 
                      </a> 
                      <a href="/WeatherCast"> 
                        <img className="imgs shadow rounded mx-3" src={weather}
                            alt="WeatherCast" title="WeatherCast"/> 
                      </a>
                      </div>
                      <div className = "d-flex align-items-center pt-3 mx-auto ">
                      <a href="/mintList"> 
                        <img className="imgs shadow rounded mx-3" src={list}
                            alt="Mint List" title="Mint List"/> 
                      </a>
                      <a href="/mintPdf"> 
                        <img className="imgs shadow rounded mx-3" src={pdf} 
                            alt="PDF reader" title="PDF reader"/> 
                      </a>
                  </div>
                </div>
            </div>
        
        </div>
    </div>
  )
}
 
 export default Home