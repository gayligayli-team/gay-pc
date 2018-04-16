const validate = {
	// Null字符
	isNull: (str, name) => {
		if(typeof str === 'undefined' || str.length === 0){
			console.warn(`${name}不能为空`);
			return false;
		}
		return true;
	},
	// 密码
	psdError: (password) => {
		const reg = /^([a-zA-Z0-9]){1}([a-zA-Z0-9]|[._!?~^%+-=@#$&*`]){5,17}$/g;
		if(!reg.test(password)){
			console.warn('密码格式不正确');
			return false;
		}
		return true;
	},
	// 确认密码
	psdConfirmError: (password, passwordConfirm) => {
		if(password !== passwordConfirm){
			console.warn('确认密码不一致');
			return false;
		}
		return true;
	},
	// 昵称
	nameError: (str) => {
		const reg = /^([a-zA-Z]|[\u4e00-\u9fa5]|[\u0800-\u4e00]){1}([a-zA-Z0-9]|[\u4e00-\u9fa5]|[\u0800-\u4e00]){3,11}$/g;
		if(!reg.test(str)){
			console.warn('昵称格式不正确');
			return false;
		}
		return true;
	},
	// 手机号
	phoneError: (phonenumber) => {
		const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/g;
		if(!reg.test(phonenumber)){
			console.warn('手机号格式不正确');
			return false;
		}
		return true;
	},
	// Email
	emailError: (email) => {
		const reg = /^([a-zA-Z0-9]|[_])+@([a-zA-Z0-9]|[.])+$/g;
		if(!reg.test(email)){
			console.warn('邮箱格式不正确');
			return false;
		}
		return true;
	},
	// 中文
	cnError: (str, name, minstr, maxstr) => {
		const reg = /^([\u4e00-\u9fa5]){minstr,maxstr}$/g;
		if(!reg.test(str)){
			console.warn(`${name}只能输入中文`);
			return false;
		}
		return true;
	},
	// 字符
	strError: (str, name, minstr, maxstr) => {
		const reg = /^([a-zA-Z]){minstr,maxstr}$/g;
		if(!reg.test(str)){
			console.warn(`${name}只能输入字母`);
			return false;
		}
		return true;
	},
	// 数字
	numberError: (str, name, maxstr) => {
		const reg = /^([0-9]){,maxstr}$/g;
		if(!reg.test(str)){
			console.warn(`${name}只能输入数字`);
			return false;
		}
		return true;
	},
	// money
	moneyError: (str, name) => {
		const reg = /^([0-9]){1}\.([0-9]){1,}$/g;
		if(!reg.test(str)){
			console.warn(`${name}只能输入金额单位`);
			return false;
		}
		return true;
	},
	pointError: (flag) => {
		if(!flag){
			console.warn('滑动验证失败');
			return false;
		}
		return true;
	},
}

export default validate;