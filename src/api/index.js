/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = 'http://localhost:8000'
//const BASE_URL = '/api'
//0、注册

export const reqRegister = (username, password,phone,name,address,certificates,code) => ajax(BASE_URL+'/enterprise/register', {username, password,phone,name,address,certificates,code}, 'POST')
// 1、用户名密码登陆
export const reqPwdLogin = (username, password,time) => ajax(BASE_URL+'/enterprise/login', {username, password,time}, 'POST');
// 2、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL+'/enterprise/sendCode', [phone],'POST');

//3、获取招标对象
export const reqTenderingList = (currentPage,pageSize,{query}) =>{return ajax(`${BASE_URL}/tendering/${currentPage}/${pageSize}`,{query},'GET','application/x-www-form-urlencoded')};
//4、修改用户信息
export const reqModifyEnterprise = (id,name,address,phone,certificates) =>{return ajax(`${BASE_URL}/enterprise/modify`,{id,name,address,phone,certificates},'PUT')};
//5、插入招标信息4
export const reqInsertTendering= (title,content) =>{return ajax(`${BASE_URL}/tendering/insert`,{title,content},'POST')};
//6、获取竞标对象
export const reqBidsList = (currentPage,pageSize,{query}) =>{return ajax(`${BASE_URL}/bid/${currentPage}/${pageSize}`,{query},'GET','application/x-www-form-urlencoded')};
//7、删除招标信息
export const reqDeleteTendering= (tid) =>{return ajax(`${BASE_URL}/tendering/${tid}`,tid,'POST')};



// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASE_URL+'/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL+'/search_shops', {geohash, keyword})


// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL+'/logout')


/**
 * 发送ajax请求，不需要代理拦截，所以不需要/api开头
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const  reqShopGoods = () => ajax('/goods')


