import React, {useState, useEffect} from 'react';
import coffee from "../Assets/images/filter-img/img_1.png";
import {css} from "@emotion/css";
import axios from "axios"
import {useDispatch, useSelector} from "react-redux";
import {ADD_CART} from "../Redux/actions";
import Modal from "react-modal";
import Icon from "../Assets/Icon.png"
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const cashBlock = css`
  width: 100%;
  height: 100%;
  position: relative;
  background: #F9F9FB;
  padding: 20px 30px;

  .cashBlockSeach {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & h1 {
      color: #212129;
      font-weight: bold;
      font-size: 32px;
    }

    & input {
      width: 50%;
      background: white;
      padding: 10px 15px;
      border: none;
      outline: none;
      border-radius: 10px;
    }
  }

  .cashFilter {
    margin-top: 20px;
    width: 100%;
    padding: 15px 2px;
    height: 130px;
    display: flex;
    justify-content: space-between;

    &_cart {
      width: 110px;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px;
      border-radius: 15px;
      background: white;
      margin: 0 5px;
      border: 1px solid #C7C7C7;
      text-align: center;
      transition: .4s;

      &:hover {
        background: #F5EFEF;
        border: 1px solid #805E5A;
        box-shadow: 0 0 3px #805E5A;
      }

      &:hover h1 {
        color: #805E5A;
      }

      & img {
        margin: 10px 0;
        width: 50%;
        height: 40px;
        object-fit: contain;
      }

      & h1 {
        margin: 5px 10px;
        font-size: 12px;
        color: #897C81;
        font-weight: 600;
      }
    }
  }

  .cashFilter2 {
    position: relative;
    overflow: scroll;
    margin-top: 20px;
    width: 100%;
    padding: 15px 2px;
    height: 130px;
    display: flex;
    justify-content: space-between;

    &_cart {
      width: 110px;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px;
      border-radius: 15px;
      background: white;
      margin: 0 5px;
      border: 1px solid #C7C7C7;
      text-align: center;
      transition: .4s;

      &:hover {
        background: #F5EFEF;
        border: 1px solid #805E5A;
        box-shadow: 0 0 3px #805E5A;
      }

      &:hover h1 {
        color: #805E5A;
      }

      & img {
        margin: 10px 0;
        width: 50%;
        height: 40px;
        object-fit: contain;
      }

      & h1 {
        margin: 5px 10px;
        font-size: 12px;
        color: #897C81;
        font-weight: 600;
      }
    }
  }

  .cashMenu {
    position: relative;
    width: 100%;

    & input {
      width: 30%;
      background: white;
      padding: 10px 15px;
      border: 0.5px solid;
      outline: none;
      border-radius: 3px;
      margin-bottom: 10px;
    }

    & h1 {
      font-size: 22px;
      font-weight: 650;
      margin-top: 20px;
      color: #282828;
    }

    .cashMenu_block {
      width: 99%;
      padding: 20px 20px 25px 20px;
      background: white;
      border-radius: 15px;
      transition: .4s;
      margin: 16px auto;
      position: relative;

      .cashMenu_block_piece {
        &_btn {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 35px;
          height: 35px;
          border: none;
          color: #5699E8;
          background: red;
          font-size: 18px;
          right: 2%;
          border-radius: 10px;
          top: 3%;
          & img {
            width: 65%;
            height: 65%;
            object-fit: contain;
          }
        }

        &:hover .cashMenu_block_request {
          opacity: 1;
\        }
        .cashMenu_block_request {
          transition: .5s;
          position: absolute;
          width: 150px;
          top: 3%;
          z-index: 1;
          right: -36%;
          opacity: 0;
          background: red;
          border-radius: 10px;
          border: none;
          color: white;
          font-weight: 600;
          font-size: 18px;
          padding: 4px 10px;
        }
      }

      .priceWithout {
        display: flex;
        align-items: center;

        & h2 {
          font-size: 16px;
          font-weight: bold;
          line-height: 16px;
        }

        & p {
          font-weight: 500;
          line-height: 16px;
          color: #939393;

          & span {
            color: red;
          }
        }
      }

      &_img {
        width: 100%;
        height: 170px;
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        padding: 20px 3px;

        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &_title {
        margin-top: 1px;
        margin-bottom: 15px;
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 20px;
        color: #282F3A;
      }

      &_price {
        margin-top: -4%;
        margin-left: 18px;
        font-size: 16px;
        font-weight: bold;
        color: black;
      }

      .priceWithoutDiscount {
        .priceWithout {
          display: flex;
          align-items: center;

          & p {
            font-weight: 500;
            line-height: 14px;
            color: #939393;

            & span {
              color: red;
            }
          }
        }

        &_discount {
          font-size: 16px;
          font-weight: 500;
          color: #939393;
          line-height: 14px;

          & span {
            font-weight: 600;
            color: black;
          }
        }
      }

      .priceWithoutBlock {
        margin-top: 10%;
      }

      .mood {
        & h1 {
          font-size: 18px;
          font-weight: bold;
          margin-top: 30px;
        }

        &_block {
          display: flex;

          & div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            position: relative;
            overflow: hidden;
            border-radius: 50%;
            border: 1px solid rgba(119, 64, 47, 0.26);
            margin: 5px;
            background: #FCF3F3;
            transition: .3s;

            &:hover {
              border: 1px solid #77402F;
              box-shadow: 0 0 3px #77402F;
            }

            & img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            & p {
              margin-top: 45%;
              color: #77402F;
              font-size: 12px;
              font-weight: bold;

              & span {
                font-size: 8px;
              }
            }
          }
        }
      }

      &:hover .cashMenu_block_button_btn {
        height: auto;
        opacity: 1;
      }

      &:hover .cashMenu_block_button {
        transform: translateY(0);
      }

      &_button {
        position: relative;
        transition: .5s;
        margin-top: 5px;
        display: flex;
        justify-content: space-between;

        &_analog {
          padding: 13px 16px;
          transition: .5s;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 17px;
          border: none;
          font-weight: 900;
          border-radius: 15px;
          color: white;
          background: #5699E8;
          &:focus {
            color: rgba(255, 255, 255, 0.73);
            background: #9CC9FF;
          }
        }

        &_analogX {
          padding: 13px 16px;
          transition: .5s;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 17px;
          border: none;
          font-weight: 900;
          border-radius: 15px;
          color: rgba(255, 255, 255, 0.73);
          background: #9CC9FF;
        }

        &_btn {
          padding: 13px 16px;
          transition: .5s;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 17px;
          border: none;
          font-weight: 900;
          border-radius: 15px;
          color: white;
          background: #4ead14;
        }
      }
    }
  }
`
const spanX = css`
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid black;
`
const isntActive = css`
  font-weight: 400;
  font-size: 22px;
  color: #ff2727;
`
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
const ModalBlock = css`
  position: relative;
  z-index: 99;
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
const Discount = css`
  background: #F30D28;
  border-radius: 10px 0;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  padding: 7px 12px;
  color: white;
`
const AnaloguePage = css`
  animation: n .8s alternate;
  @keyframes n {
    0% {
      opacity: 0;
      transform: translateY(-200px);
    }
    100% {
      opacity: 1;
      transform:  translateY(0);
    }
  }
  .AnaloguePage{
    position: relative;
    width: 100%;
    padding-top: 5%;
    overflow: scroll;
    padding-right: 10px;
    .AnaloguePageBtn{
      background: transparent;
      border: none;
      width: 100%;
      position: relative;
    }
    .AnaloguePage_block {
      width: 100%;
      border: 0.5px solid #EAEAEA;
      padding: 20px 20px 25px 20px;
      background: white;
      transition: .4s;
      position: relative;
      .AnaloguePage_block_piece{
        .AnaloguePage_block_request{
          transition: .3s;
          transform: scaleY(0);
          position: absolute;
          z-index: 33;
          width: 90%;
          opacity: 0;
          background: #77402F;
          border-radius: 10px;
          border:none;
          color: white;
          font-weight: 600;
          font-size: 18px;
          padding: 10px;
        }
      }
      &_img {
        width: 100%;
        height: 150px;
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        & img {
          width: 100%;
          height: 100%;
          object-fit:contain;
        }
      }
      .AnaloguePage_block_title{
        margin-top: 1px;
        margin-bottom: 15px;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: #282F3A;
        text-align: start;
      }
      &_price {
        margin-top: -4%;
        margin-left: 18px;
        font-size: 14px;
        font-weight: 500;
        color: black;
      }
      .priceWithout{
        & p {
          color: #939393;
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
  }
  .AnaloguePage2{
    position: relative;
    width: 100%;
    height: 400px;
    padding-top: 5%;
    overflow: scroll;
    padding-right: 10px;
    .AnaloguePageBtn{
      background: transparent;
      border: none;
      width: 100%;
      position: relative;
    }
    .AnaloguePage_block {
      width: 100%;
      border: 0.5px solid #EAEAEA;
      padding: 20px 20px 25px 20px;
      background: white;
      transition: .4s;
      position: relative;
      .AnaloguePage_block_piece{
        .AnaloguePage_block_request{
          transition: .3s;
          transform: scaleY(0);
          position: absolute;
          z-index: 33;
          width: 90%;
          opacity: 0;
          background: #77402F;
          border-radius: 10px;
          border:none;
          color: white;
          font-weight: 600;
          font-size: 18px;
          padding: 10px;
        }
      }
      &_img {
        width: 100%;
        height: 150px;
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        & img {
          width: 100%;
          height: 100%;
          object-fit:contain;
        }
      }
      .AnaloguePage_block_title{
        margin-top: 1px;
        margin-bottom: 15px;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: #282F3A;
        text-align: start;
      }
      &_price {
        margin-top: -4%;
        margin-left: 18px;
        font-size: 14px;
        font-weight: 500;
        color: black;
      }
      .priceWithout{
        & p {
          color: #939393;
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
  }
`
const AnaloguePageBtnX = css`
    margin-top: 10px;
  margin-left: 90%;
  border: none;
  background: transparent;
  font-size: 24px;
  font-weight: 250;
`
const cashMenuBtnNextPrevious = css`
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
  margin-left: -15px;
    .cashMenuBtnNextPrevious_btn{
            opacity: .5;
        } 
    & button {
            border: none ;
            background: transparent;
            font-size: 18px ;
            display: flex;
            align-items: center;
      margin: 0 30px;
        & span {
                font-size: 15px;
                font-weight: 300;
                margin: 0 5px;
            }
        }
    `


const Home = () => {
    const {token, is_active , tokenRefresh} = useSelector(store => store)


    const [card, setCard] = useState([])
    const [filterCategory, setFilterCategory] = useState([])
    const [analogue , setAnalogue] = useState({analogue : [] , id : 0})
    const [category, setCategory] = useState([])
    const dispatch = useDispatch()
    const [search, setSearch] = useState([card, filterCategory])
    const [linkNext , setLinkNext] = useState(`https://s225912.hostiman.com/api/product/list/?page=1`)
    const [linkPrevious , setLinkPrevious] = useState(`https://s225912.hostiman.com/api/product/list/?page=1`)
    const TokenRefresh = `${token.token.refresh}`
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
    useEffect(() => {
        axios.get(`https://s225912.hostiman.com/api/product/list/?page=1`, {
            headers: {
                "Authorization": `Bearer ${tokenRefresh}`
            }
        })
            .then(({data}) => {
                setCard(data)
                setSearch(data.results)
            })
    }, [tokenRefresh])
    const Next = () => {
        axios.get(linkNext, {
            headers: {
                "Authorization": `Bearer ${tokenRefresh}`
            }
        })
            .then(({data}) => {
                setLinkNext(card.next)
                setCard(data)
                setSearch(data.results)
            })
    }
    const Previous =  () => {
        axios.get(linkPrevious, {
            headers: {
                "Authorization": `Bearer ${tokenRefresh}`
            }
        })
            .then(({data}) => {
                setCard(data)
                setSearch(data.results)
                setLinkPrevious(card.previous)
            })
    }
    useEffect(() => {
        axios.get(`https://s225912.hostiman.com/api/category/list/`, {
            headers: {
                "Authorization": `Bearer ${tokenRefresh}`
            }
        })
            .then(({data}) => {
                setCategory(data.results)
                setFilterCategory(data.results)
            })
    }, [tokenRefresh])
    useEffect(() => {
        axios.post("https://s225912.hostiman.com/api/token/refresh/", {
                "refresh": TokenRefresh
            },
            {
                headers: {
                    "Authorization": `Bearer ${TokenRefresh}`
                }
            })
            .then((res) => {
                localStorage.setItem('tokenRefresh', JSON.stringify(res.data.access))
            })
            .catch(err => console.log(err))
    }, [TokenRefresh])
    const [sendApplication , setSendApplication] = useState('')
    const SendAnApplication = (ID) => {
      axios.post("https://s225912.hostiman.com/api/product/inquiry/create/", {
          product:ID,
          quantity : sendApplication.length === 0 ? 1 : sendApplication,
      },{
          headers: {
              "Authorization": `Bearer ${tokenRefresh}`
          }
      })
          .then((res)=>{
              console.log(res.data)
          })
          .catch(err=>console.log(err))
    }
    const searchCard = (el) => {
        let value = el.target.value
        axios.get(`https://s225912.hostiman.com/api/product/search/?search=${value}`, {headers: {
                "Authorization": `Bearer ${tokenRefresh}`
            }
        })
            .then((res) => {
                setSearch(res.data.results)
                console.log(res.data.results)
            })
        return setSearch(card.results)
    }
    const BarCode = (el) => {
        let value = el.target.value.toLowerCase()
        if (is_active) {
            if (value.length > 12) {
                axios.get(`https://s225912.hostiman.com/api/product/search/?search=${value}`, {
                    headers: {
                        "Authorization": `Bearer ${tokenRefresh}`
                    }
                })
                    .then((res) => {
                        dispatch({type: ADD_CART, payload: res.data.results[0]})
                        el.target.value = "";
                        setSearch(res.data.results)
                    })
            }
        }
        return setSearch(card.results)
    }
    //

    const filter = ({id}) => {
        axios.get(`https://s225912.hostiman.com/api/category/${id}/search/product/` ,{
            headers: {
                "Authorization": `Bearer ${tokenRefresh}`
            }
        })
            .then((res)=>{
                setSearch(res.data.results)
                setFilterCategory(res.data.results)
            })
    }
    const Analogue = (ID) => {
        analogue.id > 0 ? setAnalogue([]) : axios.get(`https://s225912.hostiman.com/api/product/list/analogue/${ID}`, {
            headers: {
                "Authorization": `Bearer ${tokenRefresh}`
            }
        })
            .then((res) => {
                const btn = document.querySelector(".cashMenu_block_button_analog")
                btn.style.bgColor = "red"
                return setAnalogue({analogue : res.data.analogues , id: res.data.id})
            })
    }
    const AnalogX = () => {
        setAnalogue([])
    }
    const AnalogPage = () => {
        return (
            <div>
                <hr/>
                <button className={AnaloguePageBtnX} onClick={AnalogX}>x</button>
                <div className={AnaloguePage}>
                    <div className={analogue.analogue.length > 1 ? "AnaloguePage2" : "AnaloguePage"}>
                        {
                            analogue.analogue.map((item) => {
                                return (
                                    <div>
                                        <button className={"AnaloguePageBtn"} onClick={() => dispatch({
                                            type: ADD_CART,
                                            payload: item
                                        })} id={item.id}>
                                            <div className="AnaloguePage_block">
                                                {
                                                    item.discount >0 ? <p className={Discount}>Скидка -{item.discount}%</p> : <></>
                                                }
                                                <div className="row">
                                                    <div className="col-lg-5">
                                                        <div className="AnaloguePage_block_img">
                                                            <img src={item.image} alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-7">
                                                        <h1 className="AnaloguePage_block_title">
                                                            {item.name}
                                                        </h1>
                                                        <div className={"priceWithout"}>
                                                            <p>Остаток :</p> <h6 className="AnaloguePage_block_price">{item.number_packages < 0 ? 0 : item.number_packages} уп. {item.piece_quantity > 0 ? item.piece_quantity : <></>} шт</h6>
                                                        </div>
                                                        <div>
                                                            {
                                                                item.piece_in_package > 0 ? <div>
                                                                    <div className={"priceWithout"}>
                                                                        <p>Цена : </p> <h2 className="AnaloguePage_block_price">{item.price} <span className={spanX}>c</span></h2>
                                                                    </div>
                                                                    <div className={"priceWithout"}>
                                                                        <p>Цена шт : </p> <h2 className="AnaloguePage_block_price">{item.piece_price} <span className={spanX}>c</span></h2>
                                                                    </div>
                                                                </div> : <></>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    return (
        <section id={"Home"}>
            <div className={cashBlock}>
                <div className="cashBlockSeach">
                    <h1>Аптека</h1>
                    <input type="search" onChange={el => searchCard(el)} placeholder="Поиск продукта"/>
                </div>
                <div className={category.length > 5 ? "cashFilter2" : "cashFilter"}>
                    <button onClick={() => filter({id: 0})} className="cashFilter_cart">
                        <img src={coffee} alt=""/>
                        <h1>
                            All
                        </h1>
                    </button>
                    {
                        category.map((item) => {
                            return <button onClick={() => filter({id : item.id})}
                                           className="cashFilter_cart">
                                <img src={item.image} alt=""/>
                                <h1>
                                    {item.name}
                                </h1>
                            </button>
                        })
                    }
                </div>
                <div className="cashMenu">
                    <input type="search" onChange={el => BarCode(el)} placeholder="Код"/>
                    <div className="cashMenuBlock">
                        <div>
                            {
                                !is_active ? <h4 className={isntActive}>Вы еще не начали работу !</h4> :
                                    <div className={"row"}>{
                                        search.map((item) => {
                                            return (
                                                <div className="col-lg-6" id={item.id}>
                                                    <div className="cashMenu_block">
                                                        {
                                                            item.discount >0 ? <p className={Discount}>Скидка -{item.discount}%</p> : <></>
                                                        }
                                                        <div>
                                                            {item.number_packages < 1 ? <div className={"cashMenu_block_piece"}>
                                                                <button onClick={openModal} className="cashMenu_block_piece_btn">
                                                                    <img src={Icon} alt=""/>
                                                                </button>
                                                                {/*<button  className={"cashMenu_block_request"}>Запрос</button>*/}
                                                                <Modal
                                                                    isOpen={modalIsOpen}
                                                                    onAfterOpen={afterOpenModal}
                                                                    onRequestClose={closeModal}
                                                                    style={customStyles}
                                                                    contentLabel="Example Modal"ч
                                                                >
                                                                    <div className={ModalBlock}>
                                                                        <h1>Вы хотите отправитьзопрос ?</h1>
                                                                        <input  id={'start'} onChange={(e)=>setSendApplication(e.target.value)}
                                                                                type="number" placeholder={"Kоличество"}/>
                                                                        <form>
                                                                            <button className={"btn_close"} onClick={closeModal}>Отмена</button>
                                                                            <button className={"btn_click"} onClick={()=>SendAnApplication(item.id)}>Да</button>
                                                                        </form>
                                                                    </div>
                                                                </Modal>
                                                            </div> :  <></>}
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-5">
                                                                <div className="cashMenu_block_img">
                                                                    <img src={item.image} alt=""/>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-7">
                                                                <h1 className="cashMenu_block_title">
                                                                    {item.name}
                                                                </h1>
                                                                <div className={"priceWithout"}>
                                                                    <p>Остаток :</p> <h6 className="cashMenu_block_price">{item.number_packages} уп. {item.piece_quantity > 0 ? item.piece_quantity : <></>} шт</h6>
                                                                </div>
                                                                <div>
                                                                    {
                                                                        item.piece_in_package > 0 ? <div>
                                                                            <div className={"priceWithout"}>
                                                                                <p>Цена : </p> <h2 className="cashMenu_block_price">{item.price} <span className={spanX}>c</span></h2>
                                                                            </div>
                                                                            <div className={"priceWithout"}>
                                                                                <p>Цена шт : </p> <h2 className="cashMenu_block_price">{item.piece_price} <span className={spanX}>c</span></h2>
                                                                            </div>
                                                                        </div> : <></>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="cashMenu_block_button">
                                                            { item.analogues_count < 1 ? <button className={"cashMenu_block_button_analogX"}>Аналоги</button> :  <button className={"cashMenu_block_button_analog"} onClick={()=>Analogue(item.id)}>Аналоги</button>}
                                                            <button onClick={() => dispatch({
                                                                type: ADD_CART,
                                                                payload: item
                                                            })} className="cashMenu_block_button_btn">Добавить в корзину
                                                            </button>
                                                        </div>
                                                        {
                                                            item.id === analogue.id ? <div>
                                                                {analogue.analogue.length ? <AnalogPage/> : <></>}
                                                            </div> : <></>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }</div>
                            }
                        </div>
                    </div>
                </div>
                {is_active?<div className={cashMenuBtnNextPrevious}>
                    <button className={card.previous===null ? "cashMenuBtnNextPrevious_btn" : ""} onClick={()=> card.previous ===null ? "" : Previous()}><span><FontAwesomeIcon icon={faArrowLeft}/></span>Previous</button>
                    <button className={card.next===null ? "cashMenuBtnNextPrevious_btn" : ""} onClick={()=> card.next===null ? "" : Next()}>Next <span><FontAwesomeIcon icon={faArrowRight}/></span></button>
                </div>:<></>}

            </div>
        </section>
    );
};

export default Home;