import React from 'react';

import './total-availability.scss';

/* eslint-disable-next-line */
export interface TotalAvailability {
  totalAvailability: number;
}

export const TotalAvailability = (props: TotalAvailability) => {
  return (
    <div className={'av-amount'}>{props.totalAvailability.toFixed(2)}% availability</div>
  );
};

export default TotalAvailability;
