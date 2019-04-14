const INIT_STATE={searchResult:[],error:''};
export default (state=INIT_STATE,action)=>{
    switch(action.type)
    {
case "text_change":let searchResult=action.payload;
return {...state,searchResult}
default:return {...state}
    }

}