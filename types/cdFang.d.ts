declare namespace cdFang {
  interface IhouseData {
    _id: string;
    __v?: number;
    area: string;
    beginTime: string;
    endTime: string;
    name: string;
    number: number;
    status: string;
  }

  interface Ianalytics {
    routerName: string;
    createdTime?: Date;
  }

  // 和client constants 目录保持一致
  interface IareaHouse {
    区域: string;
    房源数: number;
  }

  interface IareaBuilder {
    区域: string;
    楼盘数: number;
  }

  interface IcircleItem {
    date: string;
    item: string;
    number: number;
    percent: number;
  }
}
