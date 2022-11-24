import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import mojito from '../images/mojito.png';

 
const Navbar = ({searchTerm,setSearch}) => {

  const[input,setInput] = useState('');
  
  useEffect (() => {
    setInput(searchTerm);
  }, [searchTerm]);

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
     <div className="col-md-12 d-flex align-items-center justify-content-center flex-column py-4 " >

        
        <div className='AppsDiv  align-items-center'>
        
        <div className = "d-flex mx-2 my-2 justify-content-center">
        <Link to = {"/"}>
            <img src={mojito}
              alt = "logo"
              height="48px"
            />
        </Link>
        </div>
        <div className="col-md-8 d-flex mx-2 navDiv">
          <form onSubmit={handleSubmit}>
            <div className="input-group" id="navSearch">
              <input type="text" 
                id = "gmt"
                value={input} 
                onChange = {(event) => setInput(event.target.value)} 
                placeholder = "Explore the web..."
                className = "form-control shadow-none d-flex mx-auto justify-content-between border-end-0"
              />
              <div className="input-group-text bg-white border-start-0 clrBtn"> 
                  {input ? (<i onClick = {handleClick} className="fa fa-times" ></i>) : null}
              </div>
              <button className="input-group-text border-start-0 searchBtn" onClick = {handleSubmit}> 
                      <i className="fa fa-search"></i> </button>
            </div>
          </form>
        </div>

        </div>
    
    </div>
  )
}

export default Navbar