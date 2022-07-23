import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css'

function Count() {
    const location = useLocation();
    const [diff, setDiff] = useState(new Date(location.state.Date).getTime() - new Date().getTime());
    
    const [Items, setItems] = useState({stuffs : [{
        dayDiff : Math.floor(diff / 1000 / 60 / 60 / 24),
        hourDiff : Math.floor(diff / 1000 / 60 / 60) % 24,
        minDiff : Math.floor(diff / 1000 / 60) % 60,
        secDiff : Math.floor(diff  / 1000) % 60
    }]})

     setInterval(()=>{
        setDiff( new Date(location.state.Date).getTime() - new Date().getTime());
     }, 1000);

     const showTimer = () => {
         if (diff > 0) {
            return(
                <div className='flex flex-wrap my-2 text-white count-flex shadow-md'>
                    <div className="w-1/2  bg-red-500 box-shadow-md p-2 border-2">
                        <p className="">{Items.stuffs[0].dayDiff}</p>
                        <p className="w-type"> {Items.stuffs[0].dayDiff > 1 ? "Days" : "Day"} </p>
                    </div>

                    <div className="w-1/2 bg-sky-500 border-2 p-2 ">
                        <p className="">{`${Items.stuffs[0].hourDiff}`} </p>
                        <p className="w-type"> {Items.stuffs[0].hourDiff > 1 ? "Hours" : "Hour"} </p>
                    </div>

                    <div className="w-1/2 bg-sky-500 border-2 p-2 ">
                        <p className="">{`${Items.stuffs[0].minDiff}`} </p>
                        <p className="w-type"> {Items.stuffs[0].minDiff > 1 ? "Mins" : "Min"} </p>
                    </div>

                    <div className="w-1/2 bg-sky-500 border-2 p-2 ">
                        <p className="">{`${Items.stuffs[0].secDiff}`} </p>
                        <p className="w-type"> {Items.stuffs[0].secDiff > 1 ? "Secs" : "Sec"} </p>
                    </div>
                </div>
             )
        }  else {
            return(
                <p className='timer-text text-red-500'>Expired!!!</p>
             )
        }
     }

     useEffect(()=>{
         setItems({stuffs : [{
            dayDiff : Math.floor(diff / 1000 / 60 / 60 / 24),
            hourDiff : Math.floor(diff / 1000 / 60 / 60) % 24,
            minDiff : Math.floor(diff / 1000 / 60) % 60,
            secDiff : Math.floor(diff  / 1000) % 60
        }]})
    }, [diff]);

    return (
        <div className = "c-body">
            <div className = "countdown font-bold text-sky-500 text-center">
                <h1>{location.state.Title}</h1>
                    {showTimer()}
            </div>
        </div>   
    )
}

export default Count;
