export  function changeTime(time){
    var date  = new Date(time);
    if(getBrowserInfo().indexOf('safari') >=0){
      date = new Date(time.substring(0,10).replace(/\-/g, "/"));
    }
    var Y = date.getFullYear();
    var M = date.getMonth() + 1 >=10?date.getMonth() + 1:'0'+(date.getMonth() + 1);
    var D = date.getDate() >=10?date.getDate():'0'+date.getDate();
    var h = date.getHours() >=10?date.getHours():'0'+date.getHours();
    var m = date.getMinutes() >=10?date.getMinutes():'0' + date.getMinutes();
    var str = '';
    str += Y+'-'+M+'-'+D+' '+h+':'+m;
    return str;
};
export function times(time){
    var date  = new Date(time);
    if(getBrowserInfo().indexOf('safari') >=0){
      date = new Date(time.substring(0,10).replace(/\-/g, "/"));
    }
    var Y = date.getFullYear();
    var M = date.getMonth() + 1 >=10?date.getMonth() + 1:'0'+(date.getMonth() + 1);
    var D = date.getDate() >=10?date.getDate():'0'+date.getDate();
    var str = '';
    str += Y+'-'+M +'-'+D;
    return str
}
/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
    if (document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler)
        }
      }
    }
  })()
  
  /**
   * @description 解绑事件 off(element, event, handler)
   */
  export const off = (function () {
    if (document.removeEventListener) {
      return function (element, event, handler) {
        if (element && event) {
          element.removeEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event) {
          element.detachEvent('on' + event, handler)
        }
      }
    }
  })()

  function getBrowserInfo(){
    var agent = navigator.userAgent.toLowerCase() ;

    var regStr_ie = /msie [\d.]+;/gi ;
    var regStr_ff = /firefox\/[\d.]+/gi
    var regStr_chrome = /chrome/gi ;
    var regStr_saf = /safari/gi ;
    
    //IE
    if(agent.indexOf("msie") > 0)
    {
        return agent.match(regStr_ie) ;
    }

    //firefox
    if(agent.indexOf("firefox") > 0)
    {
        return agent.match(regStr_ff) ;
    }

    //Chrome
    if(agent.indexOf("chrome") > 0)
    {
        return agent.match(regStr_chrome) ;
    }

    //Safari
    if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
    {
        return agent.match(regStr_saf) ;
    }

}