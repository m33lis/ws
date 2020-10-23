import {Express} from "express";

export interface Availability {
  timestamp: number;
  value: string;
}

interface RenderedBox {
  latestAvailability?: string;
  values: Availability[]
  isToolTipVisible?: boolean;
}


const renderedBoxes: RenderedBox[] = [];

export function addRenderedBoxesRoutes(app: Express) {
  app.get('/api/rbs/:width', (req, resp) => {
    resp.send(getRenderedBoxes(+req.params.width));
  });

}

function getRenderedBoxes(width: number) {
  let aaa = [];
  const returnRbs:RenderedBox[] = [];
  const dt = new Date().getTime();
  const values = ['available','available','available','available','available','available','available','available','available','available', 'partially-unavailable', 'unavailable']

  if (width == undefined || isNaN(width)) {
    width = 1000;
  }
  const bpr = (width-30) / 10;
  const itemPerBox = 1440 / bpr;

  let o = 0;
  let aCount = 0
  const dateTime = new Date().getTime();
  while (o<1440) {
    for (let i=0;i<itemPerBox;i++) {
      aCount++;
      const curValIndex = Math.floor(Math.random() * 12);
      aaa.push({timestamp: (dateTime-(aCount*60000)), value: values[curValIndex]})
    }
    returnRbs.push({latestAvailability: determineColorOfBox(aaa), values: aaa.reverse(), isToolTipVisible: false});
    aaa = [];
    o = o + itemPerBox;

  }

  return returnRbs.reverse();

}

const determineColorOfBox = (availabilities: Availability[]):string => {
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
