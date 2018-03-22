import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('链接成功');
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



// Kitten.find({ name: /^fluff/ }, function (err, kittens) {
//   console.log('取得的数据', kittens);
// });

var result = {
	add() {
		var house = new HouseCol({
			_id: '67BEADE1494C01CCE053AC1D15D947F7',
			area: '郫都区',
			name: '悦未来',
			number: 394,
			beginTime: '2018-03-20 09:00:00',
			endTime: '2018-03-22 18:00:00',
			status: '正在报名'
		});
		house.save(function (err) {
			if (err) return console.error(err);
		});
	},
	find(){
		HouseCol.find(function (err, house) {
			if (err) return console.error(err);
			return house;
		});
	}
};


export default result;
