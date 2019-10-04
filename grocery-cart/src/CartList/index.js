import React,{Component} from 'react';
import './index.css';
import Checkout from '../Checkout';
import RenderCartItem from './renderCartItem';


class CartList extends Component{
    constructor(props){
        super(props);

        this.state={
            cart:[],
        }
    }
    componentWillMount(){
        this.setState({
            cart:this.props.cart
        })
    }
    componentWillReceiveProps(){
        this.setState({
            cart:this.props.cart
        })
    }
    render(){
        const data = this.props.cart.map((dataObj)=>{
            if(dataObj) {
            return (
                <div key={dataObj.id}>
                    <RenderCartItem data={dataObj} />
                </div>
            ) 
            } else {
                return (<div> </div>);
            }

        });
        return(
            this.props.cart.length>0 ?
            <div>
                    {data} 
                    <Checkout clearCart={this.props.clearCart} data={this.props.cart} />
            </div>
            :
            <div>
                <h4>Cart is Empty!</h4>
            </div>
        )
    }
}
export default CartList;