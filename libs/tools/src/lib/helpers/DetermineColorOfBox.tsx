import React from 'react';
import './DetermineColorOfBox.scss';
import {Availability} from "@m3l/tools";


const DetermineColorOfBox = (availabilities: Availability[]):string => {
  let avString = "available";

  if (availabilities === undefined || availabilities === null) {
    return;
  }

  availabilities.forEach((av) => {
    if (av.value === "partially-unavailable" && avString !== "unavailable") {
      avString = "partially-unavailable";
    } else if (av.value === "unavailable") {
      avString = "unavailable";
    }
  });

  return avString;
}

export default determineColorOfBox;
