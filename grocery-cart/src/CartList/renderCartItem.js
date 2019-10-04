import React from 'react';


function RenderCartItem(props) {
    // console.log("data");
    // console.log(props);
    const price = props.data.price.replace('₹','');
    const totalPrice = props.data.count*price;
    return ( 
        <div className="container" id="box-item">
            <div className="row">
                <div className="col-md-3"><h6>{props.data.productName}</h6></div>
                <div className="col-md-3"><p>{props.data.count}</p></div>
                <div className="col-md-3"><p>{price}</p></div>
                <div className="col-md-3"><p>{totalPrice}</p></div>
            </div>
            
        </div>
        );
}

export default RenderCartItem;