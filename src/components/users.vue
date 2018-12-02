<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>用戶名：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>手機號：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>創建時間：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>城市：</span>
            <input type="text" name="address">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="contant">
        <ul>
            <li>
                <div class="titles">會員編號</div>
                <div class="data1">1</div>
                <div class="titles">創建時間</div>
                <div class="data2">1929.1.2</div>
            </li>
            <li>
                <div class="titles">用戶姓名</div>
                <div class="data1">1</div>
                <div class="titles">登入IP</div>
                <div class="data2">1929.1.2</div>
            </li>
            <li>
                <div class="titles">性別</div>
                <div class="data1">1</div>
                <div class="titles">登入次數</div>
                <div class="data2">1929.1.2</div>
            </li>
            <li>
                <div class="titles">生日</div>
                <div class="data1">1</div>
                <div class="titles">最後登入時間</div>
                <div class="data2">1929.1.2</div>
            </li>
            <li>
                <div class="titles">身份驗證</div>
                <div class="data1">1</div>
                <div class="titles"></div>
                <div class="data2"></div>
            </li>
            <li>
                <div class="titles">手機號碼</div>
                <div class="data1">154646545</div>
                <div class="titles">粉絲數</div>
                <div class="data2">2</div>
            </li>
            <li>
                <div class="titles">電子郵件</div>
                <div class="data1"></div>
                <div class="titles">追蹤數</div>
                <div class="data2">1929.1.2</div>
            </li>
            <li>
                <div class="titles">城市</div>
                <div class="data1">1</div>
                <div class="titles">點贊次數</div>
                <div class="data2">1929.1.2</div>
            </li>
            <li>
                <div class="titles">地址</div>
                <div class="data1">1</div>
                <div class="titles">我的收藏</div>
                <div class="data2">1929.1.2</div>
            </li>
            <li>
                <div class="titles">錢包餘額</div>
                <div class="data1">32</div>
                <div class="titles"></div>
                <div class="data2"></div>
            </li>
            <li>
                <div class="titles">封禁狀態</div>
                <div class="data1">禁止留言</div>
                <div class="titles">封禁原因</div>
                <div class="data2">1</div>
            </li>
            <li style="border-bottom:1px solid #666">
                <div class="titles">封禁解時間</div>
                <div class="data1">1</div>
                <div class="titles">創建時間</div>
                <div class="data2">2019.1.2</div>
            </li>
        </ul>
    </div>
</div>    
</template>
<script>
export default {
    
}
</script>
<style scoped>

ul li{
    width: 1100px;
    display: flex;
    border: 1px solid #666;
    border-bottom: 0;
    align-items: center;
    height: inherit;
}
li .titles{
    width:180px;
    background-color:#009688;
    color: #fff;
}
li .data1{
    width: 280px; 
}
li .data2{
    width:460px; 
}
li .data1,
li .data2,
li .titles{
    height: 46px;
    line-height: 46px;
    text-align: center;
}
</style>
