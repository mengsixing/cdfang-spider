import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './styles.less';

function Rank(props) {
  const { data, title } = props;
  const rankData = _.sortBy(data, item => -item.number);
  const rankTitle = title ? `楼盘排名：${title}` : '楼盘排名：';
  return (
    <div className="rank">
      <div className="rank-title">{rankTitle}</div>
      <ul className="rank-list">
        {rankData.map((item, index) => {
          const istop3 = index < 3 ? 'top3' : '';
          return (
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

Rank.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
};

export default Rank;
