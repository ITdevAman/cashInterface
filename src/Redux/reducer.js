
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools } from "redux-devtools-extension";
import {
    ADD_CART, BOX,
    CASH_SESSION_START,
    GET_BASED, GET_BASED_PIECE, GET_CHECK, GET_CHECK_PRODUCT,
    GET_PERSON,
    MIN_CART,
    REMOVE_CART,
    REMOVE_PERSON,
} from "./actions";
import thunk from "redux-thunk";
const initialState = {
    cart:  [] ,
    isAuth : false,
    token : JSON.parse(localStorage.getItem('token')),
    tokenRefresh : JSON.parse(localStorage.getItem('tokenRefresh')),
    like : [],
    is_active :  JSON.parse(localStorage.getItem('is_active')),
    based : [],
    singleItem : [],
    quantity : 0,
    rates : {
        USD : 0.013 ,
        KGZ : 1.07 ,
        RUB : 1,
    },
    get : [],
    getInfo: [],
    check : [],
    check_product : []
}
// JSON.parse(localStorage.getItem("cart"))
// localStorage.setItem("cart" , JSON.stringify(cart))
const shopReducer = (state = initialState, action) => {
    switch  (action.type) {
        case ADD_CART :
            const findProduct = state.cart.find((el) => el.id === action.payload.id)
            if (findProduct) {
                findProduct.count++
                return {...state, cart : state.cart.map(el => el.id === findProduct.id ? findProduct : el)}
            } else {
                return {...state,cart : [...state.cart, {...action.payload, count: 1,countPiece : 0}]}
            }
        case REMOVE_CART :
            return {...state, cart: state.cart.filter((el) => el.id !== action.item.id)}
        case MIN_CART :
            const removeProduct = state.cart.find(el => el.id === action.id)
            removeProduct.count--
            if (removeProduct.count === -1) {
                removeProduct.count ++
                return {...state, cart: state.cart.map(el => el.id === removeProduct.id ? removeProduct : el)}
            }
            return {...state, cart: state.cart.map(el => el.id === removeProduct.id ? removeProduct : el)}
        case GET_BASED:
            const findProductQuantity = state.cart.find((el) => el.id === action.payload.id)
            if (findProductQuantity){
                findProductQuantity.count = action.payload.count
                return {...state, cart : state.cart.map(el => el.id === findProductQuantity.id ? findProductQuantity : el)}
            }
            return {...state, cart : state.cart.map(el => el.id === findProductQuantity.id ? findProductQuantity : el)}
        case GET_BASED_PIECE:
            const countPieceProductQuantity = state.cart.find((el) => el.id === action.payload.id)
            if (countPieceProductQuantity){
                countPieceProductQuantity.countPiece = action.payload.count
                return {...state, cart : state.cart.map(el => el.id === countPieceProductQuantity.id ? countPieceProductQuantity : el)}
            }
            return {...state, cart : state.cart.map(el => el.id === countPieceProductQuantity.id ? countPieceProductQuantity : el)}
        case GET_PERSON :
            return {
                ...state ,
                isAuth: true
            }
        case REMOVE_PERSON :
             localStorage.removeItem('token')
            return {
                ...state ,
                isAuth: false
            }
        case CASH_SESSION_START :
            return {
                ...state ,
                getInfo: [...state.getInfo , {...action.payload}]
            }
        case GET_CHECK :
            return {
                ...state , check: [state.check , {...action.payload}]
            }
        case GET_CHECK_PRODUCT :
            return {
                ...state , check_product: [state.check_product , {...action.payload}]
            }
        case BOX :
            return {
                ...state , cart: []
            }
        default:
            return state
    }
}
export const store = createStore(shopReducer, composeWithDevTools(applyMiddleware(thunk)))

