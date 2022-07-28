import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "./Home";
import db from "../../firebase";
import { Animated } from "react-animated-css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./Home.css";

function Countdown(props) {
  const [show, setShow, dates, setDates] = useContext(FormContext);
  var d = new Date();
  var dDate = new Date(props.date);
  var diff = dDate - d;
  var dayDiff = Math.floor(diff / 1000 / 60 / 60 / 24);

  const navigate = useNavigate();
  const dataRef = collection(db, "Dates");

  const toCount = () => {
    navigate(`/Count/:${props.index}`, { state: dates[props.index] });
  };

  const fetchDates = async () => {
    const data = await getDocs(dataRef);
    const sortDates = data.docs.map((date) => {
      return { ...date.data(), id: date.id };
    });
    setDates(sortDates);
  };

  const deleteHandler = () => {
    deleteDoc(doc(dataRef, props.id));
    fetchDates();
  };

  return (
    <div className="count-body flex flex-wrap border rounded-md shadow-md m-5">
      <div
        className="count-container w-2/3 flex flex-wrap"
        onClick={() => toCount()}
      >
        <div className="border-right p-2 text-white bg-white-500 m-auto flex justify-center">
          <h1 className="text-center">{props.title}</h1>
        </div>
      </div>

      <div className="flex flex-col w-1/3 count-icons">
        <div className="delSpan">
          <span
            className="delete text-2xl sm:text-3xl text-red-300 ml-auto flex"
            onClick={deleteHandler}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
          </span>
        </div>

        <div className=" countinBox md:block p-1 text-xl text-white border border-blue-500">
          <p className="text-red-500">
            {`${dayDiff > 0 ? dayDiff : "Expired!!!"} ${
              dayDiff > 1 ? "Days to Go" : dayDiff === 1 ? "Day to Go" : " "
            } `}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
