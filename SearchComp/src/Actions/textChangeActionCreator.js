import fetch from 'cross-fetch';

export default function textChangeActionCreator(data){
    console.log('in action createor'+data)
   
   return  async  function(dispatch){
        console.log('fetching....')
         return   await fetch(data).then(data=>data.json()).then((data)=>{ 
             //console.log(data);
             dispatch({type:'text_change',payload:data}) 
            }).catch((err)=>{
                dispatch({type:'text_change',payload:'Network error'})})
        }
}


