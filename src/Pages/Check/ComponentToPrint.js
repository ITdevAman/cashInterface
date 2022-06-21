import React from "react";
import {useSelector} from "react-redux";
import {css} from "@emotion/css";
const CheckBlock = css`
  margin-top: 50px;
  width: 100%;
  height: auto;
  padding:15px;
  border : 1px  solid black ;
    & h1{
      font-size: 16px;
      font-weight: 500;
    }
  .CheckBlock_address{
    & p {
      font-weight: 250;
      font-size: 15px;
      line-height: 15px;
    }
    .CheckBlock_address_p{
      line-height: 20px;
      font-size: 16px;
      font-weight: 300;
    }
  }
  .CheckBlock_address_time{
    display: flex;
    justify-content: space-between;
    font-weight: 250;
    font-size: 15px;
    line-height: 15px;
    .CheckBlock_address_time_p{
      font-weight: 400;
    }
  }
  .CheckBlock{
    & div{
      display: flex;
      justify-content: space-between;
      & h1{
        font-size: 15px;
        font-weight: 600;
      }
    }
  }

`
const CheckBlockCard = css`
    .CheckBlockCard_title{
      font-size: 18px ;
      line-height: 15px;
    }
  .CheckBlockCard{
    display: flex;
    justify-content: end;
    & p {
      line-height: 15px;
      font-weight: 250;
      font-size: 14px;
      & span {
        font-weight: 350;
        font-size: 17px;
        padding-left: 10px;
      }
    }
  }
`

const ComponentToPrint = React.forwardRef((props, ref) => {
     const {check} = useSelector(store => store)
    const checkData = check[1]
    return (
        <div ref={ref}>
            {
                !checkData ? <></> : <div id={checkData.id}  className={CheckBlock}>
                    <h1>Kaccовый чек</h1>
                    <div className={"CheckBlock_address"}>
                        <p className={"CheckBlock_address_p"}>ПРИХОД</p>
                        <p>Аптека " Фармамир, сеть аптек "</p>
                        <p>720073 , 5-й м-н, Октябрьский район, Бишкек</p>
                    </div>
                    <div className={"CheckBlock_address_time"}>
                        <p>{checkData.date_issue}</p>
                        <p className={"CheckBlock_address_time_p"}>Чек № {checkData.id}</p>
                    </div>
                    <hr noshade/>
                    <div>
                        {
                            checkData.products.map((item) => {
                                return (
                                    <div className={CheckBlockCard}>
                                        <p className={"CheckBlockCard_title"}>{item.name}</p>
                                        <div className={"CheckBlockCard"}>
                                            <p>
                                                {item.price} X {item.quantity} <span>= {Math.floor(item.sum)}</span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr/>
                    <div className={"CheckBlock"}>
                        <div>
                            <h1>ИТОГ</h1><h1>{checkData.sum_product}</h1>
                        </div>
                        <div>
                            <h1>ПОЛУЧЕНО НАЛИЧНЫМИ</h1><h1>{checkData.money_received}</h1>
                        </div>
                        <div>
                            <h1>СДАЧА</h1><h1>{checkData.change}</h1>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
});
export default ComponentToPrint