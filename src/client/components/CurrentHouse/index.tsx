import React, { useContext } from 'react';
import { Collapse, List, Col, Row } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { HOUSE_PURCHASE_REGISTRATION } from '../../constants';
import { AppContext } from '../../context/appContext';
import { RenderLoadingComponent } from '../HOC/RenderLoadingComponent';
import HouseDetail from '../HouseDetail';
import './styles.less';

const CurrentHouse: React.FunctionComponent = () => {
  const { allData } = useContext(AppContext);
  const currentHouses = allData
    .filter((item) => item.status !== '报名结束')
    .map((item) => (
      // eslint-disable-next-line no-underscore-dangle
      <div className="current-house-list" key={item._id}>
        <Row>
          <Col span={4}>
            <span className="current-house-list-notification-icon">
              <NotificationOutlined />
            </span>
            {item.area}
          </Col>
          <Col span={8}>
            <HouseDetail name={item.name} />
          </Col>
          <Col span={4}>{`${item.number}套`}</Col>
          <Col span={8}>
            {`登记截止时间：${item.endTime} `}
            {item.status === '正在报名' ? (
              <a
                className="current-house-list-register-link"
                rel="nofollow me noopener noreferrer"
                target="_blank"
                href={HOUSE_PURCHASE_REGISTRATION}
              >
                正在登记{' '}
                <span role="img" aria-label="Fire">
                  🔥
                </span>
              </a>
            ) : (
              <span className="current-house-list-register-link">
                {item.status === '未报名' ? '即将报名' : item.status}{' '}
                <span role="img" aria-label="Funnel">
                  ⌛
                </span>
              </span>
            )}
          </Col>
        </Row>
      </div>
    ));

  const result =
    currentHouses.length > 0 ? (
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel
          header="正在登记"
          key="1"
          extra={<NotificationOutlined />}
        >
          <List
            bordered
            dataSource={currentHouses}
            renderItem={(item: JSX.Element) => <List.Item>{item}</List.Item>}
          />
        </Collapse.Panel>
      </Collapse>
    ) : (
      <span />
    );

  return result;
};

export default RenderLoadingComponent(CurrentHouse, '50px');
