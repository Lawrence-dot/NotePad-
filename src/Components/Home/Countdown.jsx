import React,{ useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FormContext } from './Home';
import db from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Home.css'
import { createContext } from 'react';

function Countdown(props) {
    const [show, setShow, dates, setDates] = useContext(FormContext)
    var d = new Date();
    var dDate = new Date(props.date);
    var diff = dDate - d;
    var dayDiff = Math.floor(diff / 1000 / 60 / 60 / 24);

    const navigate = useNavigate();
    const dataRef = collection(db, "Dates")

    const toCount=()=>{
        console.log('jj');
        navigate(`/Count/:${props.index}`, {state: dates[props.index]});
    }

    const fetchDates = async() =>{
        const data = await getDocs(dataRef);
        const sortDates = data.docs.map((date)=>{
            return {...date.data(), id: date.id};
        });
        setDates(sortDates)
    }

    const deleteHandler = () => {
        deleteDoc(doc(dataRef, props.id));
        fetchDates();
    }


    return (
            <div className='count-body hover:bg-blue-600 border rounded-md shadow-md pb-2 m-5'>
                <div className='flex count-icons justify-end'>
                    <span className="delete text-3xl text-red-300 mr-1" onClick={deleteHandler}>&#128465;</span>
                </div>

                <div className="count-container flex flex-wrap" onClick={()=>toCount()}>
                    <div className='w-5/6 border-right p-2 text-white bg-white-500'>
                        <h1 className='font-bold text-center'>{props.title}</h1>
                    </div>
                    <div className="w-1/6 hidden md:block p-2 text-2xl text-white bg-blue-500">
                        {`${dayDiff} ${dayDiff > 1 ? "Days" : "Day"} to Go`}
                    </div>
                </div>
            </div>  
    )
}

export default Countdown;