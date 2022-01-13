import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO
} from "../constants/cartConsts"

export const cartReducer = (state = {cartItems: [], shippingInfo: {}}, action)=> {
    switch(action.type){
      case ADD_TO_CART:
          const item = action.payload;

          const doesItemExist = state.cartItems.find((i)=>{
              return (i.product === item.product) ;
          });

          if(doesItemExist) {

            return {
                ...state,
                cartItems: state.cartItems.map((i)=> 
                    i.product === doesItemExist.product ? item: i 
                ),
            };

          } else {
              return {
                  ...state,
                  cartItems: [...state.cartItems, item],
              };
          }


        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i)=> i.product !== action.payload)
            }


        case SAVE_SHIPPING_INFO: 
            return {
                ...state,
                shippingInfo: action.payload
            }

        default:
            return state;
    }
}