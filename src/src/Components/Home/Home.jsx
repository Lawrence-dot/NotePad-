import React, { createContext, useEffect, useState } from 'react'
import Form from '../Form/Form'
import Countdown from './Countdown';
import './Home.css'
import db from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
export const FormContext = createContext();

function Home() {
    const [show, setShow] = useState(false);
    const [dates, setDates] = useState([])
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
    });
    return (
        <FormContext.Provider value={[show, setShow, dates, setDates]}>
            <div className='Home'>
                {show && <Form />}
                <button type='button' className='addCountdown text-center rounded-full border-2 border-sky-500 hover:bg-sky-500 hover:text-white' onClick={toggleNew}>+</button>
                <div className="grid grid-cols-1 sm:grid-cols-2 mx-1 md:mx-5">
                  {date}
                </div>
            </div>
        </FormContext.Provider>
    )
}

export default Home
