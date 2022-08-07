import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useDate from "../../useDate";
import "./Home.css";
import Navbar from "./Navbar";

function Count() {
  const location = useLocation();
  const [diff, setDiff] = useState(
    new Date(location.state.Date).getTime() - new Date().getTime()
  );
  const dateValues = useDate(new Date(location.state.Date).getTime());

  const [Items, setItems] = useState({
    stuffs: [
      {
        dayDiff: Math.floor(diff / 1000 / 60 / 60 / 24),
        hourDiff: Math.floor(diff / 1000 / 60 / 60) % 24,
        minDiff: Math.floor(diff / 1000 / 60) % 60,
        secDiff: Math.floor(diff / 1000) % 60,
      },
    ],
  });

  setInterval(() => {
    setDiff(new Date(location.state.Date).getTime() - new Date().getTime());
  }, 1000);

  const showTimer = () => {
    if (diff > 0) {
      return (
        <div className="count-flex mx-2 grid grid-cols-2 text-6xl sm:grid-cols-4 text-white ">
          <div className="box-shadow pt-2 sm:pt-5 m-2 border border-radius-2 rounded">
            <p className="my-3">{Items.stuffs[0].dayDiff}</p>
            <p className="w-type countType bg-red-600 text-2xl p-2 rounded-b">
              {" "}
              {Items.stuffs[0].dayDiff > 1 ? "Days" : "Day"}{" "}
            </p>
          </div>

          <div className="box-shadow pt-2 sm:pt-5 border m-2 pt-2 rounded ">
            <p className="my-3">
              {`${
                Items.stuffs[0].hourDiff < 10
                  ? `0${Items.stuffs[0].hourDiff}`
                  : Items.stuffs[0].hourDiff
              }`}{" "}
            </p>
            <p className="w-type countType bg-blue-600 text-2xl p-2 rounded-b">
              {" "}
              {Items.stuffs[0].hourDiff > 1 ? "Hours" : "Hour"}{" "}
            </p>
          </div>

          <div className=" box-shadow pt-2 sm:pt-5 border m-2 pt-2 rounded ">
            <p className=" my-3">
              {`${
                Items.stuffs[0].minDiff < 10
                  ? `0${Items.stuffs[0].minDiff}`
                  : Items.stuffs[0].minDiff
              }`}{" "}
            </p>
            <p className="w-type countType bg-blue-600 text-2xl p-2 rounded-b">
              {" "}
              {Items.stuffs[0].minDiff > 1 ? "Mins" : "Min"}{" "}
            </p>
          </div>

          <div className="box-shadow pt-2 sm:pt-5 m-2 border pt-2 rounded ">
            <p className="my-3">
              {`${
                Items.stuffs[0].secDiff < 10
                  ? `0${Items.stuffs[0].secDiff}`
                  : Items.stuffs[0].secDiff
              }`}{" "}
            </p>
            <p className="w-type countType bg-blue-600 text-2xl p-2 rounded-b">
              {" "}
              {Items.stuffs[0].secDiff > 1 ? "Secs" : "Sec"}{" "}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="timer">
          <p className="timer-text text-5xl text-red-500">Expired!!!</p> <br />
          <p className="text-white">
            ({[dateValues.day]}, {dateValues.numDay}
            {dateValues.numtype} {dateValues.month} {dateValues.year})
          </p>
          <p> </p>
        </div>
      );
    }
  };

  useEffect(() => {
    setItems({
      stuffs: [
        {
          dayDiff: Math.floor(diff / 1000 / 60 / 60 / 24),
          hourDiff: Math.floor(diff / 1000 / 60 / 60) % 24,
          minDiff: Math.floor(diff / 1000 / 60) % 60,
          secDiff: Math.floor(diff / 1000) % 60,
        },
      ],
    });
  }, [diff]);

  return (
    <div className="count">
      <Navbar home="true" />
      <div className="background"></div>
      <div className="c-body">
        <div className="countdown mx-2 font-bold text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl border border-blue-600 drop-shadow count-heading py-2 mt-5 sm:mt-3 text-shadow rounded-md">
            {location.state.Title}
          </h1>
          {showTimer()}
        </div>
      </div>
    </div>
  );
}

export default Count;
