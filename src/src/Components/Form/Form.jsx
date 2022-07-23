import React, { useContext, useEffect } from 'react'
import { useRef } from 'react';
import './Form.css'
import db from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { FormContext } from '../Home/Home';



const Form = () => {
    const [show, setShow, dates, setDates] = useContext(FormContext)
    const dateRef = useRef();
    const timeRef = useRef();
    const titleRef = useRef();
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
    }, dates);

    const toggleForm = () => {
        setShow(!show)
    }

    const submit =(e)=> {
        e.preventDefault();
        var date = new Date();
        if (titleRef.current.value !='' && dateRef.current.value !='') {
            const addNeww = {
                Title : titleRef.current.value,
                Date : dateRef.current.value
            }
    
            console.log(addNeww);
    
            addDoc(dataRef, addNeww);
            dateRef.current.value = '';
            toggleForm();
        } else {
            alert('Please Fill all input fields');
        }
    }

    var d = new Date().toISOString();
    var dateFormat = d.slice(0, 19)

    return (
        <div className='form-body'>
            <div className="form p-4 box-shadow">
                <form action="">
                <span className='cancel' onClick={toggleForm}>X</span>
                <h3 className='my-3 font-bold text-2xl text-sky-500'> Add New CountDown</h3>
                    <input className='my-3' ref={titleRef} type="text" placeholder='Countdown Title' /> <br />
                    <input className='my-4' ref={dateRef} type="datetime-local" min={dateFormat} />        
                    <button className='sendBtn hover:bg-sky-400 box-shadow bg-sky-500 text-2xl p-2 text-white rounded-lg' onClick={submit}> + </button>
                </form>
            </div>
        </div>
    );
};

export default Form;