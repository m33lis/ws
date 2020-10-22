interface Tools {

}

const Tools = (props: Tools) => {

}


export default Tools;

export interface Availability {
  timestamp: number;
  value: string;
}

export interface RenderedBox {
  latestAvailability?: string;
  values: Availability[];
  isTooltipVisible?: boolean;
}
