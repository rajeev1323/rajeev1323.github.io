const startScan = function (html5QrCode, onSuccess) {
	const qrCodeSuccess = (decodedText, decodedResult) => {
		stopScan(html5QrCode);
		onSuccess(decodedText, decodedResult);
	};

	const qrCodeFailure = (errorMessage) => {
		console.log(`Code scan error = ${errorMessage}`);
	};
	const config = { fps: 10, qrbox: 250 };
	const isTouch = false;

	// Default is front camera
	const facingMode = { facingMode: 'user' };

	if (isTouch) {
		Object.assign(config, {
			experimentalFeatures: {
				useBarCodeDetectorIfSupported: true
			}
		});

		// For smart phone rear camera
		facingMode.facingMode = 'environment';

	}

	html5QrCode.start(facingMode, config, qrCodeSuccess, qrCodeFailure);
};

const stopScan = function (html5QrCode) {
	html5QrCode.stop().then((ignore) => {
		console.log('stopped');
	}).catch((err) => {
		console.log('error stopping');
	});
};

const getJson = function (text) {
	const json = {};
	if (!text) {
		return json;
	}

	const elems = text.split(';');
	elems.forEach(elem => {
		const [key, value] = elem.split('=');
		json[key] = value;
	});

	return json;
};


window.addEventListener('DOMContentLoaded', (event) => {
	const reader = document.querySelector('.reader');
	// const startButton = document.querySelector('.start-button');
	// const payButton = document.querySelector('.start-pay-button');
	// const scanData = document.querySelector('.scan-data');
	// const actionsBox = document.querySelector('.reader-actions');
	// const merchantName = document.querySelector('.merchant-name');
	// const merchantUuid = document.querySelector('.merchant-uuid');

	const onScanSuccess = function (text, data) {
		const json = getJson(text);
		// merchantName.value = json.merchant_name;
		// merchantUuid.value = json.merchant_id;
		document.querySelector('#spinner').hidden = false;
		window.location.href = '/redeem'; //`http://localhost:8000/mybucks?qrPayment=true&merchantId=${json.merchant_id}`;
		// actionsBox.hidden = false;
		// startButton.value ='Scan Another';
		// scanData.hidden = false;
		// payButton.hidden = false;
		reader.classList.add('success');
	};

	const formatsToSupport = [
		Html5QrcodeSupportedFormats.QR_CODE,
		Html5QrcodeSupportedFormats.UPC_A,
		Html5QrcodeSupportedFormats.UPC_E,
		Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
	];
	const html5QrCode = new Html5Qrcode("reader", { formatsToSupport });
	startScan(html5QrCode, onScanSuccess);

	// startButton.addEventListener('click', event => {
	// 	actionsBox.hidden = true;
	// 	startScan(html5QrCode, onScanSuccess);
	// });
});
