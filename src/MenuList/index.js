import React,{ Component } from 'react';
import ItemList from './ItemList'
import CartList from '../CartList';
class MenuList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            isLoaded:false,
            error:null,
            cart:[],
        }
    }

    addToState(itemId,method){
        const itemsInCart = this.state.cart && this.state.cart.length>0 ? this.state.cart.filter((item)=>item.id===itemId):[];
        if (method==='addToCart') {
            let itemToAddInCart;
            if(itemsInCart && itemsInCart.length <=0) {
                itemToAddInCart = this.state.data.filter((item) => item.id===itemId)[0];
                itemToAddInCart.count = 1;
                this.setState(state=>{
                    // console.log("state")
                    const cart=state.cart.concat(itemToAddInCart);
                    return {
                        cart,
                    }
                })
            } else {
                // console.log("inc");
                itemsInCart[0].count++;
                const cnt = itemsInCart[0].count+1;
                this.setState({items: this.state.cart.map((cart,idx)=> idx!==itemsInCart[0].id ? cart :{...cart,count:cnt}) })
            }
        } else if(method==='increaseQuantity') {
            let itemToAddInCart;
            if(itemsInCart && itemsInCart.length <=0) {
                itemToAddInCart = this.state.data.filter((item) => item.id===itemId)[0];
                itemToAddInCart.count = 1;
                this.setState(state=>{
                    // console.log("state inc")
                    const cart=state.cart.concat(itemToAddInCart);
                    return {
                        cart,
                    }
                })
            } else {
                // console.log("increase function");
                // itemsInCart[0].count++;
                const cnt = itemsInCart[0].count++;
                this.setState({items: this.state.cart.map((cart,idx)=> idx!==itemsInCart[0].id ? cart :{...cart,count:cnt}) })
            }
        } else if(method==='decreaseQuantity'){
            if(itemsInCart && itemsInCart.length >0) {
                // console.log("decrease function");
                let itemInCart=itemsInCart[0];
                let cnt = itemInCart.count;
                if(cnt===1){
                    let cart= this.state.cart.filter(function(ele){
                        return ele.id !== itemId;
                    });
                    this.setState({
                        cart
                    })
                } else if(cnt>0){
                    const count1=itemInCart.count--;
                    // console.log(count1+ " itemId "+ itemId);
                    console.log({items: this.state.cart.map((cart,idx)=> idx!==itemsInCart[0].id ? cart :{...cart,count:count1})});
                    this.setState({items: this.state.cart.map((cart,idx)=> idx!==itemsInCart[0].id ? cart :{...cart,count:count1})})
                }
            }
        }
    }
    componentDidMount(){
        fetch("https://raw.githubusercontent.com/Shiivani/product-db/master/products.json")
          .then(res => res.json())
          .then(
            (result) => {
                // console.log(result);
              this.setState({
                isLoaded: true,
                data:result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }
    onAddToCart(itemId) {
        this.addToState(itemId,'addToCart');
    }
    onIncreaseQuantity(itemId) {
        this.addToState(itemId,'increaseQuantity');
    }
    onDecreaseQuantity(itemId){
        this.addToState(itemId,'decreaseQuantity');
    }
    clearCart=()=>{
        console.log("clicked");
        this.setState({
            cart:[]
        })
    }
    render(){
        const {data, isLoaded, error,cart} =this.state;
        return(
            <div className="container">
                <div className="row">
                <div className="col-md-6" >
                {
                    error ?
                        <div>Error: {error.message}</div>
                    : !isLoaded ?
                        <div> Loading... </div>
                    : 
                    <ItemList data={data} 
                            onClick={(itemId)=>this.onAddToCart(itemId)} 
                            onAdd={(itemId)=>this.onIncreaseQuantity(itemId)} 
                            onSubstract={(itemId)=>this.onDecreaseQuantity(itemId)}
                    />
                }</div>

                <CartList cart={cart} clearCart={this.clearCart}/>
                </div>
            </div>
        );
    }
}

export default MenuList;