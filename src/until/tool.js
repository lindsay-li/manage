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