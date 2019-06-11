import * as React from 'react';
import * as _ from 'lodash';
import './styles.less';
import { RenderLoadingComponent } from '../HOC/RenderLoadingComponent';
import LinkToMap from '../LinkToMap';

interface Irank {
  _id: string;
  name: string;
  number: number;
}

// 导出给 test 文件使用
export interface Iprops {
  data: Irank[];
  title: string;
  unit: string;
  isLink?: boolean;
}

const Rank: React.FunctionComponent<Iprops> = ({
  data,
  title,
  unit,
  isLink
}) => {
  const rankData = _.sortBy(data, (item: Irank) => -item.number);
  const rankTitle = title ? `排名：${title}` : '排名';

  return (
    <div className="rank">
      <div className="rank-title">{rankTitle}</div>
      <ul className="rank-list">
        {rankData.map((item: Irank, index: number) => {
          const istop3 = index < 3 ? 'top3' : '';
          return (
            // eslint-disable-next-line no-underscore-dangle
            <li key={item._id}>
              <span className={istop3}>{index + 1}</span>
              <span>{isLink ? <LinkToMap name={item.name} /> : item.name}</span>
              <span>{item.number + unit}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RenderLoadingComponent(Rank);
