import React, {useState} from 'react';

import './tooltip.scss';
import Moment from "react-moment";
import {Availability} from "@m3l/tools";
import Disruptions from "../disruptions/disruptions";

/* eslint-disable-next-line */
export interface Tooltip {
  avs: Availability[];
  isTooltipVisible: boolean;
}

export const Tooltip = (props: Tooltip) => {
  if (props.isTooltipVisible) {
    return (
      <div className={'arrow-up'}>
        <div className={'tooltip-outer'}>
          <h3 className={'tooltip-header'}><Moment format="HH:mm:ss[Z] / DDMMMYY">{props.avs[0].timestamp}</Moment></h3>
          <div className={'tooltip-inner'}>
            <Disruptions avs={props.avs} />
          </div>
        </div>
      </div>
    );
  } else {
    return (<div></div>);
  }
};

export default Tooltip;
