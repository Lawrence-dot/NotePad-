import React, { createContext, useEffect, useState } from "react";
import Form from "../Form/Form";
import Countdown from "./Countdown";
import "./Home.css";
import db from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "animate.css";
import useDate from "../../useDate";
import Navbar from "./Navbar";
export const FormContext = createContext();

function Home() {
  const [show, setShow] = useState(false);
  const [dates, setDates] = useState([]);
  const dateValues = useDate(new Date());
  const dataRef = collection(db, "Dates");
  const [d, setD] = useState(new Date());
  var hour = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  var meridian = "AM";

  setInterval(() => {
    setD(new Date());
  }, 1000);

  useEffect(() => {
    const fetchDates = async () => {
      const data = await getDocs(dataRef);
      const sortDates = data.docs.map((date) => {
        return { ...date.data(), id: date.id };
      });
      setDates(sortDates);
    };
    fetchDates();
  }, []);

  useEffect(() => {
    hour = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
    if (hour > 12) {
      hour = hour - 12;
      meridian = "PM";
    } else if (hour === 0) {
      hour = 12;
    }
  }, [d]);

  const toggleNew = () => {
    setShow(!show);
  };

  const date =
    dates &&
    dates.map((each, index) => {
      return (
        <Countdown
          title={each.Title}
          date={each.Date}
          time={each.Time}
          key={index}
          index={index}
          id={each.id}
        />
      );
    });

  return (
    <FormContext.Provider value={[show, setShow, dates, setDates]}>
      <Navbar home="false" />
      <div className="Home">
        {show && <Form />}
        <div className="background"></div>
        <div className="timeandDate">
          <div className="flex justify-center align-center text-white pt-5 home-time">
            <p className="time text-bold">{`${hour < 10 ? `0${hour}` : hour}:${
              min < 10 ? `0${min}` : min
            }:${sec < 10 ? `0${sec}` : sec}${meridian} `}</p>{" "}
            <br />
          </div>

          <div className="flex justify-center text-white home-date">
            <p className="date text-2xl">
              {" "}
              {`${dateValues.day}, ${dateValues.numDay}${dateValues.numtype} ${dateValues.month} ${dateValues.year}`}
            </p>
          </div>
        </div>

        <div className="addbtn flex justify-end">
          <button
            type="button"
            className="addCountdown border-blue-600 text-center rounded-full border-2 border-blue-600 hover:boder-0 hover:bg-blue-600 text-white"
            onClick={toggleNew}
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mx-1 md:mx-5">
          {date}
        </div>
      </div>
    </FormContext.Provider>
  );
}

export default Home;
