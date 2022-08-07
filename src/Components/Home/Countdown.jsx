import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "./Home";
import db from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
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
            className="delete text-xl sm:text-2xl text-red-400 ml-auto flex"
            onClick={deleteHandler}
          >
            <FontAwesomeIcon icon={faTrashCan} color={"red"} />
          </span>
        </div>

        <div className=" countinBox md:block p-1 text-xl text-white border border-blue-500">
          <p className="text-white">
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
