import React from 'react';

import './tooltip.scss';

interface Availability {
  timestamp: number;
  value: string;
}

/* eslint-disable-next-line */
export interface TooltipProps {
  avs: Availability[];
  isVisible?: boolean;
}

export const Tooltip = (props: TooltipProps) => {
  if (props.isVisible) {
    return (
      <div className={'tooltip-outer'}>
        <div className={'tooltip-inner'}>
          <ul>
            {props.avs.map((a, i) => <li key={a.timestamp}>{a.timestamp} - {a.value}</li>)}
          </ul>
        </div>
      </div>
    );
  } else {
    return (<div></div>)
  }
};

export default Tooltip;
