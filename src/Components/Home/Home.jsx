import React, { createContext, useEffect, useState } from 'react'
import Form from '../Form/Form'
import Countdown from './Countdown';
import './Home.css'
import db from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { CountContext } from './Countdown';
import { useContext } from 'react';
export const FormContext = createContext();

function Home() {
    const [show, setShow] = useState(false);
    const [dates, setDates] = useState([]);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    const dataRef = collection(db, "Dates")
  
    useEffect(()=>{
        const fetchDates = async() =>{
            const data = await getDocs(dataRef);
            const sortDates = data.docs.map((date)=>{
                return {...date.data(), id: date.id};
            });
            setDates(sortDates)
        }
        fetchDates();
    }, []);

    const toggleNew = () => {
        setShow(!show)
    };

    const date = dates && dates.map((each, index)=>{
        return(
                <Countdown 
                    title={each.Title}
                    date={each.Date}
                    time={each.Time}
                    key={index}
                    index={index}
                    id={each.id}
                 />
            )
    })
    const [d, setD] = useState(new Date());

    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    var day = d.getDay();
    var numDay = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var meridian = 'AM';
    var numtype = 'th';
    
    if (numDay.toString().endsWith(1)) {
        numtype = 'st'
    } else if (numDay.toString().endsWith(2)) {
        numtype = 'nd'
    } else if (numDay.toString().endsWith(3)) {
        numtype = 'rd'
    }

    if (hour > 12) {
        hour = hour - 12;
        meridian = 'PM'
    }

    setInterval(() => {
        setD(new Date());
    }, 1000);

    useEffect(()=>{
        hour = d.getHours();
        min = d.getMinutes();
        sec = d.getSeconds();
        day = d.getDay();
        numDay = d.getDate();
        month = d.getMonth();
        year = d.getFullYear()
    }, [d]);

    return (
        <FormContext.Provider value={[show, setShow, dates, setDates]}>
            <div className='Home'>
                {show && <Form />}
                <div className="timeandDate">
                    <div className="flex justify-center align-center text-white pt-5 home-time">
                        <p className="time text-bold">{`${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}${meridian} `}</p> <br />
                    </div>

                    <div className="flex justify-center text-white home-date">
                    <p className="date text-2xl"> {`${dayNames[day]}, ${numDay}${numtype} ${monthNames[month]} ${year}`}</p>
                    </div>
                </div>

                <div className="addbtn flex justify-end">
                 <button type='button' className='addCountdown text-center rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white' onClick={toggleNew}>+</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 mx-1 md:mx-5">
                  {date}
                </div>
            </div>
        </FormContext.Provider>
    )
}

export default Home
