import React from "react";


const PageLoader=()=>{
    return (
        <>
       <div className="container">
  <div className="top">
    <div className="skeleton-container">
      <div className="skeleton skeleton-avatar"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
    </div>
  </div>
  <div className="content">
    <div>
      <div className="title">Loading..</div>
    </div>
    <div className="options"></div>
  </div>
</div>
</>
       
    
    )
}

export default PageLoader