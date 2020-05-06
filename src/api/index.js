/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'

const BASE_URL = 'https://www.ychstudy.cn';
//0、注册

export const reqRegister = (data) => ajax(BASE_URL + '/enterprise/register', data, 'POST');
// 1、用户名密码登陆
export const reqPwdLogin = (name, password, time) => ajax(BASE_URL + '/enterprise/login', {
  name,
  password,
  time
}, 'POST');
// 2、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/enterprise/sendCode', [phone], 'POST');

//3、获取招标对象
export const reqTenderingList = (currentPage, pageSize, data) => {
  return ajax(`${BASE_URL}/tendering/${currentPage}/${pageSize}`, data, 'POST')
};
//4、修改用户信息
export const reqModifyEnterprise = (data) => {
  return ajax(`${BASE_URL}/enterprise/modify`, data, 'PUT')
};
//5、插入招标信息4
export const reqInsertTendering = (data) => {
  return ajax(`${BASE_URL}/tendering/insert`, data, 'POST')
};
//6、获取竞标对象
export const reqBidsList = (currentPage, pageSize, data) => {
  return ajax(`${BASE_URL}/bid/${currentPage}/${pageSize}`, data, 'POST')
};
//7、删除招标信息tebi
export const reqDeleteTendering = (tid) => {
  return ajax(`${BASE_URL}/tendering/${tid}`, tid, 'POST')
};

export const reqDeleteBid = (bid) => {
  return ajax(`${BASE_URL}/bid/${bid}`, bid, 'POST')
};

export const reqTenderingInfo = (tid) => {
  return ajax(`${BASE_URL}/tendering/${tid}`, tid, 'GET')
};

export const getReportInfo = (page, pageSize, data) => {
  return ajax(`${BASE_URL}/report/${page}/${pageSize}`, data, 'POST')
};

export const insertReport = (data) => {
  return ajax(`${BASE_URL}/report/insert`, data, 'POST')
};

export const updateReport = (data) => {
  return ajax(`${BASE_URL}/report/modify`, data, 'PUT')
};

export const getBidInfo = (page, pageSize, data) => {
  return ajax(`${BASE_URL}/bid/${page}/${pageSize}`, data, 'POST')
};
export const getBidDetail = (id) => {
  return ajax(`${BASE_URL}/bid/${id}`)
};
export const deleteBid = (id) => {
  return ajax(`${BASE_URL}/bid/${id}`, null, 'POST')
};
export const insertBid = (data) => {
  return ajax(`${BASE_URL}/bid/insert`, data, 'POST')
};
export const updateBid = (data) => {
  return ajax(`${BASE_URL}/bid/modify`, data, 'PUT')
};

export const getTenderInfo = (page, pageSize, data) => {
  return ajax(`${BASE_URL}/tendering/${page}/${pageSize}`, data, 'POST')
};
export const getTenderDetail = (id) => {
  return ajax(`${BASE_URL}/tendering/${id}`)
};
export const deleteTender = (id) => {
  return ajax(`${BASE_URL}/tendering/${id}`, null, 'POST')
};
export const updateTender = (data) => {
  return ajax(`${BASE_URL}/tendering/modify`, data, 'PUT')
};

export const getEnterInfo = (page, pageSize, data) => {
  return ajax(`${BASE_URL}/enterprise/${page}/${pageSize}`, data, 'POST')
};
export const getEnterDetail = (id) => {
  return ajax(`${BASE_URL}/enterprise/info/${id}`)
};
export const deleteEnter = (id) => {
  return ajax(`${BASE_URL}/enterprise/${id}`, null, 'POST')
};
// 管理员密码登陆
export const adminPwdLogin = (username, password, time) => ajax(BASE_URL + '/admin/login', {
  username,
  password,
  time
}, 'POST');
export const adminChangePass = (data) => ajax(BASE_URL + '/admin/changePassword', data, 'PUT');

export const sendEmail = (data) => ajax(BASE_URL + '/open/sendEmail', data, 'POST', 'application/x-www-form-urlencoded');

export const getExcellentInfo = (page, pageSize) => {
  return ajax(`${BASE_URL}/excellent/bid/${page}/${pageSize}`, {}, 'POST')
};

export const getExcellentTenderingInfo = (page, pageSize) => {
  return ajax(`${BASE_URL}/excellent/tendering/${page}/${pageSize}`, {}, 'POST')
};
