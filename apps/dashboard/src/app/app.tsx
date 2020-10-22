import React, {useEffect, useState} from 'react';

import './app.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';
import Tooltip from './tooltip/tooltip';

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
  values: Availability[];
  isTooltipVisible?: false;
}

export const App = () => {

  const [rbs, setRbs] = useState<RenderedBox[]>([{latestAvailability:"", values:[]}]);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const [toolTipVisible, setToolTipVisible] = useState(false);

  const showTooltip = (event) => {
    setToolTipVisible(true);
  };

  useEffect(() => {
    fetch('/api/rbs/'+window.innerWidth)
      .then((_) => _.json())
      .then(setRbs);
  }, []);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      fetch('/api/rbs/'+window.innerWidth)
        .then((_) => _.json())
        .then(setRbs);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount


  function determineColorOfBox(availabilities: Availability[]) {
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

  function howManyBoxesPerRow(width: number): number {
    if (width !== undefined) {
      return width / 10;
    }
  }

  function getLatestAvailability(rbs: RenderedBox[]) {
    return rbs[rbs.length-1].latestAvailability;
  }

  return (
      <div className={'project'}>
        <div className={'header'}>
          <div className={'title'}>Project A</div>
          <div className={'current-status'}>{getLatestAvailability(rbs)}</div>
        </div>
        <div className={'av-bar-content'}>
          {rbs.map((a, idx) => (
            <span key={idx} className={'av-bar ' + determineColorOfBox(a.values)} onClick={showTooltip}><Tooltip avs={a.values} /></span>
          ))}
        </div>
        <div className={'footer'}>
          <div className={'beginning'}>24 hours ago</div>
          <div className={'av-amount'}>99.96% availability</div>
          <div className={'end'}>Today</div>
        </div>
      </div>
  );
};

export default App;

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
