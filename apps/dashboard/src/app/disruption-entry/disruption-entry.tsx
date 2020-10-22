import React from 'react';

import './disruption-entry.scss';
import Moment from "react-moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"

/* eslint-disable-next-line */
export interface DisruptionEntry {
  index: number;
  duration: number;
  value: string;
}

export const DisruptionEntry = (props: DisruptionEntry) => {


  if (props.value !== "available") {
    return (
      <li className={'disruption-list-item'} key={props.index}>
        <span className={'disruption-list-item-icon'}>
          <FontAwesomeIcon className={props.value === "Partial outage" ? "orange" : "red" } icon={faExclamationTriangle} />
        </span>
        <span className={'disruption-list-item-value'}>
          {props.value.replace('_',' ')}
        </span>
        <span className={'disruption-list-item-duration'}>
          {props.duration}{"min"}
        </span>
       </li>
    );
  } else {
    return (<></>)
  }

};

export default DisruptionEntry;
