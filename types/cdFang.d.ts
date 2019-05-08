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

  // 和client constants 目录保持一致
  interface IareaHouse {
    区域: string;
    房源数: number;
  }

  interface IareaBuilder {
    区域: string;
    楼盘数: number;
  }
}
