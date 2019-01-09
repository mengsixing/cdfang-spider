import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart, Geom, Axis, Tooltip,
} from 'bizcharts';
import './styles.less';

class AreaBar extends React.Component {
  static defaultProps = {
    desc: false,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      data, title, xAxis, yAxis, desc,
    } = this.props;
    let chartData = [];
    if (desc) {
      chartData = data.sort((a, b) => b[yAxis] - a[yAxis]);
    }
    return (
      <Chart height={400} data={chartData} forceFit>
        <div className="char-title">{title}</div>
        <Axis name={xAxis} />
        <Axis name={yAxis} />
        <Tooltip />
        <Geom type="interval" position={`${xAxis}*${yAxis}`} />
      </Chart>
    );
  }
}

AreaBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
  desc: PropTypes.bool,
};

export default AreaBar;
