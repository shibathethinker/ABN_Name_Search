import React from 'react';
import './CustomButton.css';


export default (props)=>{
    var label,backColor;
    if(props!==undefined)
    {
         label=props.buttonLabel;
         backColor=props.backColor!==undefined?props.backColor:'#F39C12';
    }
  
    //console.log('from function');
   // console.log(props);
return (    
<button className="customButton" onClick={props.onClickHandler} style={{backgroundColor:backColor,width:props.width}}>{label}</button>
)
}