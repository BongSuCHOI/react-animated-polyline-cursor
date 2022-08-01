const DeviceCheck = {
	Mobile: function () {
		return navigator.userAgent.match(/Mobi|Android|iPhone/i);
	},
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	iOSChrome: function () {
		return navigator.userAgent.match(/CriOS/i);
	},
	any: function () {
		return (
			DeviceCheck.Mobile() ||
			DeviceCheck.Android() ||
			DeviceCheck.iOS() ||
			DeviceCheck.Opera() ||
			DeviceCheck.Windows()
		);
	},
};

export default DeviceCheck;
