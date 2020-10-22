import React from 'react';

import './latest-availability.scss';
import {RenderedBox} from "../rendered-box/rendered-box";

/* eslint-disable-next-line */
export interface LatestAvailability {
  renderedBoxes: RenderedBox[];
}

export const LatestAvailability = (props: LatestAvailability) => {
  return (
    <div className={'current-status'}>{props.renderedBoxes[props.renderedBoxes.length-1].latestAvailability}</div>
  );
};

export default LatestAvailability;
