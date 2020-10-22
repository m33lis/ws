import React from 'react';

import './helpers.scss';

/* eslint-disable-next-line */
interface Availability {
  timestamp: number;
  value: string;
}
/* eslint-disable-next-line */
export const determineColorOfBox = (availabilities: Availability[]):string => {
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
