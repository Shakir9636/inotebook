import React from 'react'

function Alert(props) {
  const capitalize = (word) => {
    if(word === "danger"){
      word = 'Error';
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}
  return (
    <div style={{marginTop:"56px",paddingBottom:"20px"}}>
        {props.alert && 
        <div className={`alert alert-${props.alert.type}`} role="alert">
           <strong>{capitalize(props.alert.type)}</strong> {props.alert.msg}
        </div> }
    </div>
  )
}

export default Alert
