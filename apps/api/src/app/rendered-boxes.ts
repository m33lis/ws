import {useEffect, useState} from "react";
import {Express} from "express";


interface Availability {
  timestamp: number;
  value: string;
}

interface WindowSize {
  width: number,
  height: number
}

interface RenderedBox {
  latestAvailability?: string;
  values: Availability[]
}


const renderedBoxes: RenderedBox[] = [];

export function addRenderedBoxesRoutes(app: Express) {
  app.get('/api/rbs/:width', (req, resp) => {
    resp.send(getRenderedBoxes(+req.params.width));
  });

}

function getRenderedBoxes(width: number) {
  let aaa = [];
  const returnRbs:RenderedBox[] = [];
  const dt = new Date().getTime();
  const values = ['available','available','available','available','available','available','available','available','available','available', 'partially-unavailable', 'unavailable']

  if (width == undefined || isNaN(width)) {
    width = 1000;
  }
  const bpr = (width-30) / 10;
  const itemPerBox = 1440 / bpr;
  console.log("Browser width: "+ width + ", boxer per row: " + bpr + ", items per box: "+itemPerBox);

  let o = 0;
  while (o<1440) {
    for (let i=0;i<itemPerBox;i++) {
      const curValIndex = Math.floor(Math.random() * 12);
      aaa.push({timestamp: (dt-(i*60000)), value: values[curValIndex]})
    }
    returnRbs.push({latestAvailability: determineColorOfBox(aaa), values: aaa});
    aaa = [];
    o = o + itemPerBox;
  }

  return returnRbs;

}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

const determineColorOfBox = (availabilities: Availability[]):string => {
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
