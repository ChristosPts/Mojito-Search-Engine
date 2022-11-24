import {useNavigate, Routes, Route} from 'react-router-dom'
import Home from './components/home/Home';
import './index.css';
import Search from './components/home/Search';
import {SearchData} from './components/API/GoogleSearch'
import React, {useState, useEffect} from 'react'
import WeatherCast from './components/WeatherCastApp/WeatherCast';
import Kiwi from './components/KiwiApp/Kiwi';
import PDF from './components/PdfApp/PDF';
import List from './components/ListApp/List';

 
  //Switch = Routes

  function App() {
    const [searchTerm,setSearchTerm] = useState(() => {
      return JSON.parse(localStorage.getItem("todos")) || []
    });
    const [googleData, setGoogleData] =useState(() => {
      return JSON.parse(localStorage.getItem("todos2")) || []
    });
    const navigation = useNavigate();
 
   const setSearch = async (term) => {
     setSearchTerm(term);
     const data = await SearchData(term);
     setGoogleData(data)
     navigation("/Search");
   }  

   useEffect(() => {
     localStorage.setItem("todos", JSON.stringify(searchTerm));
  }, [searchTerm]);

  useEffect(() => {
     localStorage.setItem("todos2", JSON.stringify(googleData));
  }, [googleData]);

     return (
        <div className="App">
        <Routes>
          <Route exact path={"/"} element={<Home setSearch ={setSearch} />}/>
          {searchTerm === "" ? ( <Route exact path={"/"} />
          ) : <Route exact path={"/Search"} element={<Search setSearch={setSearch} searchTerm = {searchTerm} googleData={googleData}/>}/>
        }     
         <Route exact path={"/WeatherCast"} element={<WeatherCast/>}/>
         <Route exact path={"/kiwiMojito"} element={<Kiwi/>}/>
         <Route exact path={"/mintPdf"} element={<PDF/>}/>
         <Route exact path={"/mintList"} element={<List/>}/>

        </Routes>
       </div>
    );
  }

export default App;
