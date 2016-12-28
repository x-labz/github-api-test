var toTime = function (val) {
	return parseInt(val / 60) + ':' + (parseInt(val % 60) >= 10  ? parseInt(val % 60) : ('0' + parseInt(val % 60)));
}

export {toTime}