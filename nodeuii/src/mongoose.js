import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.warn('连接mongodb成功');
});
var HouseSchema = mongoose.Schema({
  _id: String,
  area: String,
  name: String,
  number: Number,
  beginTime: String,
  endTime: String,
  status: String
});
var HouseCol = mongoose.model('house', HouseSchema);
var result = {
  async add(item) {
    var findItem = await this.find({ _id: item._id });
    if (findItem.length > 0) {
      return false;
    }
    var house = new HouseCol(item);
    house.save(function (err) {
      if (err) return console.error(err);
    });
    return true;
  },
  find(query) {
    var result = HouseCol.find(query, function (err, house) {
      if (err) return console.error(err);
      return house;
    });
    return result;
  },
  delete() {
    HouseCol.remove({ name: 'xxx' }, function (err) {
      console.warn(err);
    });
  }
};


export default result;
