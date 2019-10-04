import React,{ Component } from 'react';
import {Button,Modal,ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import RenderCartItem from '../CartList/renderCartItem';

class Checkout extends Component{
    constructor(props){
        super(props);
        this.state={
            modal:false,
            data:[],
        }
    }

    componentDidMount(){
        this.setState({
            data:this.props.data
        })
    }
    toggle=()=> {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    alertPayment=()=>{
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
        this.props.clearCart();
        alert("Order Placed Successfully");
    }
    render(){
        let totalPrice =0;
        const itemsInCart = this.props.data.map((dataObj)=>{
            const price = dataObj.price.replace('₹','');
            totalPrice=totalPrice+price;
            return (
            <div key={dataObj.id}>
                <RenderCartItem data={dataObj}/>
            </div>
            )
        })
        return(
            <React.Fragment>
            <Button color="danger" onClick={this.toggle}>Check out</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Items In Cart</ModalHeader>
            <ModalBody>
                {itemsInCart}
                {/* Lorem ipsum dolor sit amet, co toggle() nsectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>this.alertPayment()}>Proceed to Payment</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
            </React.Fragment>
        );
    }
}

export  default Checkout;