import * as React from 'react';
import * as _ from 'lodash';
import './styles.less';

export interface Iprops {
  data: Idata[];
  title: string;
}

function Rank(props: Iprops) {
  const { data, title } = props;
  const rankData = _.sortBy(data, (item: Idata) => -item.number);
  const rankTitle = title ? `楼盘排名：${title}` : '楼盘排名';
  return (
    <div className="rank">
      <div className="rank-title">{rankTitle}</div>
      <ul className="rank-list">
        {rankData.map((item: Idata, index: number) => {
          const istop3 = index < 3 ? 'top3' : '';
          return (
            // eslint-disable-next-line no-underscore-dangle
            <li key={item._id}>
              <span className={istop3}>{index + 1}</span>
              <span>{item.name}</span>
              <span>{`${item.number}套`}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Rank;
