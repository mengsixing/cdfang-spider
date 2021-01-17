import gql from 'graphql-tag';
import config from '../config';

interface IallHouses {
  allHouses: cdFang.IhouseData[];
}

interface Ipvs {
  pvs: number;
}

const { getGraphqlClient } = config;

export function requestData(year: string, callback: (...args: any[]) => void): void {
  const yearParam = year === 'home' ? '0' : year;

  getGraphqlClient()
    .query<IallHouses>({
      query: gql`
        {
          allHouses(year: ${yearParam}) {
            _id
            area
            name
            number
            beginTime
            endTime
            status
            price
          }
        }
      `
    })
    .then(result => {
      callback(result.data.allHouses);
    });
}

export function requestPvs(callback: (...args: any[]) => void): void {
  getGraphqlClient()
    .query<Ipvs>({
      query: gql`
        {
          pvs(routerName: "allHouses")
        }
      `
    })
    .then(result => {
      callback(result.data.pvs);
    });
}
