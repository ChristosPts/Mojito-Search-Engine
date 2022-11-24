import React from 'react'

const Data = ({data}) => {
  return (
    <div className="col-md-12 py-3 my-3 px-5 resultsBox">
      <a href={`${data.formattedUrl}`} target="_blank" rel="noopener noreferrer"><h2>{data.title}<i className="fa fa-external-link ms-2"></i></h2></a> 
      <p>{data.snippet}</p>

      <a href={`//${data.displayLink}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-caret-up me-1"></i>{data.displayLink}</a> 
  </div>
  )
}

export default Data