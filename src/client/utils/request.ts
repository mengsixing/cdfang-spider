import gql from 'graphql-tag';
import config from '../config';

interface IallHouses {
  allHouses: cdFang.IhouseData[];
}

const { getGraphqlClient } = config;

function requestData(year: string, callback: Function): void {
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
          }
        }
      `
    })
    .then(result => {
      callback(result.data.allHouses);
    });
}

export default requestData;
