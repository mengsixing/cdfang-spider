import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class Rank extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.title != this.props.title;
  }

  render() {
    const rankData = _.sortBy(this.props.data, item => -item.number);
    const title = this.props.title
      ? `楼盘排名：${this.props.title}`
      : '楼盘排名：';
    return (
      <div className="rank">
        <div className="rank-title">{title}</div>
        <ul className="rank-list">
          {rankData.map((item, index) => {
					  const istop3 = index < 3 ? 'top3' : '';
					  return (
  <li key={item._id}>
    <span className={istop3}>{index + 1}</span>
    <span>{item.name}</span>
    <span>
      {item.number}
套
    </span>
  </li>
					  );
          })}
        </ul>
      </div>
    );
  }
}

Rank.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
};

export default Rank;
