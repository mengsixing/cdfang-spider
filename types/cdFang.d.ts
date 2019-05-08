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

  interface IareaHouse {
    区域: string;
    房源: number;
  }

  interface IareaBuilder {
    区域: string;
    楼盘数: number;
  }
}
