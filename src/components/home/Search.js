 import React, {useEffect} from 'react'
 import {useNavigate} from 'react-router-dom'
 import Navbar from './Navbar'
 import GetData from './GetData';
 //useNavigate  = useHistory

 const Search = ({searchTerm,googleData,setSearch}) => {
    const navigate  = useNavigate();
    
    useEffect(() => {
        if(searchTerm === ''){
            navigate('/')
        }
     // eslint-disable-next-line 
    },[searchTerm])
    console.log(searchTerm);
    console.log(googleData);
    return (
      <>
      <Navbar searchTerm={searchTerm} setSearch = {setSearch} /> <hr/>
      <div className="container"> 
          <div className="row">
              <div className="col-md-12">
              <div>Top 10 searches for {searchTerm}</div>
                 <GetData googleData = {googleData} />
             </div>
          </div>
      </div>
      </>
   )
 }
 
 export default Search