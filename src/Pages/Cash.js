import React, {useEffect, useState} from 'react';
import {css} from "@emotion/css";
import logo from "../Assets/images/Снимок экрана 2022-05-23 в 16.40.54.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faStop} from "@fortawesome/free-solid-svg-icons";
import {useSelector, useDispatch} from "react-redux";
import {
    ADD_CART, CASH_SESSION_START,
    GET_BASED, GET_CHECK,
    MIN_CART,
    REMOVE_CART
} from "../Redux/actions";
import Modal from 'react-modal';
import axios from "axios";
import Example from "./Check/Check";



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const cashBasket = css`
  width: 100%;
  height: 100vh;
  position: relative;
  padding-top: 15px;

  .person {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    & .person-block {
      display: flex;
      align-items: center;

      .person_img {
        position: relative;
        width: 55px;
        height: 50px;
        border-radius: 15px;
        border: 2px solid #77402F;
        overflow: hidden;

        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .person_desc {
        padding-left: 10px;

        & p {
          color: #C7C7C7;
          font-size: 12px;
          font-weight: 700;
          line-height: 5px;
        }

        & h1 {
          line-height: 5px;
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
  }

  .cash_basket {
    padding-top: 30px;

    & h1 {
      font-weight: 700;
      font-size: 26px;
    }

    .basket_block2 {
      overflow: scroll;
    }

    .basket_block {
      overflow: scroll;
      position: relative;
      width: 100%;
      height: 400px;

      &_cart {
        margin: 20px 0;
        display: flex;
        align-items: center;
        position: relative;
        justify-content: space-between;

        &_block {
          display: flex;

          &_img {
            width: 60px;
            height: 55px;
            position: relative;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #C7C7C7;
            margin: 0 5px;

            & img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          &_name {
            padding-left: 10px;

            & p {
              color: #a4a4a4;
              font-size: 14px;
              font-weight: 700;
              line-height: 5px;
            }

            & h3 {
              color: #a4a4a4;
              font-size: 16px;
              font-weight: 700;
              line-height: 5px;
              margin-left: 20px;
            }

            & h1 {
              font-size: 13px;
              font-weight: 600;
            }
          }
        }

      }
    }
  }

  .cartDelete {
    display: flex;
    position: relative;
    width: 100%;
    padding: 5px 0;
    justify-content: space-between;
    transition: .4s;

    .cartBtn {
      height: 35px;
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
      border-radius: 5px;
      border: 1px solid #77402F;
      color: #77402F;
      background: transparent;
      font-size: 24px;
      transition: .4s;

      &:hover {
        color: white;
        background: #77402F;
      }
    }

    .cartInput {
      height: 35px;
      width: 70%;
    }

    .cartBtnDel {
      height: 35px;
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: 2px solid transparent;
      padding: 5px 0;
      color: white;
      background: red;
      transition: .4s;

      &:hover {
        border: 1px solid #77402F;
      }
    }
  }
`
const person_svg = css`
  width: 30px;
  height: 30px;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;

  }
`
const span = css`
  font-weight: bold;
  color: black;
  font-size: 14px;
  margin: 0 3px;
`
const Discount = css`
  font-weight: bold;
  font-size: 14px;
  margin: 15px;
`
const cashTotal = css`
  .cash_total {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-top: 30px;

    & p {
      color: #333333;
      font-size: 15px;
      font-weight: 700;
      line-height: 5px;
    }
  }

  .cash_total2 {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-top: 20px;

    & p {
      color: #333333;
      font-size: 16px;
      font-weight: 700;
      line-height: 5px;
    }
  }

  .cash_tax {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;

    & p {
      color: #9b9b9b;
      font-size: 14px;
      font-weight: 700;
      line-height: 5px;
    }
  }
`
const spanX = css`
  font-size: 10px;
  position: absolute;
  margin-left: -8px;
  margin-top: -1px;
`
const ModalBlock = css`
  width: 500px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & input {
    width: 75%;
    padding: 7px 10px;
    margin: 20px 0;
    outline: none;
  }

  & h1 {
    display: flex;
    font-size: 22px;
    margin-bottom: 24px;
  }

  & form {
    width: 75%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn_close {
      border-radius: 5px;
      border: none;
      padding: 8px 24px;
      background: red;
      color: white;
      font-size: 18px;
    }

    .btn_click {
      border-radius: 5px;
      border: none;
      padding: 8px 24px;
      background: green;
      color: white;
      font-size: 18px;
    }
  }
`
const Play = css`
  color: green;
  background: transparent;
  border: none;
  font-size: 22px;
`
const Stop = css`
  color: #ff0000;
  background: transparent;
  border: none;
  font-size: 22px;
`
const totalClientBlock = css`
  width: 100%;
  height: auto;
  padding: 10px;
  border: 0.5px solid black;
  border-radius: 5px;
  margin-top: 20px;

  .TotalClient_block {
    & p {
      font-weight: 600;
    }

    & input {
      font-weight: 600;
      outline: none;
      border-radius: 5px;
      border: 1px solid;
      padding: 5px 10px;
      width: 60%;
    }

    & button {
      font-weight: 600;
      border: none;
      border-radius: 5px;
      margin: 5px;
      width: 35%;
      padding: 5px 10px;
      background: forestgreen;
      color: white;
    }
  }
  .TotalClient_account {
    font-size: 15px;
    font-weight: 600;
    margin-top: 20px;
  }
  .TotalClient_accounT {
    font-size: 16px;
    font-weight: 800;
    margin-top: 20px;
  }
`
const Alert = css`
  .success {
    color: white;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 5px;
    background: green;
    position: absolute;
    width: 400px;
    margin-top: -100px;
    z-index: 99;
    margin-left: -30%;
  }

  .finished {
    width: 400px;
    color: white;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 5px;
    background: red;
    position: absolute;
    margin-left: -30%;
    margin-top: -100px;
    z-index: 99;
  }

  .animation {
    animation: alert 2s ease alternate;
    @keyframes alert {
      0%, 100% {
        margin-top: -100px;
      }
      20% {
        margin-top: 20px;
      }
      80% {
        margin-top: 20px;
      }
    }
  }
`


const Cash = () => {
    const dispatch = useDispatch()
    const {cart, token, is_active, getInfo, check ,tokenRefresh} = useSelector(store => store)
    const checkData = check[1]

    //modal
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    css`.cartDelete {
      opacity: 1;
      height: auto;
    }`
////////
    //cash
    const [client, setClient] = useState('')
    const [cashValue, setCashValue] = useState(0)
    const Client = (e) => {
        setClient(e.target.value)
    }
    const totalPrice = cart.reduce((acc, el) => el.count * el.price + acc, 0)
    useEffect(() => {
        const cashSum = client - totalPrice
        return setCashValue(cashSum)
    })
    //post , get // start

    useEffect(() => {
        axios("https://s225912.hostiman.com/api/cash-session/info/", {
            headers: {
                "Authorization": `Bearer ${tokenRefresh}`
            }
        })
            .then(res => dispatch({type: CASH_SESSION_START, payload: res.data}))
            .catch(err => console.log(err.message))
    }, [tokenRefresh])
    //post
    const [state, setState] = useState({start: "", end: ""})
    const inputValue = (s) => {
        const inputData = {...state};
        inputData[s.target.id] = s.target.value
        setState(inputData)
    }

    const Pay = (e) => {
        e.preventDefault()
        axios.post("https://s225912.hostiman.com/api/operation/create/", {
                "products":
                    cart.map((el) => {
                            const totalSum = el.count * el.price
                            return {
                                "name": `${el.name}`,
                                "price": Math.floor(el.price),
                                "quantity": el.count,
                                "sum": `${totalSum}`,
                                "barcode": el.barcode,
                                "product": el.id
                            }
                        },
                    ),
                "sum_product": totalPrice,
                "money_received": client,
                "change": Math.floor(cashValue),
                "operation_type": "cash",
            },
            {
                headers: {
                    "Authorization": `Bearer ${tokenRefresh}`,
                    "Accept": 'application/json, text/plain',
                    "Content-Type": 'application/json'
                }
            })
            .then((res) => {
                dispatch({type: GET_CHECK, payload: res.data})
            })
            .catch(err => console.log(err))
    }
    const submitStart = (e) => {
        e.preventDefault()
        axios.post("https://s225912.hostiman.com/api/cash-session/start/", {
                money_start: state.start
            },
            {
                headers: {
                    "Authorization": `Bearer ${tokenRefresh}`
                }
            })
            .then((res) => {
                localStorage.setItem('is_active', JSON.stringify(res.data.is_active))
                closeModal()
                document.location.reload()
            })
            .catch(err => console.log(err))
    }

    function submitEnd(e) {
        e.preventDefault()
        axios.patch("https://s225912.hostiman.com/api/cash-session/finish/", {
                money_end: state.end
            },
            {
                headers: {
                    "Authorization": `Bearer ${tokenRefresh}`
                }
            })
            .then((res) => {
                localStorage.setItem('is_active', JSON.stringify(res.data.is_active))
                closeModal()
                document.location.reload()
            })
            .catch(err => console.log(err.message))
    }

    //////
    return (
        <div>
            <div className={Alert}>
                {is_active ? <p className={"success animation"}>
                    Вы успешно начали работу
                </p> : <p className={"finished animation"}>
                    Вы успешно завершили работу
                </p>}

            </div>
            <div className={cashBasket}>
                <div className="person">
                    <div className="person-block">
                        <div className="person_img">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="person_desc">
                            <p>Я Кассир</p>
                            <h1>{token.email}</h1>
                        </div>
                    </div>
                    {
                        !is_active ? <div className={person_svg}>
                                <button onClick={openModal} className={Play}><FontAwesomeIcon icon={faPlay}/></button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                >
                                    <div className={ModalBlock}>
                                        <h1>Вы хотите начать работy?</h1>
                                        <input value={state.start} id={'start'} onChange={(s) => inputValue(s)}
                                               type="number" placeholder={"Сумма на кассе"}/>
                                        <form>
                                            <button className={"btn_close"} onClick={closeModal}>Отмена</button>
                                            <button className={"btn_click"} onClick={submitStart}>Начать работать</button>
                                        </form>
                                    </div>
                                </Modal>
                            </div> :
                            <div className={person_svg}>
                                <button onClick={openModal} className={Stop}><FontAwesomeIcon icon={faStop}/></button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                >
                                    <div className={ModalBlock}>
                                        <h1>Вы хотите закончить работy?</h1>
                                        <input value={state.end} id={'end'} onChange={(s) => inputValue(s)}
                                               type="number"
                                               placeholder={"Сумма на кассе"}/>
                                        <div>
                                            <p>В кассе была сумма : {getInfo.map((e) =>
                                                <span>{e.money_start}</span>)} </p>
                                            <p>Объем продаж : {getInfo.map((e) =>
                                                <span>{e.money_collected}</span>)} </p>
                                        </div>
                                        <form>
                                            <button className={"btn_close"} onClick={closeModal}>Отмена</button>
                                            <button className={"btn_click"} onClick={submitEnd}>Закончить работу
                                            </button>
                                        </form>
                                    </div>
                                </Modal>
                            </div>
                    }
                </div>
                <div className="cash_basket">
                    <h1>Корзина</h1>
                    <div className={cart.length > 3 ? "basket_block" : "basket_block2"}>
                        {
                            cart.length === 0 ? (<p>Ваша корзина пуста...</p>) :
                                cart.map((item) => {
                                    return (
                                        <div id={item.id}>
                                            <div className="basket_block_cart">
                                                <div className={"basket_block_cart_block"}>
                                                    <div className="basket_block_cart_block_img">
                                                        <img src={item.image} alt=""/>
                                                    </div>
                                                    <div className="basket_block_cart_block_name">
                                                        <h1>{item.name}</h1>
                                                        {
                                                            item.discount_sum ? <div>
                                                                <div className={"priceWithoutDiscount"}>
                                                                    <p className={Discount}>
                                                                        Цена
                                                                        : <span>{item.price_without_discount}</span>
                                                                    </p>
                                                                    <p className={Discount}>
                                                                        Cкидка : <span>{item.discount_sum}</span>
                                                                    </p>
                                                                </div>
                                                            </div> : <></>
                                                        }
                                                        <p>x<span className={span}>{item.count}</span></p>
                                                    </div>
                                                </div>
                                                <div className="basket_block_cart_block_name">
                                                    <h3><span className={spanX}>C</span>{item.price}</h3>
                                                </div>
                                            </div>
                                            <div className={"cartDelete"}>
                                                <button className={"cartBtn"}
                                                        onClick={() => dispatch({type: MIN_CART, id: item.id})}>-
                                                </button>
                                                <input className={"cartInput"} placeholder={"Kоличество"}
                                                       id={"quantity"} onChange={s => dispatch({
                                                    type: GET_BASED,
                                                    payload: {id: item.id, count: s.target.value}
                                                })} type="number"/>
                                                <button className={"cartBtn"}
                                                        onClick={() => dispatch({type: ADD_CART, item})}>+
                                                </button>
                                                <button className={"cartBtnDel"}
                                                        onClick={() => dispatch({type: REMOVE_CART, item})}>Удалить
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                    <div className={cashTotal}>
                        <hr/>
                        <div className="cash_total2">
                            <p>Общая стоимость</p>
                            <p>
                                <span className={spanX}>C</span>
                                {totalPrice.toFixed(2)}
                            </p>
                        </div>
                        <div className={totalClientBlock}>
                            <div className={"TotalClient_block"}>
                                <p>Cумма клиента</p>
                                <input type="number" placeholder={"Сумма денег"} id={"client"} value={client}
                                       onChange={(e) => Client(e)}/>
                                <button onClick={Pay}>Oплатить</button>
                            </div>
                            {
                                !checkData ? <p className={"TotalClient_account"}>Cчет...</p> : <div>
                                    <hr/>
                                    <p className={"TotalClient_account"}>Деньги (касса) : {client} coм</p>
                                    <p className={"TotalClient_account"}>Общая стоимость (товар)
                                        : {totalPrice.toFixed(2)} coм</p>
                                    <hr/>
                                    <p className={"TotalClient_accounT"}>Сдача (Cчет) : {cashValue.toFixed(2)} coм</p>
                                </div>
                            }
                        </div>
                    </div>
                    <Example/>
                </div>
            </div>
        </div>
    );
};

export default Cash;

