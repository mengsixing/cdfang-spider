interface Isource {
  source: Function;
}

declare class Dataset {
  // 静态变量
  static getMaxAge(): number; // 静态方法

  constructor();

  // 构造函数
  createView(): Isource;
}

export declare class DataView {
  DataView: Function;

  constructor();

  source: Function;
}

export default Dataset;
