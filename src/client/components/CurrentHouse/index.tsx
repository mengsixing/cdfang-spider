import * as React from 'react';
import { Collapse, List, Col, Row, Icon } from 'antd';

import { HOUSE_PURCHASE_REGISTRATION } from '../../constants';
import { AppContext } from '../../context/appContext';
import { RenderLoadingComponent } from '../HOC/RenderLoadingComponent';
import LinkToMap from '../LinkToMap';
import './styles.less';

const { useContext } = React;
const { Panel } = Collapse;

const CurrentHouse: React.FunctionComponent = () => {
  const { allData } = useContext(AppContext);
  const currentHouses = allData
    .filter(item => item.status !== '报名结束')
    .map(item => (
      // eslint-disable-next-line no-underscore-dangle
      <div className="current-house-list" key={item._id}>
        <Row>
          <Col span={4}>
            <span className="current-house-list-notification-icon">
              <Icon type="notification" />
            </span>
            {item.area}
          </Col>
          <Col span={8}>
            <LinkToMap name={item.name} />
          </Col>
          <Col span={4}>{`${item.number}套`}</Col>
          <Col span={8}>
            {`登记截止时间：${item.endTime} `}
            <a
              className="current-house-list-register-link"
              rel="nofollow me noopener noreferrer"
              target="_blank"
              href={HOUSE_PURCHASE_REGISTRATION}
            >
              登记
            </a>
          </Col>
        </Row>
      </div>
    ));

  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header="正在登记" key="1" extra={<Icon type="notification" />}>
        <List
          bordered
          dataSource={currentHouses}
          renderItem={(item: JSX.Element) => <List.Item>{item}</List.Item>}
        />
      </Panel>
    </Collapse>
  );
};

export default RenderLoadingComponent(CurrentHouse, '50px');
