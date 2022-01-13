import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import "./subtotal.css"
import CurrencyFormat from 'react-currency-format'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
function Subtotal() {

    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart)

    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    //Procedding to checkout
   const checkoutHandler = () => {
       navigate("/login?redirect=shipping");
   }

    return (
        // <div className="subtotal">
        //      hello
        // </div>

        <div className="subtotal">
            <CurrencyFormat
                renderText={(value)=>(
                    <>
                        <p>
                            Subtotal ({cartItems.length} items): <strong>{`Rs. ${value}`}</strong>
                        </p>
                        <small className="subtotal_gift">
                            <input type="checkbox" name="" id="" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price, 0
                )}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs"}/>
            <button onClick={checkoutHandler}>Proceed To Checkout</button>

        </div>
       
    )
}

export default Subtotal
