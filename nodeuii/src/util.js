export function transformArray(array) {
	var result = array.map(item => {
		return {
			_id: item[0],
			area: item[2],
			name: item[3],
			number: Number.parseInt(item[6]),
			beginTime: item[8],
			endTime: item[9],
			status: item[11]
		};
	});
	return result;
}
