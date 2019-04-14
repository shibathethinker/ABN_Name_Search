/**This is the main component which holds search box and the result */

import React from 'react';
import './Grid.css';
import CustomButton from '../CustomButton/CustomButton';
import SearchBoxWrapper from '../HigherOrderComps/SearchBoxWrapper';
 import {connect} from 'react-redux';
 import textChangeActionCreator from '../../Actions/textChangeActionCreator';
import CardListContainer  from '../CardListContainer/CardListContainer';

 class Grid extends React.PureComponent{

constructor(props)
{
    super(props);
    this.state={dynamicButtonText:'',seachText:'',dataLoading:false,maxRecordLabel:'',validSearchCriteria:false,notifClass:'notif'}
    this.updateDynamicText=this.updateDynamicText.bind(this);      
    this.onTextChanged=this.onTextChanged.bind(this);
    this.updateSearchText=this.updateSearchText.bind(this);
    this.updateValidSearchCriteria=this.updateValidSearchCriteria.bind(this);
    
    this.cardContainer='';
}
/**
 * Used by the searchbox to communicate to the parent whether the current state is valid for search
 * Parent will allow the search by the 'CustomButton' only if this is a valid search criteria as signalled by the search wrapper
 * @param {} val 
 */
updateValidSearchCriteria(val)
{
    this.setState({validSearchCriteria:val})
}
/**Used by the search box component to communicate about the search text to the parent
 * Based on this the parent knows whether the user is trying to search a name or a ABN
 * The parent will accordingly instruct the CustomButton to change its text
 */
updateDynamicText(text)
{
this.setState({dynamicButtonText:text});
}
/**
 * Used by the searchBox to communicate the search text to the parent
 * Parent will use this search text to pass on to the action creator only if the text is valid for search (not empty)
 * @param {*} text 
 */
updateSearchText(text)
{
this.setState({seachText:text})
}
onTextChanged()
{
    console.log('search text'+this.state.seachText);
    if(this.state.seachText!=='' && this.state.validSearchCriteria){
    this.setState({dataLoading:true})
  
      let searchURL=process.env.REACT_APP_PROXY_URL;
      console.log('search URL'+ searchURL)
    if(this.state.dynamicButtonText.toLocaleLowerCase().indexOf('abn')>=0)
    searchURL+='ABN?abn='+this.state.seachText;
    else
     searchURL+='Names?name='+this.state.seachText;

    this.props.textChangeActionCreator(searchURL);
}

}

componentWillReceiveProps(nextProps)
{
    this.setState({dataLoading:false})

    if(nextProps.searchResult.searchResult.indexOf('error')>=0)
    {this.setState({maxRecordLabel:'Network error'});this.setState({notifClass:'notif_alert'})}

    else if(nextProps.searchResult.searchResult!==this.props.searchResult.searchResult)
    {
        this.setState({notifClass:'notif'})
        let resultArr=JSON.parse(nextProps.searchResult.searchResult);

        if(resultArr.length===10)
        this.setState({maxRecordLabel:'Showing a maximum of 10 records'})
        else if(resultArr.length===0)
        this.setState({maxRecordLabel:'No record to show'})
        else
        this.setState({maxRecordLabel:''})
    }   

}

    render(){
        this.cardContainer=this.state.dataLoading?'Loading.....':<React.Fragment><label className={this.state.notifClass}>{this.state.maxRecordLabel}</label>
        <CardListContainer></CardListContainer>
        </React.Fragment>
        
return(
<React.Fragment>
<div className="grid">
    <SearchBoxWrapper placeholder={"enter name or ABN..."}    setParentState={this.updateDynamicText} setSearchText={this.updateSearchText} isValidSearch={this.updateValidSearchCriteria}></SearchBoxWrapper>
    <CustomButton   onClickHandler={this.onTextChanged} buttonLabel={this.state.dynamicButtonText===''?'Search':this.state.dynamicButtonText} ></CustomButton>
</div>
{this.cardContainer}
</React.Fragment>
);
    }
}

const mapStateToProps=(state)=>{return state;}
export default connect(mapStateToProps,{textChangeActionCreator})(Grid);