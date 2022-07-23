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
                <div className='count-flex mx-2 grid grid-cols-2 text-6xl sm:grid-cols-4 text-white '>
                    <div className="box-shadow p-2 m-2 border-2">
                        <p className="text-black my-3">{Items.stuffs[0].dayDiff}</p>
                        <p className="w-type bg-red-600 text-3xl p-1"> {Items.stuffs[0].dayDiff > 1 ? "Days" : "Day"} </p>
                    </div>

                    <div className="border-2 m-2 p-2 ">
                        <p className="text-black my-3">{`${Items.stuffs[0].hourDiff < 10 ? `0${Items.stuffs[0].hourDiff}` : Items.stuffs[0].hourDiff}`} </p>
                        <p className="w-type bg-blue-600 text-3xl p-1"> {Items.stuffs[0].hourDiff > 1 ? "Hours" : "Hour"} </p>
                    </div>

                    <div className="border-2 m-2 p-2 ">
                        <p className="text-black my-3">{`${Items.stuffs[0].minDiff < 10 ? `0${Items.stuffs[0].minDiff}` : Items.stuffs[0].minDiff}`} </p>
                        <p className="w-type bg-blue-600 text-3xl p-1"> {Items.stuffs[0].minDiff > 1 ? "Mins" : "Min"} </p>
                    </div>

                    <div className="m-2 border-2 p-2 ">
                        <p className="text-black my-3">{`${Items.stuffs[0].secDiff < 10 ? `0${Items.stuffs[0].secDiff}` : Items.stuffs[0].secDiff}`} </p>
                        <p className="w-type bg-blue-600 text-3xl p-1"> {Items.stuffs[0].secDiff > 1 ? "Secs" : "Sec"} </p>
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
            <div className = "countdown mx-2 font-bold text-center">
                <h1 className='text-4xl drop-shadow count-heading py-3 text-shadow sm:text-6xl text-blue-600'>{location.state.Title}</h1>
                    {showTimer()}
            </div>
        </div>   
    )
}

export default Count;
