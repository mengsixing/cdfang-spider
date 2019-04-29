import Idata from './Idata';

/* eslint-disable import/prefer-default-export */

export function transformArray(array: string[]): Idata[] {
  const result = array.map(
    (item): Idata => ({
      _id: item[0],
      area: item[2],
      name: item[3],
      number: Number.parseInt(item[6], 10),
      beginTime: item[8],
      endTime: item[9],
      status: item[11]
    })
  );
  return result;
}
