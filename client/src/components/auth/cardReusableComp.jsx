import React from 'react'
import './login.css';

function CardReusableComp(props) {
    return (
        <div className='d-flex justify-content-center mt-5'>
            <div className='card-login'>
                <div className='p-4'>
                    <div className='text-center'>
                        <h2>{props.mainName} </h2>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default CardReusableComp
