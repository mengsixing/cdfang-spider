import React, { useState, useContext } from 'react';
import { Icon, notification } from 'antd';
import config from '../../config';
import './styles.less';
import { AppContext } from '../../context/appContext';


function openNotification(setLoading, appState) {
  setLoading(true);
  fetch(`${config.serverDomain}/spiderPageOne`)
    .then(response => response.json())
    .then((json) => {
      notification.open({
        message: '消息提醒',
        description: `成功更新数据${json.allLength}条，新数据${json.successArray.length}条。`,
      });
      setLoading(false);
      if (json.successArray.length > 0) {
        appState.changeData(appState.allData.concat(json.successArray));
      }
    });
}

function Notice() {
  const [isLoading, setLoading] = useState(false);
  const appState = useContext(AppContext);
  return (
    <span className={isLoading ? 'loading notice-icon' : 'notice-icon'}>
      <Icon
        type="sync"
        onClick={() => {
          openNotification(setLoading, appState);
        }}
      />
    </span>
  );
}

export default Notice;
