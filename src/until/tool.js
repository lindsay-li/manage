export  function changeTime(time){
    var date = new Date(time);
    var Y = date.getFullYear();
    var M = date.getMonth() + 1 >=10?date.getMonth() + 1:'0'+(date.getMonth() + 1);
    var D = date.getDate() >=10?date.getDate():'0'+date.getDate();
    var h = date.getHours() >=10?date.getHours():'0'+date.getHours();
    var m = date.getMinutes() >=10?date.getMinutes():'0' + date.getMinutes();
    return `${Y}-${M}-${D} ${h}:${m}`;
};
export function times(time){
    var date = new Date(time);
    var Y = date.getFullYear();
    var M = date.getMonth() + 1 >=10?date.getMonth() + 1:'0'+(date.getMonth() + 1);
    var D = date.getDate() >=10?date.getDate():'0'+date.getDate();
    return `${Y}-${M}-${D}`;
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