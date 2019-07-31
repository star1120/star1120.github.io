/**
 * Created by yuchuang on 2017/6/29.
 */
//import Base64 from './base64'
import md5 from './md5'
import DES from './3DES'
import Base64 from './base64'
export default (body,status)=>{
  if(status){
    var tokens=localStorage.getItem('com.digitalchina.webapp.back.url.storage.key');
  }
  //判断是否登录
  const city={"wuhou":"510107","com.zaichengdu":"510100","com.z012.chengdu.sc":"510100","YunShangGuiZhou":"520000","com.cqdigitalchina.zaichongqing":"500000","com.z012.chongqing.sc":"500000","liangjiang":"500999"};
  let ua=navigator.userAgent.toLowerCase().split('/');
  ua=(ua[ua.length-2]?ua[ua.length-2]:"510100");
  let appid = "IOS-0512-0002";
  let appkey = "fbe938c4bfe0a7cda1dcae7c85c7f83e37736207d637dc1c";
  let base =new Base64();
  let sign = DES.encrypt_string(appkey, md5.hex_md5(base.encode(appid + JSON.stringify(body))));
  let req = {
    "body": body,
    "head": {
      "sign": sign,
      "siteid": city[ua],//ua取App城市的siteId
      "appid":appid,
      "version": "2.0"
    }
  };
  if(tokens){
    req.head["accessTicket"]=tokens;
  }
  return JSON.stringify(req);
}
