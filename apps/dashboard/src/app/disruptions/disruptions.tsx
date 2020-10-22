import React, {useEffect, useState} from 'react';

import './disruptions.scss';
import Moment from "react-moment";
import {Availability} from "@m3l/tools";
import DisruptionEntry from "../disruption-entry/disruption-entry";

/* eslint-disable-next-line */
export interface Disruptions {
  avs: Availability[];
}

export const Disruptions = (props: Disruptions) => {

  const [partiallyUnavailableMinutes, setPartiallyUnavailableMinutes] = useState(0);
  const [unavailableMinutes, setUnavailableMinutes] = useState(0);

  useEffect(() => {
    partiallyUnavailable(props.avs);
    unavailable(props.avs);
  })

  const partiallyUnavailable = (avs: Availability[]) => {
    let minutes = 0;
    avs.forEach((a) => {
      if (a.value === "partially-unavailable") {
        minutes++;
      }
    })

    setPartiallyUnavailableMinutes(minutes);
  }

  const unavailable = (avs: Availability[]) => {
    let minutes = 0;
    avs.forEach((a) => {
      if (a.value === "unavailable") {
        minutes++;
      }
    })

    setUnavailableMinutes(minutes);
  }

  const pas = props.avs.filter(a => a.value === "partially-unavailable");
  const uas = props.avs.filter(a => a.value === "unavailable");

  if (pas.length > 0 && uas.length === 0) {
    return (
      <ul>
        <DisruptionEntry  index={1} duration={partiallyUnavailableMinutes} value={'Partial outage'}/>
      </ul>
    );

  } else if (uas.length > 0 && pas.length === 0) {
    return (
      <ul>
        <DisruptionEntry  index={1} duration={unavailableMinutes} value={'Full outage'}/>
      </ul>
    );

  } else if (pas.length > 0 && uas.length > 0) {
    return (
      <ul>
        <DisruptionEntry index={1} duration={partiallyUnavailableMinutes} value={'Partial outage'}/>
        <DisruptionEntry index={1} duration={unavailableMinutes} value={'Full outage'}/>
      </ul>
    );
  } else {
    return null;
  }

};

export default Disruptions;
