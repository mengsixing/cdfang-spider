import React from 'react';
import { Popover } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { AppContext } from '../../context/appContext';
import './styles.less';

const { useContext } = React;
interface Iprops {
  name: string;
  city?: string;
}

const HouseDetail: React.FunctionComponent<Iprops> = ({
  name,
  city = '510100', // 成都
}) => {
  const { allData } = useContext(AppContext);
  const price = allData.find((data) => data.name.includes(name))?.price;
  const content = (
    <div>
      <p>
        单价：
        {price ? (
          <span>
            <span className="house-price">{price}</span>元/m<sup>2</sup>
          </span>
        ) : (
          '暂无'
        )}
      </p>
      <p>
        位置：
        <a
          href={`https://www.amap.com/search?query=${name}&city=${city}`}
          target="_blank"
          rel="nofollow me noopener noreferrer"
        >
          查看地图
        </a>
      </p>
    </div>
  );

  return (
    <Popover placement="right" title={name} content={content}>
      <span className="house-detail-name">{name}</span>
      <InfoCircleOutlined className="house-detail-info" />
    </Popover>
  );
};

export default HouseDetail;
