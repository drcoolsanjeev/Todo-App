import React, {Component} from 'react';

class Item extends Component{
    
    constructor(props){
        super(props);
        this.state={
            
        }
    }

    render() {
        const {data, onClick, onAdd, onSubstract}=this.props;
        return (
            <div>
                <img src ={data.imageUrl} alt={data.productName} />
                <span>{data.brandName}</span><span>&nbsp;&nbsp;&nbsp;</span>    
                <button onClick={()=>onAdd(data.id)}> + </button><span>&nbsp;&nbsp;&nbsp;</span>
                <button onClick={()=>onClick(data.id)}> AddToCart </button><span>&nbsp;&nbsp;&nbsp;</span>
                <button onClick={()=>onSubstract(data.id)}> - </button>
            </div>
        )
    }
}

export default Item;