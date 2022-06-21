

import React, {useRef} from 'react';
import { useReactToPrint } from 'react-to-print';

import ComponentToPrint  from './ComponentToPrint';
import {css} from "@emotion/css";
const payment = css`
  padding-top: 30px;
  .payment_button {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    padding: 15px 0;
    border: none;
    font-weight: 900;
    border-radius: 15px;
    color: white;
    background: #77402F;
  }
`

const Example = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <div>

            <div className={payment}>
                <button onClick={handlePrint} className="payment_button">
                    Печать счетов
                </button>
            </div>
            <ComponentToPrint ref={componentRef} />
        </div>
    );
};
export default Example