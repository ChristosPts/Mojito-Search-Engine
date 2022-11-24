import React from 'react'
import Data from './Data'

const GetData = ({googleData}) => {
  return (
    <div className="col-md-12"> 
        {
           googleData?.items.map((data,id)=>(
            <Data data = {data} key={id}/>
          )) 
        }

    </div>
  )
}

export default GetData