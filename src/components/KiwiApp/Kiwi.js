import './kiwi.css';
import kiwi from './imgs/kiwilogo.png'; //
import React, {useState} from 'react';
import { Link } from 'react-router-dom'


function Kiwi() {
  const[search,setSearch] = useState("");
  const[results,setResults] = useState([]);
  const[searchInfo ,setSearchInfo] = useState({});
 
  const handleSearch = async e => {
    e.preventDefault();
    if(search === '') return;

    let endpoint = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&prop=info&srlimit=50&srsearch=${search}&inprop=url&format=json`;         

    const response = await fetch(endpoint);    
     
    if(!response.ok){
      throw Error(response.statusText);
    }

    const json =  await response.json();
    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  }
 
  return (
    <div className="KiwiApp" id = "KiwiApp">

      <div className = "kiwiLink" > <Link to = {"/"}  className={"LinkStyle"}>Mojito</Link> </div>
      <div className="KiwiAppBody">         
          <div className="kiwiMain">
            <h1> <a href="/kiwiMojito"> <img src={kiwi}alt="kiwi"/> </a> </h1>
            <form className = "KiwisearchBox"  onSubmit={handleSearch}>
              <input 
                  type="search" 
                  placeholder = "Explore Wikipedia! Fetch up to 50 results" 
                  value = {search} 
                  onChange={e => setSearch(e.target.value)}
              />
              <button> <i className="fa fa-search"></i>   </button>
            </form>   
          </div>

          { searchInfo.totalhits === 0 && <p>No articles found</p>    }
          <div className="KiwiResults">
              {results.map((result,i)=>{
                  const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
                  return (
                    <div className="KiwiResult" key={i}>
                      <h3> <a href = {url} target = "_blank" rel="noopener noreferrer">{result.title}</a></h3>   
                      <p dangerouslySetInnerHTML={{ __html: result.snippet}}></p>
                    </div>
                  )
              })}
          </div>
        
        </div> 
          {searchInfo.totalhits > 5 &&    
            <button className="KiwiTop"><a href ="#"><i className="fa fa-chevron-circle-up"></i></a></button>
          }
    </div>
  );
}

export default Kiwi;
