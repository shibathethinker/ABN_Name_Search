import React from 'react';
import {connect} from 'react-redux';
import Card from '../Card/Card';

export class CardListContainer  extends React.Component{
constructor(props)
{
super(props);
this.getLatestCardList=this.getLatestCardList.bind(this);
}

getLatestCardList()
{
    let searchResult=[];
    let searchResultList =this.props.searchResult.searchResult; 
    let cardList=[];
  
try{
  searchResult=JSON.parse(searchResultList);
}
catch(e)
{}

for(let i=0;i<searchResult.length;i++)
{
    let obj=searchResult[i];
    let allProps={} 
    for(let prop in obj)
    {
    allProps[prop]=obj[prop];
    }
   
    let item=(<Card key={allProps['Abn']} allProps={allProps}></Card>);
    cardList.push(item);
    }
    return cardList;
}


render(){
let cardList=this.getLatestCardList(); 
    return (<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
    {cardList}</div>);
}

}

const mapStateToProps=(state)=>{return state}
export default connect(mapStateToProps,null)(CardListContainer)