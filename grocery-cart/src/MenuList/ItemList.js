import React from 'react';
import Item from '../Item';

function RenderMenuItem({data, onClick,onAdd,onSubstract}) {
    // console.log(data);
    return ( 
        <Item data={data} onClick={onClick} onAdd={onAdd} onSubstract={onSubstract}/>
        );
}
const ItemList = (props) => {
    const data = props.data.map((dataObj)=>{
        return (
            <div key={dataObj.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem data={dataObj} onClick={props.onClick} onAdd={props.onAdd} onSubstract={props.onSubstract} />
            </div>
        )
    });
    return(
        <div className="container">
            <div className="row">
                    {data}
            </div>
        </div>
    );
}
    

export default ItemList;
