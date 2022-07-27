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
    <div className="count-bodypy- border rounded-md shadow-md m-5">
      <Animated
        animationIn="bounceInLeft"
        animationOut="fadeOut"
        isVisible={true}
      >
        <div className="flex count-icons justify-end">
          <span
            className="delete text-xl sm:text-3xl text-red-300 mr-1"
            onClick={deleteHandler}
          >
            &#128465;
          </span>
        </div>

        <div
          className="count-container flex flex-wrap"
          onClick={() => toCount()}
        >
          <div className="w-5/6 border-right p-2 text-white bg-white-500">
            <h1 className="text-center">{props.title}</h1>
          </div>

          <div className="w-1/6 hidden countinBox md:block p-3 text-xl text-white border border-blue-500">
            <p className="text-red-500">
              {`${dayDiff > 0 ? dayDiff : "Expired!!!"} ${
                dayDiff > 1 ? "Days to Go" : dayDiff === 1 ? "Day to Go" : " "
              } `}
            </p>
          </div>
        </div>
      </Animated>
    </div>
  );
}

export default Countdown;
