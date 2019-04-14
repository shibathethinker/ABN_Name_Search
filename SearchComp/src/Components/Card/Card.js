import React from 'react';
import './Card.css';

export default class Card extends React.Component{

    constructor(props)
    {
        super(props);
        this.toggleView=this.toggleView.bind(this);
        this.state={visible:false}
        this.allProps={...this.props.allProps}
        this.displayContent='';
    }

    toggleView(e)
    {
      this.setState({visible:!this.state.visible})
    }

    render()
    {
      let name=this.allProps.Name===undefined?this.allProps.EntityName:this.allProps.Name;

      this.displayContent=[];
  for(let prop in this.allProps)
    {
      let val=this.allProps[prop];
    this.displayContent.push(<div><label>{prop} : </label>{val}</div>)
    }

            return (
             <div className="cardBox">
<h2 onClick={this.toggleView}>{name}</h2>

<div  className={!this.state.visible?"cardBoxSectionInvisible":""}>
{this.displayContent}
</div>
                </div>
                )

    }


}