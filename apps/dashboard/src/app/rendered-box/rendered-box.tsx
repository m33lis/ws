import React, {useState} from 'react';

import './rendered-box.scss';
import Tooltip from "../tooltip/tooltip";
import {Availability} from "@m3l/tools";

/* eslint-disable-next-line */
export interface RenderedBox {
  latestAvailability?: string;
  values: Availability[];
  isTooltipVisible?: boolean;
}

export const RenderedBox = (props: RenderedBox) => {

  const [tbShowing, setTbShowing] = useState(props.isTooltipVisible)
  const toggleTooltip = () => setTbShowing(!tbShowing);

  return (
    <span className={'av-bar ' + determineColorOfBox(props.values)} onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip}>
      <Tooltip avs={props.values} isTooltipVisible={tbShowing} />
    </span>
  );
};

export default RenderedBox;


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
