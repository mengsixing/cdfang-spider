import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './styles.less';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { RenderLoadingComponent } from '../HOC/RenderLoadingComponent';
import HouseDetail from '../HouseDetail';

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
  isLink,
}) => {
  const [rankData, changeRankData] = useState(
    _.sortBy(data, (item: Irank) => -item.number)
  );
  const [desc, changeDesc] = useState(1);
  const rankTitle = title ? `排名：${title}` : '排名';

  const changeSort = () => {
    if (desc) {
      changeRankData(_.sortBy(data, (item: Irank) => item.number));
      changeDesc(0);
    } else {
      changeRankData(_.sortBy(data, (item: Irank) => -item.number));
      changeDesc(1);
    }
  };

  useEffect(() => {
    changeRankData(_.sortBy(data, (item: Irank) => -item.number));
    changeDesc(1);
  }, [data]);

  return (
    <div className="rank">
      <div className="rank-title">
        <span>{rankTitle}</span>
        <span
          className="rank-title-desc"
          onClick={changeSort}
          aria-hidden="true"
        >
          {desc ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
        </span>
      </div>
      <ul className="rank-list">
        {rankData.map((item: Irank, index: number) => {
          const istop3 = index < 3 ? 'top3' : '';
          return (
            // eslint-disable-next-line no-underscore-dangle
            <li key={item._id}>
              <span className={istop3}>{index + 1}</span>
              <span>
                {isLink ? <HouseDetail name={item.name} /> : item.name}
              </span>
              <span>{item.number + unit}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RenderLoadingComponent(Rank);
