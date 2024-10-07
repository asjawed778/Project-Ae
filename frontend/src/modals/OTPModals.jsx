import React from 'react'
import ReactDOM from 'react-dom';
import './OTPModals.css';

function OTPModals({ OTPModal, setOTPModal }) {

    if (OTPModal === false) return null;

    
    return ReactDOM.createPortal(
        <div className='otp-model-container'>
            <h1>Hello this is modal</h1>
        </div>
        ,
        document.getElementById('modal')
    );
}

export default OTPModals;