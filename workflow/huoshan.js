/*
tgchannel：https://t.me/ZhiYi_Script
github：https://github.com/ZhiYi-N/script
boxjs：https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/ZhiYi-N.boxjs.json
转载留个名字，谢谢
邀请码：AU6GW
谢谢
作者：执意ZhiYi-N
#看一个视频弹出金币获取ck
[mitm]
hostname = api3-normal-c-*.huoshan.com
#圈x
[rewrite local]
https://api3-normal-c-\w+.huoshan.com/hotsoon/flame/task_done/? url script-request-body https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/huoshan.js

https://api3-normal-c-\w+.huoshan.com/hotsoon/item/reaction/_play/? url script-request-body https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/huoshan.js

#loon
http-request https://api3-normal-c-\w+.huoshan.com/hotsoon/flame/task_done/? script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/huoshan.js, requires-body=true, timeout=10, tag=抖音火山版video

http-request https://api3-normal-c-\w+.huoshan.com/hotsoon/item/reaction/_play/? script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/huoshan.js, requires-body=true, timeout=10, tag=抖音火山版play

#surge
抖音火山版video = type=http-request,pattern=^https://api3-normal-c-\w+.huoshan.com/hotsoon/flame/task_done/?,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/huoshan.js,script-update-interval=0

抖音火山版play = type=http-request,pattern=^https://api3-normal-c-\w+.huoshan.com/hotsoon/item/reaction/_play/?,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/huoshan.js,script-update-interval=0
*/
const zhiyi = '抖音火山版'
const $ = Env(zhiyi)
const notify = $.isNode() ?require('./sendNotify') : '';
let status;
status = (status = ($.getval("hsstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const hsheaderArr = [],hsbodyArr = [],hsurlArr = [],playurlArr = [],playheaderArr = [],playbodyArr = []
let playurl = $.getdata('playurl')
let playheader = $.getdata('playheader')
let playbody = $.getdata('playbody')
let hsurl = $.getdata('hsurl')
let hsheader = $.getdata('hsheader')
let hsbody = $.getdata('hsbody')
let tz = ($.getval('tz') || '0');//0关闭通知，1默认开启
const invite=1;//新用户自动邀请，0关闭，1默认开启
const logs =0;//0为关闭日志，1为开启
var hour=''
var minute=''
let item_id,item_id_inv,adtonen,signtoken,double_token;
let sum = 0;
let no = 0;
let add_lottery_count = 0;
if ($.isNode()) {
   hour = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getHours();
   minute = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getMinutes();
}else{
   hour = (new Date()).getHours();
   minute = (new Date()).getMinutes();
}
//CK运行
let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie();
   $.done()
} 
if ($.isNode()) {
//   if (process.env.HSURL && process.env.HSURL.indexOf('#') > -1) {
//   hsurl = process.env.HSURL.split('#');
//   console.log(`您选择的是用"#"隔开\n`)
//  }
//  else if (process.env.HSURL && process.env.HSURL.indexOf('\n') > -1) {
//   hsurl = process.env.HSURL.split('\n');
//   console.log(`您选择的是用换行隔开\n`)
//  } else {
//   hsurl = process.env.HSURL.split()
//  };
//  if (process.env.HSHEADER && process.env.HSHEADER.indexOf('#') > -1) {
//   hsheader = process.env.HSHEADER.split('#');
//   console.log(`您选择的是用"#"隔开\n`)
//  }
//  else if (process.env.HSHEADER && process.env.HSHEADER.indexOf('\n') > -1) {
//   hsheader = process.env.HSHEADER.split('\n');
//   console.log(`您选择的是用换行隔开\n`)
//  } else {
//   hsheader = process.env.HSHEADER.split()
//  };
//  if (process.env.HSBODY && process.env.HSBODY.indexOf('#') > -1) {
//   hsbody = process.env.HSBODY.split('#');
//   console.log(`您选择的是用"#"隔开\n`)
//  }
//  else if (process.env.HSBODY && process.env.HSBODY.indexOf('\n') > -1) {
//   hsbody = process.env.HSBODY.split('\n');
//   console.log(`您选择的是用换行隔开\n`)
//  } else {
//   hsbody = process.env.HSBODY.split()
//  };
//if (process.env.PLAYURL && process.env.PLAYURL.indexOf('#') > -1) {
//   playurl = process.env.PLAYURL.split('#');
//   console.log(`您选择的是用"#"隔开\n`)
//  }
//  else if (process.env.PLAYURL && process.env.PLAYURL.indexOf('\n') > -1) {
//   playurl = process.env.PLAYURL.split('\n');
//   console.log(`您选择的是用换行隔开\n`)
//  } else {
//   playurl = process.env.PLAYURL.split()
//  };
//  if (process.env.PLAYHEADER && process.env.PLAYHEADER.indexOf('#') > -1) {
//   playheader = process.env.PLAYHEADER.split('#');
//   console.log(`您选择的是用"#"隔开\n`)
//  }
//  else if (process.env.PLAYHEADER && process.env.PLAYHEADER.indexOf('\n') > -1) {
//   playheader = process.env.PLAYHEADER.split('\n');
//   console.log(`您选择的是用换行隔开\n`)
//  } else {
//   playheader = process.env.PLAYHEADER.split()
//  };
//  if (process.env.PLAYBODY && process.env.PLAYBODY.indexOf('#') > -1) {
//   playbody = process.env.PLAYBODY.split('#');
//   console.log(`您选择的是用"#"隔开\n`)
//  }
//  else if (process.env.PLAYBODY && process.env.PLAYBODY.indexOf('\n') > -1) {
//   playbody = process.env.PLAYBODY.split('\n');
//   console.log(`您选择的是用换行隔开\n`)
//  } else {
//   playbody = process.env.PLAYBODY.split()
//  };

//    hsurlArr.push('你的ck')
//    hsheaderArr.push('你的ck')
//    hsbodyArr.push('你的ck')
//    playurlArr.push('你的ck')
//    playheaderArr.push('你的ck')
//    playbodyArr.push('你的ck')

    //--大号
    hsurlArr.push('settings_version=24&version_code=10.8.5&js_sdk_version=1.93.0.1&app_name=live_stream&vid=DF9365D8-4BDB-4CEB-AE89-F25308471FFC&device_id=1917963847872823&new_nav=0&channel=App%20Store&multi_login=1&aid=1112&hs_location_permission=1&screen_width=750&client_request_id=94cba2f807b3f3ff5109a4135c7636ee&openudid=c1108ef77de0f6dc41146faa2fb9c55cbbf29c38&live_sdk_version=10.8.5&minor_control_status=0&os_api=18&update_version_code=10080507&ac=WIFI&mccmnc=&os_version=14.4&ws_status=CONNECTED&jssdk_version=1.93.0.1&client_version_code=100805&device_platform=iphone&tab_mode=3&iid=3430894677544477&device_type=iPhone8,1&is_vcd=1&idfa=15AD1997-C544-4409-851A-35E97E7451AF')
    hsheaderArr.push('{"Content-Type":"application/x-www-form-urlencoded","x-Tt-Token":"00b46f250304bd8c42c0299877bf6c88da04e9930b569e68f39bd3a5082af1a66f68b610784e7052bf4e47ebed62849f6b47e447d865b6ce47846ad43251c35e9b19160012b12e36cf36d80380666ddf9840d2b8d5e80863074f163d6a5e22370309b-1.0.1","x-tt-trace-id":"00-63e95c640d6d060c1d831379c02e0458-63e95c640d6d060c-01","Tt-Tnc-Etag":"92681b4e-b013b580-d12282e0-894e338d","Tt-Tnc-Canary":"1","sdk-version":"2","Tt-Config-Version":"92681b4e-b013b580-d12282e0-894e338d","X-Tyhon":"vWxuXAoSGVk+EUptawdgIx94QWomCWxrbSZB6Q8=","X-SS-DP":"1112","Host":"api3-normal-c-lf.huoshan.com","Accept-Encoding":"gzip, deflate, br","X-Gorgon":"8404c0d7100091f59cae9702a2851a83e277af761608bcc9f3af","Content-Length":"98","passport-sdk-version":"5.12.1","User-Agent":"Ã§ÂÂ«Ã¥Â±Â±Ã¥Â°ÂÃ¨Â§ÂÃ©Â¢Â 10.8.5 rv:10080507 (iPhone; iOS 14.4; zh_CN) Cronet","X-SS-STUB":"3F5FC4DC12FF1FE15CB0E1A22EA3EE32","Connection":"keep-alive","X-Khronos":"1612288973","Cookie":"passport_csrf_token=e5a5eddd233a3fa8dab945cea4eaefa1; passport_csrf_token_default=e5a5eddd233a3fa8dab945cea4eaefa1; d_ticket=3aa793ee60e737d6a92c277747f2c4dd6a305; multi_sids=4503693283919473%3A2b27e6a813af4d8a8960e3e5cf604e69%7C93656548977%3Ab46f250304bd8c42c0299877bf6c88da; n_mh=tHU9IKvHFaiSsjfvw6xnIy4GFdtrO_DoNDiZiZKbCMw; sessionid=b46f250304bd8c42c0299877bf6c88da; sessionid_ss=b46f250304bd8c42c0299877bf6c88da; sid_guard=b46f250304bd8c42c0299877bf6c88da%7C1612098576%7C5184000%7CThu%2C+01-Apr-2021+13%3A09%3A36+GMT; sid_tt=b46f250304bd8c42c0299877bf6c88da; uid_tt=1786d569f63cf05625649ce70912956a; uid_tt_ss=1786d569f63cf05625649ce70912956a; install_id=3430894677544477; ttreq=1$3f299b1b95218448e7fe7881b5f040e16db8de7d; odin_tt=152565d8e0362cd51b7995f3819fdc0259328547904d82f0261bbe6bcfcf1592fa8a5d554171610a585288bc832483c6"}')
    hsbodyArr.push('token=WJgXmhtKAKjaQPogqb8ueU9EwFrBTpQdpbcDPWTVbtH4XoUdJ-hEO8FCO1jISmsgBmgt4cAIfrfPS30dNSM-vA==')
    playurlArr.push('https://api3-normal-c-lf.huoshan.com/hotsoon/item/reaction/_play/?js_sdk_version=1.93.0.1&client_request_id=ff2e6d20b848d8d2dfb43efba7b031fc&minor_control_status=0&ac=WIFI&tab_mode=3&')
    playheaderArr.push('{"Tt-Tnc-Etag":"92681b4e-b013b580-d12282e0-894e338d","X-Gorgon":"8404c06110004daee6b734cd5b3c24eb1af8779aad3b8248ff9e","User-Agent":"Ã§ÂÂ«Ã¥Â±Â±Ã¥Â°ÂÃ¨Â§ÂÃ©Â¢Â 10.8.5 rv:10080507 (iPhone; iOS 14.4; zh_CN) Cronet","X-SS-STUB":"F36F3B3C910A398059CF1EB9DAF8268F","Host":"api3-normal-c-lf.huoshan.com","Cookie":"passport_csrf_token=e5a5eddd233a3fa8dab945cea4eaefa1; passport_csrf_token_default=e5a5eddd233a3fa8dab945cea4eaefa1; d_ticket=3aa793ee60e737d6a92c277747f2c4dd6a305; multi_sids=4503693283919473%3A2b27e6a813af4d8a8960e3e5cf604e69%7C93656548977%3Ab46f250304bd8c42c0299877bf6c88da; n_mh=tHU9IKvHFaiSsjfvw6xnIy4GFdtrO_DoNDiZiZKbCMw; sessionid=b46f250304bd8c42c0299877bf6c88da; sessionid_ss=b46f250304bd8c42c0299877bf6c88da; sid_guard=b46f250304bd8c42c0299877bf6c88da%7C1612098576%7C5184000%7CThu%2C+01-Apr-2021+13%3A09%3A36+GMT; sid_tt=b46f250304bd8c42c0299877bf6c88da; uid_tt=1786d569f63cf05625649ce70912956a; uid_tt_ss=1786d569f63cf05625649ce70912956a; install_id=3430894677544477; ttreq=1$3f299b1b95218448e7fe7881b5f040e16db8de7d; odin_tt=152565d8e0362cd51b7995f3819fdc0259328547904d82f0261bbe6bcfcf1592fa8a5d554171610a585288bc832483c6","x-Tt-Token":"00b46f250304bd8c42c0299877bf6c88da04e9930b569e68f39bd3a5082af1a66f68b610784e7052bf4e47ebed62849f6b47e447d865b6ce47846ad43251c35e9b19160012b12e36cf36d80380666ddf9840d2b8d5e80863074f163d6a5e22370309b-1.0.1","x-tt-trace-id":"00-63e959740d6d060c1d83137b8eb40458-63e959740d6d060c-01","X-SS-DP":"1112","passport-sdk-version":"5.12.1","X-Khronos":"1612288972","Tt-Config-Version":"92681b4e-b013b580-d12282e0-894e338d","Content-Length":"155","Connection":"keep-alive","X-Tyhon":"303Kyypqvc4eae76S3/EtD8A5f0Gccj8TV7lZyA=","sdk-version":"2","Tt-Tnc-Canary":"1","x-common-params-v2":"settings_version=24&version_code=10.8.5&app_name=live_stream&vid=DF9365D8-4BDB-4CEB-AE89-F25308471FFC&device_id=1917963847872823&channel=App%20Store&new_nav=0&multi_login=1&aid=1112&hs_location_permission=1&screen_width=750&openudid=c1108ef77de0f6dc41146faa2fb9c55cbbf29c38&live_sdk_version=10.8.5&os_api=18&update_version_code=10080507&mccmnc=&os_version=14.4&ws_status=CONNECTED&jssdk_version=1.93.0.1&client_version_code=100805&device_platform=iphone&iid=3430894677544477&device_type=iPhone8,1&idfa=15AD1997-C544-4409-851A-35E97E7451AF&is_vcd=1","Content-Type":"application/x-www-form-urlencoded","Accept-Encoding":"gzip, deflate, br"}')
    playbodyArr.push('action_backtrace=recommend&channel_id=10020&is_city_near_by=0&is_dy_domain=0&is_follower=0&is_following=0&item_id=6924549257122958603&source=recommend_draw')

    //--小号
    hsurlArr.push('version_code=10.8.5&js_sdk_version=1.93.0.1&app_name=live_stream&vid=6930885F-B76B-4570-802C-CBE2C7BB045F&device_id=59870356682&new_nav=0&channel=App%20Store&multi_login=1&aid=1112&hs_location_permission=0&screen_width=828&client_request_id=58fc9d202b3f50c0e96635a492b000d7&openudid=9831320c49d5b2f00a141af0a9f91cdd8485b418&minor_control_status=0&live_sdk_version=10.8.5&os_api=18&update_version_code=10080507&ac=WIFI&mccmnc=46001&os_version=14.4&ws_status=FAILED&jssdk_version=1.93.0.1&client_version_code=100805&device_platform=iphone&tab_mode=3&device_type=iPhone11,8&is_vcd=1&settings_version=24&idfa=00000000-0000-0000-0000-000000000000')
    hsheaderArr.push('{"Content-Type":"application/x-www-form-urlencoded","x-Tt-Token":"0033d7fa33bbf2a480504d2f7e50822cd50197366ea5d6ef1854ba1e106d162bed5055257e3e2039cc30e1dccd5018023e9b3e12466cc5884179625bf94434fc30a44d70f0914edf018c353a4a109183f7db0dc6444b4d98715f019f801c5cb821682-1.0.1","x-tt-trace-id":"00-74d0515d09df08d24ca2977fcf610458-74d0515d09df08d2-01","Tt-Tnc-Etag":"148abce8-69743f02-e544d282-480decd9","Tt-Tnc-Canary":"0","sdk-version":"2","Tt-Config-Version":"148abce8-69743f02-e544d282-480decd9","X-Tyhon":"JF/GdfAjyGbnBMxo4wDKJ8Ag5FXlNvRulCzUtBc=","X-SS-DP":"1112","Host":"hotsoon-hl.snssdk.com","Accept-Encoding":"gzip, deflate, br","X-Gorgon":"8404a08f1000d0b4e71553e65c5d9184c77f0c4a1837de35c646","Content-Length":"116","passport-sdk-version":"5.12.1","User-Agent":"Ã§ÂÂ«Ã¥Â±Â±Ã¥Â°ÂÃ¨Â§ÂÃ©Â¢Â 10.8.5 rv:10080507 (iPhone; iOS 14.4; zh_CN) Cronet","X-SS-STUB":"D26E8A1CC4A632E7FEC1D126A14254D9","Connection":"keep-alive","X-Khronos":"1612572545","Cookie":"passport_csrf_token=0708def499e4c392850775d6ae034218; passport_csrf_token_default=0708def499e4c392850775d6ae034218; d_ticket=8d695823553700b9425914e9b8295e09c85fb; multi_sids=4503693283919473%3A33d7fa33bbf2a480504d2f7e50822cd5; n_mh=9Jyn1kzvR6SHKdgrUdFj6aAWtmBnE0xjzxi9YnWLLQ4; sessionid=33d7fa33bbf2a480504d2f7e50822cd5; sessionid_ss=33d7fa33bbf2a480504d2f7e50822cd5; sid_guard=33d7fa33bbf2a480504d2f7e50822cd5%7C1612572293%7C5184000%7CWed%2C+07-Apr-2021+00%3A44%3A53+GMT; sid_tt=33d7fa33bbf2a480504d2f7e50822cd5; uid_tt=10eca1f570dad7591cadfa891e35afae; uid_tt_ss=10eca1f570dad7591cadfa891e35afae; odin_tt=cefdc91e98d65e165c80be402c781bc4567cb18712e6c54b955632d9a0d9dc29bd74dd42460d023e8c0299203bc5c972edc1b408cf805468d7c0218e376c3b9b"}')
    hsbodyArr.push('token=WJganB1MAKTdSvskp7QlfUpGylrBT58ao70DPm7bYND9XYUQJexAPsRHOl7OeV8SeIvaANu0_DAEWpma5t6ldSY5YaX1aI38xEJHrtD--ac%3D')
    playurlArr.push('https://hotsoon-hl.snssdk.com/hotsoon/item/reaction/_play/?js_sdk_version=1.93.0.1&client_request_id=33cc6ad7a9fee371ed5e0c753e75f98f&minor_control_status=0&ac=WIFI&tab_mode=3&')
    playheaderArr.push('{"Tt-Tnc-Etag":"148abce8-69743f02-e544d282-480decd9","X-Gorgon":"8404a08310006a32d54867e8868e202e3586903f0f863de94dc7","User-Agent":"Ã§ÂÂ«Ã¥Â±Â±Ã¥Â°ÂÃ¨Â§ÂÃ©Â¢Â 10.8.5 rv:10080507 (iPhone; iOS 14.4; zh_CN) Cronet","X-SS-STUB":"E300419D2C38EABE9D897D06C67EE9B1","Host":"hotsoon-hl.snssdk.com","Cookie":"passport_csrf_token=0708def499e4c392850775d6ae034218; passport_csrf_token_default=0708def499e4c392850775d6ae034218; d_ticket=8d695823553700b9425914e9b8295e09c85fb; multi_sids=4503693283919473%3A33d7fa33bbf2a480504d2f7e50822cd5; n_mh=9Jyn1kzvR6SHKdgrUdFj6aAWtmBnE0xjzxi9YnWLLQ4; sessionid=33d7fa33bbf2a480504d2f7e50822cd5; sessionid_ss=33d7fa33bbf2a480504d2f7e50822cd5; sid_guard=33d7fa33bbf2a480504d2f7e50822cd5%7C1612572293%7C5184000%7CWed%2C+07-Apr-2021+00%3A44%3A53+GMT; sid_tt=33d7fa33bbf2a480504d2f7e50822cd5; uid_tt=10eca1f570dad7591cadfa891e35afae; uid_tt_ss=10eca1f570dad7591cadfa891e35afae; odin_tt=cefdc91e98d65e165c80be402c781bc4567cb18712e6c54b955632d9a0d9dc29bd74dd42460d023e8c0299203bc5c972edc1b408cf805468d7c0218e376c3b9b","x-Tt-Token":"0033d7fa33bbf2a480504d2f7e50822cd50197366ea5d6ef1854ba1e106d162bed5055257e3e2039cc30e1dccd5018023e9b3e12466cc5884179625bf94434fc30a44d70f0914edf018c353a4a109183f7db0dc6444b4d98715f019f801c5cb821682-1.0.1","x-tt-trace-id":"00-74d0488409df08d24ca52682f65e0458-74d0488409df08d2-01","X-SS-DP":"1112","passport-sdk-version":"5.12.1","X-Khronos":"1612572542","Tt-Config-Version":"148abce8-69743f02-e544d282-480decd9","Content-Length":"155","Connection":"keep-alive","X-Tyhon":"nUtXbGZcWX9xe11xdX9bPlZfdUxzSWV3AlNFBuU=","sdk-version":"2","Tt-Tnc-Canary":"0","x-common-params-v2":"settings_version=24&version_code=10.8.5&app_name=live_stream&vid=6930885F-B76B-4570-802C-CBE2C7BB045F&device_id=59870356682&channel=App%20Store&new_nav=0&multi_login=1&aid=1112&hs_location_permission=0&screen_width=828&openudid=9831320c49d5b2f00a141af0a9f91cdd8485b418&live_sdk_version=10.8.5&os_api=18&update_version_code=10080507&mccmnc=46001&os_version=14.4&ws_status=FAILED&jssdk_version=1.93.0.1&client_version_code=100805&device_platform=iphone&device_type=iPhone11,8&idfa=00000000-0000-0000-0000-000000000000&is_vcd=1","Content-Type":"application/x-www-form-urlencoded","Accept-Encoding":"gzip, deflate, br"}')
    playbodyArr.push('action_backtrace=recommend&channel_id=10020&is_city_near_by=0&is_dy_domain=0&is_follower=0&is_following=0&item_id=6925698617705630991&source=recommend_draw')

    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    hsurlArr.push($.getdata('hsurl'))
    hsheaderArr.push($.getdata('hsheader'))
    hsbodyArr.push($.getdata('hsbody'))
    playurlArr.push($.getdata('playurl'))
    playheaderArr.push($.getdata('playheader'))
    playbodyArr.push($.getdata('playbody'))
    let hscount = ($.getval('hscount') || '1');
  for (let i = 2; i <= hscount; i++) {
	hsurlArr.push($.getdata(`hsurl${i}`))
    hsheaderArr.push($.getdata(`hsheader${i}`))
    hsbodyArr.push($.getdata(`hsbody${i}`))
    playurlArr.push($.getdata(`playurl${i}`))
playheaderArr.push($.getdata(`playheader${i}`))
    playbodyArr.push($.getdata(`playbody${i}`))
  }
}
!(async () => {
if (!hsheaderArr[0] && !hsbodyArr[0] && !hsurlArr[0]) {
    $.msg($.name, '【提示】请先获取抖音火山版一cookie')
    return;
  }

  //==============自定义循环==========================
    if ($.isNode()) {
      while(true){

   console.log(`------------- 共${hsheaderArr.length}个账号----------------\n`)
  for (let i = 0; i < hsheaderArr.length; i++) {
    if (hsheaderArr[i]) {
      message = ''
      note = ''
      hsurl = hsurlArr[i];
      hsheader = hsheaderArr[i];
      hsbody = hsbodyArr[i];
      playurl = playurlArr[i];
      playheader = playheaderArr[i];
      playbody = playbodyArr[i];
      $.index = i + 1;
      console.log(`\n开始【抖音火山版${$.index}】`)
      //await ck()
      await app_alert_check()
      await device_register()
      await userinfo()
      await gettoken()
      await sign_in()
      //await ad()
      await hotsoonfeed()
      await control()
      await lottery_main()
      await lottery()
      await showmsg()
  }
 }

     console.log(`===本次任务执行完毕，休息1分钟-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  ===\n`)
     await $.wait(60000)

      }
    }else{

   console.log(`------------- 共${hsheaderArr.length}个账号----------------\n`)
  for (let i = 0; i < hsheaderArr.length; i++) {
    if (hsheaderArr[i]) {
      message = ''
      note = ''
      hsurl = hsurlArr[i];
      hsheader = hsheaderArr[i];
      hsbody = hsbodyArr[i];
      playurl = playurlArr[i];
      playheader = playheaderArr[i];
      playbody = playbodyArr[i];
      $.index = i + 1;
      console.log(`\n开始【抖音火山版${$.index}】`)
      //await ck()
      await app_alert_check()
      await device_register()
      await userinfo()
      await gettoken()
      await sign_in()
      //await ad()
      await hotsoonfeed()
      await control()
      await lottery_main()
      await lottery()
      await showmsg()
  }
 }

  }
   //==============自定义循环==========================


})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


function GetCookie() {
if($request&&$request.url.indexOf("task_done")>=0) {
   const hsurl = $request.url.split('?')[1]
   if(hsurl)     $.setdata(hsurl,`hsurl${status}`)
   $.log(`[${zhiyi}] 获取hsurl请求: 成功,hsurl: ${hsurl}`)
   $.msg(`hsurl${status}: 成功🎉`, ``)
   const hsheader = JSON.stringify($request.headers)+''
    if(hsheader)    $.setdata(hsheader,`hsheader${status}`)
    $.log(`[${zhiyi}] 获取hsheader请求: 成功,hsheader: ${hsheader}`)
    $.msg(`hsheader${status}: 成功🎉`, ``)
   const hsbody = $request.body
    if(hsbody)    $.setdata(hsbody,`hsbody${status}`)
    $.log(`[${zhiyi}] 获取hsbody请求: 成功,hsbody: ${hsbody}`)
    $.msg(`hsbody${status}: 成功🎉`, ``)
}


if($request&&$request.url.indexOf("reaction/_play")>=0) {
   const playurl = $request.url
   if(playurl)     $.setdata(playurl,`playurl${status}`)
   $.log(`[${zhiyi}] 获取playurl请求: 成功,playurl: ${playurl}`)
   $.msg(`playurl${status}: 成功🎉`, ``)
   const playheader =JSON.stringify($request.headers)+''
    if(playheader)
$.setdata(playheader,`playheader${status}`)
    $.log(`[${zhiyi}] 获取playheader请求: 成功,playheader: ${playheader}`)
    $.msg(`playheader${status}: 成功🎉`, ``)
   const playbody = $request.body
    if(playbody)    $.setdata(playbody,`playbody${status}`)
    $.log(`[${zhiyi}] 获取playbody请求: 成功,playbody: ${playbody}`)
    $.msg(`playbody${status}: 成功🎉`, ``)
}
}
//control
async function control(){
   /*for(i = 1;i<3;i++){
    let delay = Math.random()*10000
    $.log('⏰本次延时'+Math.round(delay/1000)+'秒')
    await sleep(delay)
    await video_rewards()
}*/
for(let i = 0;i <= 4;i++){
   item_id_inv = item_id[i]
   $.log(item_id_inv)
   let x = Math.random()
   let delay = x > 0.5? x*60000 : (x+0.5)*30000
   console.log('⏰本次延迟'+Math.round(delay/1000)+'秒')
   await sleep(delay)
   await play_video()
   //await video_rewards()
}
}
//app_alert_check
async function app_alert_check(){
let new_time = Math.round(new Date().getTime()/1000).toString();
	hsheader = hsheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
let iid = hsurl.match(/iid=\d+/)
let idfa = hsurl.match(/idfa=\d+-\d+-\w+-\w+-\w+/)
let vid = hsurl.match(/vid=\w+-\w+-\w+-\w+-\w+/)
let device_id = hsurl.match(/device_id=\d+/)
let mccmnc = hsurl.match(/mccmnc=\d+/)+''
let mcc_mnc = mccmnc.replace("mccmnc",'mcc_mnc')
let aid = hsurl.match(/aid=\d+/)
let check_url = 'https://ichannel.snssdk.com/service/2/app_alert_check/?'+iid+'&ac=WIFI&timezone=8&app_name=live_stream&channel=App%20Store&device_platform=iphone&'+idfa+'&'+vid+'&is_upgrade_user=0&app_verison_minor=10080507&version_code=10.8.5&'+device_id+'&os_version=13.3&'+aid+'&'+mcc_mnc
 return new Promise((resolve) => {
    let app_alert_check_url = {
   		url: check_url,
        headers: JSON.parse(hsheader)
    	}
   $.get(app_alert_check_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        message += '🔔模拟启动 '
        console.log(result.message)
        if(result.data.is_activated == 1){
        console.log('当前状态:活跃\n')
        message += '当前状态:活跃\n'
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
  }
//false no function
async function device_register(){
let new_time = Math.round(new Date().getTime()/1000).toString();
	hsheader = hsheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
 return new Promise((resolve) => {
    let device_register_url = {
   		url: `https://log-lq.snssdk.com/service/2/device_register/?tt_data=a&${hsurl}`,
        headers: JSON.parse(hsheader),
        //body: `__hideErrorToast=1&task_name=check_in&token=${signtoken}`
    	}
   $.post(device_register_url,async(error, response, data) =>{
    try{
        //const result = JSON.parse(data)
        if(logs)$.log(data)
        message += '🔔服务注册 '
        console.log('🎈'+'注册成功\n')
        message += '🎈'+'注册成功\n'
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
  }
//userinfo
async function userinfo(){
let new_time = Math.round(new Date().getTime()/1000).toString();
	hsheader = hsheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
 return new Promise((resolve) => {
    let userinfo_url = {
   		url: `https://api3-normal-c-lq.huoshan.com/hotsoon/flame/user_flame_info/?${hsurl}`,
        headers: JSON.parse(hsheader)
    	}
   $.get(userinfo_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs) $.log(data)
        message += '🔔用户信息 '
        if(result.status_code == 0){
        console.log('现有火苗：'+result.data.flame_left+'可兑换为：'+((result.data.flame_left/30000).toFixed(1))+'元 现有余额：'+result.data.can_with_draw_money+'元')
        console.log('今日领取火苗'+result.data.td_flame_count)
        message += '今日领取火苗'+result.data.td_flame_count+' 现有火苗'+result.data.flame_left+' 可兑换为'+((result.data.flame_left/30000).toFixed(1))+'元 现有余额'+result.data.can_with_draw_money+'元\n'
        }else{
        console.log('👀我也不知道\n')
        message += '👀我也不知道\n'
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
  }
//gettoken
async function gettoken(){
let new_time = Math.round(new Date().getTime()/1000).toString();
	hsheader = hsheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
 return new Promise((resolve) => {
    let gettoken_url = {
   		url: `https://api3-normal-c-lq.huoshan.com/hotsoon/janus/flame/management/panel/?${hsurl}`,
        headers: JSON.parse(hsheader)
    	}
   $.get(gettoken_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        message += '🔔获取token '
        if(result.status_code == 0){
        var ads = result.data.task_info.data.task_list.find(item => item.task_name === 'ad');
        var sign = result.data.task_info.data.task_list.find(item => item.task_name === 'check_in')
        message += '🎈获取token成功\n'
        if(ads){
        adtoken = ads.ad_task.token
        console.log('🎈'+'获取成功，广告token='+adtoken)
        await ad();
        }
        signtoken = sign.check_in_task.token
        console.log('🎈'+'获取成功，签到token='+signtoken)
        }else{
        console.log('👀我也不知道\n')
        message += '👀我也不知道\n'
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
  }
//sign_in
async function sign_in(){
let new_time = Math.round(new Date().getTime()/1000).toString();
	hsheader = hsheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
 return new Promise((resolve) => {
    let sign_inurl = {
   		url: `https://api3-normal-c-lq.huoshan.com/hotsoon/flame/task_system/task_done/?${hsurl}`,
        headers: JSON.parse(hsheader),
        body: `__hideErrorToast=1&task_name=check_in&token=${signtoken}`
    	}
   $.post(sign_inurl,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        message += '🔔每日签到 '
        if(result.status_code == 0){
        console.log('🎈'+'签到成功，获得'+result.data.task_done_award.flame_amount+'\n')
        message += '🎈'+'签到成功，获得'+result.data.task_done_award.flame_amount+'\n'
        }else{
        console.log('👀'+result.data.prompts+"\n")
        message += '👀'+result.data.prompts+"\n"
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
  }
//ad
async function ad(){
let new_time = Math.round(new Date().getTime()/1000).toString();
	hsheader = hsheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
 return new Promise((resolve) => {
    let ad_url = {
   		url: `https://api3-normal-c-lq.huoshan.com/hotsoon/flame/task_system/task_done/?${hsurl}`,
    	headers: JSON.parse(hsheader),
     body: `__hideErrorToast=1&task_name=ad&token=${adtoken}`
    	}
   $.post(ad_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        message += '🔔广告赢火苗 '
        if(result.status_code == 0){
        console.log('🎈成功，获得'+result.data.task_done_award.flame_amount+'\n')
        message += '🎈成功，获得'+result.data.task_done_award.flame_amount+'\n'
        }else{
        console.log('👀'+result.data.prompts+'\n')
        message += '👀'+result.data.prompts+'\n'
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
  }
async function ck(){
  $.log('hsurl:'+hsurl)
  $.log('hsbody:'+hsbody)
  $.log('hsheaser:'+hsheader)
  $.log('hsheaser:'+hsheader.replace("{",`"{x-common-params-v2": "${hsurl}"`))
}
//hotsoonfeed
async function hotsoonfeed(){
let new_time = Math.round(new Date().getTime()/1000).toString();
	playheader = playheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
 return new Promise((resolve) => {
    let hotsoonfeed_url = {
   		url: 'https://api3-normal-c-lf.huoshan.com/hotsoon/feed/?type=video&action=refresh',
    	headers: JSON.parse(playheader),
    	}
   $.get(hotsoonfeed_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.status_code == 0){
        console.log('🎈视频列表获取成功！即将开始播放前5个'+'\n')
        //message += '🎈视频列表获取成功！即将开始播放前2个'+'\n'
        let item = data.match(/692\d{16}/g)
        item_id = item.distinct();
}
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
  }
//play_video
async function play_video(){
let new_time = Math.round(new Date().getTime()/1000).toString();
	playheader = playheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
let newplaybody = playbody.replace(/\d{19}/,`${item_id_inv}`)
 return new Promise((resolve) => {
    let play_video_url = {
     url: playurl,
    	headers: JSON.parse(playheader),
     body: newplaybody
}
   $.post(play_video_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        //await sleep(30000);
        if(result.status_code == 0){
        console.log('🎈视频播放成功！play_count=：'+result.data.play_count)
        no = no + 1;
        await video_rewards()
        //message = `🎈视频播放成功${no}次，获取奖励${no}次\n`
        }else{
        console.log('视频播放失败'+result.extra.details+'\n')
}
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
  }

//video_rewards
async function video_rewards(){
	let new_time = Math.round(new Date().getTime()/1000).toString();
	hsheader = hsheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
 return new Promise((resolve) => {
    let video_rewards_url = {
   		url: `https://api3-normal-c-lq.huoshan.com/hotsoon/flame/task_done/?${hsurl}`,
    	headers: JSON.parse(hsheader),
    	body: hsbody
    	}
   $.post(video_rewards_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.status_code == 0){
	    let token = result.data.next_token.match(/WJ.*?(?==)/)+''.replace("%3D","=")
	    let newhsbody = hsbody.replace(/WJ.*?(?==)/,`${token}`)
         let _hsbody = newhsbody.replace("%3D","=")
         hsbody = _hsbody
         $.setdata(_hsbody,`hsbody${status}`)
         //$.log(hsbody)
         $.log(token)
         $.log(_hsbody)
        let coins = result.data.flame_amount
        console.log(`🎈第${no}次获得火苗成功：`+coins+'\n')
        sum = sum + coins
        note = `🔔看视频奖励 视频播放成功${no}次，获取奖励${no}次,共获得火苗成功：${sum}\n`
        }else{
        console.log('👀'+'我也不知道\n')
        //message += '👀'+"我也不知道\n"
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
}
//lottery_main
async function lottery_main(){
let new_time = Math.round(new Date().getTime()/1000).toString();
	hsheader = hsheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
 return new Promise((resolve) => {
    let lottery_main_url = {
   		url: `https://api3-normal-c-lq.huoshan.com/hotsoon/commerce/lottery/main/?${hsurl}$activity_id=1`,
        headers: JSON.parse(hsheader),
    	}
   $.get(lottery_main_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.status_code == 0){
        console.log('🎈'+'加载转盘成功\n')
        var task = result.data.tasks.find(item => item.task_id === 2);
        console.log('增加抽奖次数'+task.task_current+'/'+task.task_total+'\n')
        if(task.task_current < task.task_total){
        add_lottery_count = 1;
}
        }else{
        console.log('👀'+"我也不知道\n")
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
  }
//lottery
async function lottery(){
let new_time = Math.round(new Date().getTime()/1000).toString();
	hsheader = hsheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
 return new Promise((resolve) => {
    let lottery_url = {
   		url: `https://api3-normal-c-lq.huoshan.com/hotsoon/commerce/lottery/?${hsurl}$activity_id=1`,
        headers: JSON.parse(hsheader),
    	}
   $.get(lottery_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs) $.log(data)
        if(result.data.gift){
        message += '🔔抽奖ing'
        console.log('🎈'+'抽奖成功'+result.data.gift.name+'\n')
        message += '🎈'+'抽奖成功'+result.data.gift.name+'\n'
        if(result.data.token){
        if(result.data.button.title.indexOf('看视频领取奖励')){
        console.log('正在领取奖励...\n')
        }
        if(result.data.button.title.indexOf('翻倍')){
        console.log('正在领取翻倍奖励...\n')
        double_token = result.data.token
        await sleep(15000);
        await task_ack()
       }
        }
        }
        else{
        if(result.data.alert.indexOf('次数已用完') && add_lottery_count == 1){
        console.log('抽奖次数已用完，正在看广告增加次数')
        //message += '抽奖次数已用完，正在看广告增加次数'
        await sleep(15000)
        if(add = 1){
        await add_lottery()
   }
       }
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
  }
//add_lottery
async function add_lottery(){
	let new_time = Math.round(new Date().getTime()/1000).toString();
	hsheader = hsheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
 return new Promise((resolve) => {
    let add_lottery_url = {
   		url: `https://api3-normal-c-lq.huoshan.com/hotsoon/commerce/task/ack/?${hsurl}`,
    	headers: JSON.parse(hsheader),
    	body: `task_done_cnt=1&task_id=2`
    	}
   $.post(add_lottery_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.status_code == 0){
	   console.log('增加抽奖次数成功,再次请求抽奖\n')
        if(add_lottery_count == 1){
        await lottery()
        }
        }else{
        console.log('👀'+'我也不知道\n')
        //message += '👀'+"我也不知道\n"
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
}
//task_ack
async function task_ack(){
	let new_time = Math.round(new Date().getTime()/1000).toString();
	hsheader = hsheader.replace(/X-Khronos":"\d{10}/,`X-Khronos":"${new_time}`)
 return new Promise((resolve) => {
    let task_ack_url = {
   		url: `https://api3-normal-c-lq.huoshan.com/hotsoon/commerce/task/ack/?${hsurl}`,
    	headers: JSON.parse(hsheader),
    	body: `task_done_cnt=1&task_id=1002&token=${double_token}`
    	}
   $.post(task_ack_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.status_code == 0){
	   console.log('获取奖励成功'+result.data.name)
        //message += '获取奖励成功'+result.data.name
        }else{
        console.log('👀'+'我也不知道\n')
        //message += '👀'+"我也不知道\n"
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
}
//sleep
function sleep(time){
	 return new Promise((resolve) => setTimeout(resolve,time));
}
//reduce
Array.prototype.distinct = function (){
 var arr = this,
  result = [],
  len = arr.length;
 arr.forEach(function(v, i ,arr){  //这里利用map，filter方法也可以实现
  var bool = arr.indexOf(v,i+1);  //从传入参数的下一个索引值开始寻找是否存在重复
  if(bool === -1){
   result.push(v);
  }
 })
 return result;
};
//showmsg
async function showmsg(){
if(tz==1){
    $.log(message+note)
    if ($.isNode()){
    if ((hour == 12 && minute <= 20) || (hour == 23 && minute >= 40)) {
       await notify.sendNotify($.name,message+note)
     }
   }else{
     $.log(message+note)
    //if ((hour == 12 && minute <= 20) || (hour == 23 && minute >= 40)) {
       $.msg(zhiyi,'',message+note)
//}
}
   }else{
       $.log(message+note)
    }
 }
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}