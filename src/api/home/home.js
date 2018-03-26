
const api = function(url = '', type = 'GET', data = {}){
	const host = 'http://127.0.0.1:14000/api/';
	type = type.toUpperCase();
	let option = {
		method: type,
		headers: {
			"accept": "application/json",
			'Content-Type': 'application/json'
		},
		body: data,
		// mode: 'no-cors',
		// cache: 'force-cache',
		// credentials: 'include'
	}
	if(type === 'GET'){
		// 数据拼接字符串
		let dataStr = '';
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		});
		if(dataStr !== ''){
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
	return fetch(host + url, option)
		.then(response => {
			return response.json()
		})
		.catch(err => {
			console.log(err);
		});
}

export default api
