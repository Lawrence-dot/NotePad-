import React,{ useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FormContext } from './Home';
import db from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Home.css'

function Countdown(props) {
    const [show, setShow, dates, setDates] = useContext(FormContext)
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    var d = new Date();
    var dDate = new Date(props.date);
    var diff = dDate - d;
    var dayDiff = Math.floor(diff / 1000 / 60 / 60 / 24);
    var day = dDate.getDay();
    var month = dDate.getMonth();

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
        <div className='count-body border rounded-md shadow-md hover:bg-gray-100 m-5'>
            <div className='flex count-icons justify-end'>
                <span className="delete text-3xl mr-5 text-red-400" onClick={deleteHandler}>&#128465;</span>
            </div>

            <div className="count-container flex flex-wrap" onClick={()=>toCount()}>
                <div className='w-5/6 border-right text-sky-500 p-2 bg-white-500'>
                    <h1 className='font-bold text-center'>{props.title}</h1>
                </div>
                <div className="w-1/6 hidden md:block text-white bg-sky-500">
                    {`${dayDiff} days to Go`}
                </div>
            </div>
        </div>  
    )
}

export default Countdown;