export  function changeTime(time){
    var date = new Date(time);
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var D = date.getDate();
    var h = date.getHours() >=10?date.getHours():'0'+date.getHours();
    var m = date.getMinutes() >=10?date.getMinutes():'0' + date.getMinutes();
    return `${Y}-${M}-${D} ${h}:${m}`;
}