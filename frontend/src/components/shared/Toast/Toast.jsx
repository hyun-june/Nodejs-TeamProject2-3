import { useState, useEffect } from 'react';
import { FaCircleCheck } from "react-icons/fa6";
import "./Toast.css";

let toasts = [], setToastsFn = null;

const toastStatus =  {
    normal : {
        color : 'black',
        icon : <></>
    },
    success : {
        color : '#16a34a',
        icon : <FaCircleCheck />
    },
    fail : {
        color : '#991b1b',
        icon : <FaCircleCheck />
    },
}


export const toast = (message, options) => {
    const duration = options?.duration || 2000
    const status = options?.status || 'success'
    console.log(status,duration)
    if (setToastsFn) {
        const newToast = {
            id: Date.now(),
            message, 
            duration,
            status}
        toasts = [...toasts, newToast];
        setToastsFn([...toasts]);

        setTimeout(() => {
            toasts = toasts.filter(({id}) => id !== newToast.id);
            setToastsFn([...toasts])
        }, duration);
    }
}

export const ToastContainer = () => {
    const [toastList, setToastList] = useState([
    ]);

    useEffect(() => {
        setToastsFn = setToastList;
        return () => {
            setToastsFn = null;
        };
    }, []);

    return (
        <div id='toast-container'>
            {toastList.map(({id, message, duration, status}) => 
                <div key={id} className='toast-item' style={{color : toastStatus[status]?.color }}>
                    {toastStatus[status]?.icon}
                    <div>{message}</div>
                    <div className='toast-bar'style={{
                        animationDuration : `${duration / 1000}s` ,
                        backgroundColor : toastStatus[status]?.color
                    }}/>
                </div>
            )}
        </div>
    );
};