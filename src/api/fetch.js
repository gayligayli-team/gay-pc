/*
 * file 处理类型(default: JSON)
 * 
 * response.text()				字符串(String
 * response.json()				JSON
 * response.blob()				二进制流(媒体Media|audio、图片image
 * response.arrayBuffer()		Buffer
 */
const api = function({
		url = '',
		type = 'GET',
		data = {},
		file = 'json'
	}){
	// const host = 'https://www.alice47.com/api/';
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
		credentials: 'include'
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
		option.body = null;
	}else{
		option.body = JSON.stringify(option.body);
	}
	return fetch(host + url, option)
		.then(response => {
			if(file === 'blob'){
				return response.blob();
			}else{
				return response.json();
			}
		}).then(json => {
			return json
		}).catch(err => {
			console.log(err);
		});
}


export default api
