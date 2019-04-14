import React from 'react';
import SearchBox from '../SearchBox/SearchBox';

function SearchBoxWrapper(WrappedComponent,props){

    return  class WrappedSearchBox extends React.Component{

        constructor(props)
        {
            super(props);
            this.onTextChanged=this.onTextChanged.bind(this);
            this.checkIfValidInput=this.checkIfValidInput.bind(this);
            this.state={text:'',type:'',errorText:''};
            this.insertSpacesInText=this.insertSpacesInText.bind(this);
        }
        /**Pass a text and this function will return a true or false indicating whether its a valid ABN */
        checkValidABN(abn)
        {
            console.log('check abn'+abn);
            if(abn.length<11 || abn.length>11)
            return false;
            else{
                var allChars=abn.split('').map((e)=>{return parseInt(e)});
                let weightArr=[10,1,3,5,7,9,11,13,15,17,19];
                let calculatedWeight=0;
        
                for(let i=0;i<allChars.length;i++)
                {
                    let curr=allChars[i];
                    curr=i===0?curr-1:curr;
        
                    if(isNaN(curr) || curr<0) return false;  //Return false if any digit is not a number
                    else{
                     calculatedWeight+=(curr*weightArr[i]); //calculate the weight
                    }
                }
                console.log('abn check'+abn)
                 if(calculatedWeight%89===0) return true;
                 else return false;
            }
        }

        checkIfValidInput(e)
            {
let text=e.target.value.trim();
console.log('input received'+text);

let searchText=text.replace(/\s/g,'').trim();

let isValidABN=this.state.type==='abn' ?this.checkValidABN(searchText):false;      

            if(this.state.type==='abn' && !isValidABN)
            {
                this.setState({errorText:'invalid ABN'});this.props.isValidSearch(false);
            }
            else
            {
                if(this.state.type==='abn')
                e.target.value=this.insertSpacesInText(searchText).join('');

            this.setState({errorText:''});
            this.props.isValidSearch(true);          
            //Communicate the final search text to the caller
            this.props.setSearchText(searchText);
            }
         }

         /**this function formats the passed string to insert spaces to make it a readable ABN string */
         insertSpacesInText(searchText)
         {
             //First remove all spaces from the text 
            let searchTextVal=searchText.replace(/\s/g,'').trim();
            let contents=searchTextVal.split('');        
            if(searchTextVal.length==15)
            contents.pop();

            let dynText='';

            for(let i=0;i<contents.length;i++)
            {
            if(i===2 || i===5 || i===8)
             dynText+=' '+contents[i];      
             else
             dynText+=contents[i];
            }
            let retArr= dynText.split('');
            let charsToDelete=retArr.length>14?retArr.length-14:0;
            if(charsToDelete==0)return retArr;
            else{
                for(let i=charsToDelete;i>0;i--)
                retArr.pop();
   
                return retArr;
            }
            
         }

        onTextChanged(e)
        {  
           let searchText=e.target.value.trim();

           let searchTextVal=searchText.replace(/\s/g,'').trim();
           this.props.setSearchText(searchTextVal);

            if(searchText.length===0)
            {this.props.setParentState('Search');this.setState({errorText:''})}
            else if(searchText.length>=1)
            {
                if(isNaN(searchText.charAt(0))) 
                {this.props.setParentState('Search Name');this.setState({type:'text'})}
                else
                {this.props.setParentState('Search ABN');this.setState({type:'abn'});}
     

                     if(this.state.type==='abn' && searchText.length>=3){
                       // let contents=searchText.split('');                                        
                        let contents=this.insertSpacesInText(searchText);
                                     e.target.value=contents.join('');
                    }                
            }

        }

        render()
        {
            return (
            <WrappedComponent onTextChangedFunc={this.onTextChanged} checkIfValidInputFunc={this.checkIfValidInput}
             errorText={this.state.errorText} {...this.props}></WrappedComponent>
            );
        }
    }

}


export default SearchBoxWrapper(SearchBox);