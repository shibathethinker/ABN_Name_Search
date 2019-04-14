import React from 'react';
import    './SearchBox.css';


/**
 * Customizable Searchbox 
 * Uses React's PureComponent for performance considerations
 * Following parameters can be passed for configuration but are optional -
 * @param width
 * @param placeholder
 * @param  Rule  
 */


 export default class SearchBox extends React.PureComponent{
constructor(props)
{
super(props);
this.state={labelClass:'lbl'}
this.labelClicked=this.labelClicked.bind(this);
}

labelClicked(e)
{
this.setState({labelClass:'lbl_moved'});
}

render()
{
return(
    <React.Fragment>
<div className="textBoxContainer"  style={{width:this.props.width}}>
<input id='inputText'  data-testid='inputText' className="customTextbox" required  onChange={this.props.onTextChangedFunc} onBlur={this.props.checkIfValidInputFunc}></input>
<label className={this.state.labelClass} name='placeholder_label' onClick={this.labelClicked}>{this.props.placeholder}</label>
<label id='inputError' data-testid='inputError' className="err">{this.props.errorText}</label>
</div>
</React.Fragment>
)
}
}


