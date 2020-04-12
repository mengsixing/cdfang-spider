import React from 'react';
import { notification } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import gql from 'graphql-tag';
import config from '../../config';
import './styles.less';
import { AppContext, IappContext } from '../../context/appContext';

const { useState, useContext } = React;

function openNotification(setLoading: Function, appState: IappContext) {
  setLoading(true);
  const { getGraphqlClient } = config;

  getGraphqlClient()
    .query({
      query: gql`
        {
          spiderPageOne {
            allLength
            successArray {
              _id
              area
              name
              number
              beginTime
              endTime
              status
            }
          }
        }
      `,
    })
    .then((result) => {
      const data = result.data.spiderPageOne;
      notification.open({
        message: '消息提醒',
        description: `成功更新数据${data.allLength}条，新数据${data.successArray.length}条。`,
      });
      setLoading(false);
      if (data.successArray.length > 0) {
        appState.changeData(appState.allData.concat(data.successArray));
      }
    });
}

const Notice: React.FunctionComponent = () => {
  const [isLoading, setLoading] = useState(false);
  const appState = useContext(AppContext);
  return (
    <span className={isLoading ? 'loading notice-icon' : 'notice-icon'}>
      <SyncOutlined
        onClick={() => {
          openNotification(setLoading, appState);
        }}
      />
    </span>
  );
};

export default Notice;
