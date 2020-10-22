import React, {useEffect, useState} from 'react';

import './app.scss';

import RenderedBox from "./rendered-box/rendered-box";
import LatestAvailability from "./latest-availability/latest-availability";
import TotalAvailability from "./total-availability/total-availability";

interface Availability {
  timestamp: number;
  value: string;
}

interface WindowSize {
  width: number,
  height: number
}

export const App = () => {
  const [rbs, setRbs] = useState<RenderedBox[]>([{latestAvailability:"", values:[]}]);
  const [rbsTotalAvailability, setRbsTotalAvailability] = useState(0);

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      fetchData();
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount


  const fetchData = () => {
    fetch('/api/rbs/'+window.innerWidth)
      .then((_) => _.json())
      .then((vals) => {
        setRbs(vals);
        getTotalAvailabilityFromRbs(vals);
      });
  }

  const getTotalAvailabilityFromRbs = (rbs: RenderedBox[]):void => {
    let val = 0;
    rbs.forEach((rb) => {
      rb.values.forEach((av) => {
        if (av.value === "available") val++;
      })
    });

    setRbsTotalAvailability((val*100)/1440);
  }

  return (
      <div className={'project'}>
        <div className={'header'}>
          <div className={'title'}>Project A</div>
          <LatestAvailability renderedBoxes={rbs} />
        </div>
        <div className={'av-bar-content'}>
          {rbs.map((a, idx) => (
            <RenderedBox key={idx} values={a.values}/>
          ))}
        </div>
        <div className={'footer'}>
          <div className={'beginning'}>24 hours ago</div>
          <TotalAvailability totalAvailability={rbsTotalAvailability} />
          <div className={'end'}>Today</div>
        </div>
      </div>
  );
};

export default App;
