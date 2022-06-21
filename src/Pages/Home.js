import React, {useState, useEffect} from 'react';
import coffee from "../Assets/images/filter-img/img_1.png";
import {css} from "@emotion/css";
import axios from "axios"
import {useDispatch, useSelector} from "react-redux";
import {ADD_CART} from "../Redux/actions";


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
    height: 130vh;
    position: relative;
    width: 100%;
    & input {
      width: 30%;
      background: white;
      padding: 10px 15px;
      border: 0.5px solid ;
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
      width: 95%;
      padding: 10px 10px 20px 10px ;
      background: white;
      border-radius: 15px;
      transition: .4s;
      margin: 20px auto;
      &_img {
        width: 100%;
        height: 150px;
        position: relative;
        overflow: hidden;
        border-radius: 15px;

        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &_title {
        margin-top: 10px;
        font-size: 18px;
        font-weight: 650;
      }
      &_price {
        margin-left: 18px;
        font-size: 16px;
        font-weight: bold;
      }
      .priceWithoutDiscount{
        &_price{
          font-size: 14px;
          line-height:10px;
          & span {
            font-weight: 600;
          }
        }
        &_discount{
          font-size: 14px;
          line-height:10px;
          & span {
            font-weight: 600;
          }
        }
      }
      .priceWithout{
        padding-top: 10%;
        display: flex;
        & p {
          font-weight: 700;
        }
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
        transform: rotateX(85deg);
        transition: .5s;
        margin-top: 5px;
        &_btn {
          position: absolute;
          padding: 13px 0;
          transition: .5s;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 17px;
          border: none;
          font-weight: 900;
          border-radius: 15px;
          color: white;
          background: #77402F;
          opacity: 0;
        }
      }
    }
  }
`
const spanX = css`
  font-size: 10px;
  position: absolute;
  margin-left: -8px;
  margin-top: 2px;
`
const isntActive = css`
  font-weight: 400;
  font-size: 22px;
  color: #ff2727;
`

const Home = () => {
    const [card, setCard] = useState([])
    const [filterCategory, setFilterCategory] = useState([])
    const [search, setSearch] = useState([card,filterCategory])


    const [category, setCategory] = useState([])
    const dispatch = useDispatch()
    const {token , is_active ,tokenRefresh} = useSelector(store => store)
    const TokenRefresh = `${token.token.refresh}`

    useEffect(() => {
        axios.get(`https://s225912.hostiman.com/api/product/list/` , {headers: {
            "Authorization" : `Bearer ${tokenRefresh}`
            }})
            .then(({data}) => {
                setCard(data)
                setSearch(data)
            })
    }, [tokenRefresh])
    useEffect(() => {
        axios.get(`https://s225912.hostiman.com/api/category/list/` , {headers: {
            "Authorization" : `Bearer ${tokenRefresh}`
            }})
            .then(({data}) => {
                setCategory(data)
                setFilterCategory(data)
            })
    }, [tokenRefresh])
    useEffect(()=>{
        axios.post("https://s225912.hostiman.com/api/token/refresh/", {
                "refresh" : TokenRefresh
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
    const searchCard = (el) => {
        let value = el.target.value.toLowerCase()
        axios.get(`https://s225912.hostiman.com/api/product/search/?search=${value}` , {headers: {
                "Authorization" : `Bearer ${tokenRefresh}`
            }})
            .then((res) => {
                setSearch(res.data)
            })
        return setSearch(card)
    }
    const BarCode = (el) => {
        let value = el.target.value.toLowerCase()
        if (is_active){
            if (value.length === 13 ){
                axios.get(`https://s225912.hostiman.com/api/product/search/?search=${value}` , {headers: {
                        "Authorization" : `Bearer ${tokenRefresh}`
                    }})
                    .then((res) => {
                        dispatch({ type : ADD_CART , payload : res.data[0]})
                        el.target.value = ""
                    })
            }
        }
        return setSearch(card)
    }
//400003182391  400072312312

    const filter = ({name}) => {
        let valueFilter = name.toLowerCase()
        let result = []
        result = card.filter((el) => {
           return el.category.toLowerCase().search(valueFilter) !== -1 ;
        })
        setSearch(result)
    }
        return (
        <section id={"Home"}>
            <div className={cashBlock}>
                <div className="cashBlockSeach">
                    <h1>Аптека</h1>
                    <input type="search" onChange={el => searchCard(el)} placeholder="Поиск продукта"/>
                </div>
                <div className={category.length > 5 ? "cashFilter2" : "cashFilter"}>
                    <button onClick={()=>filter({name: ""})} className="cashFilter_cart">
                        <img src={coffee} alt=""/>
                        <h1>
                            All
                        </h1>
                    </button>
                    {
                        category.map((item)=>{
                            return <button id={item.id} onClick={()=>filter({name: item.name})} className="cashFilter_cart">
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
                                !is_active  ? <h4 className={isntActive}>Вы еще не начали работу !</h4> : <div className={"row"}>{
                                    search.map((item) => {
                                        console.log(item)
                                        return(
                                            <div className="col-lg-6" id={item.id}>
                                                <div className="cashMenu_block">
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
                                                            {
                                                                item.discount_sum ? <div>
                                                                    <div className={"priceWithoutDiscount"}>
                                                                        <p className="priceWithoutDiscount_price">
                                                                            Цена : <span>{item.price_without_discount}</span>
                                                                        </p>
                                                                        <p className="priceWithoutDiscount_discount">
                                                                            Cкидка : <span>{item.discount_sum}</span>
                                                                        </p>
                                                                    </div>
                                                                    <div className={"priceWithout"} >
                                                                        <p>Cтоимость :</p> <p className="cashMenu_block_price"><span className={spanX}>с</span>{item.price}</p>
                                                                    </div>
                                                                </div>: <div className={"priceWithout"} >
                                                                    <p>Cтоимость :</p> <p className="cashMenu_block_price"><span className={spanX}>с</span>{item.price}</p>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="cashMenu_block_button">
                                                        <button onClick={()=> dispatch({ type : ADD_CART , payload : item })} className="cashMenu_block_button_btn">Добавить в биллинг</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }</div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;