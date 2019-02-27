<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 50px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="近三十日訂單數"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="近三十日訂單金額"/>
        </Card>
      </i-col>
    </Row>
    <!-- <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row> -->
  </div>
</template>

<script>
import InforCard from '../pages/components/info-card'
import CountTo from '../pages/components/count-to'
import { ChartPie, ChartBar } from '../pages/components/charts'
// import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    // Example
  },
  data () {
    return {
      inforCardData: [
        { title: '今日訂單數', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '今日訂單金額', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '待出貨訂單', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '平均出貨天數', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '總商品數', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '零庫存數', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        // { value: 9, name: '總訂單數' },
        // { value: 7, name: 'APP訂單數' },
        // { value: 2, name: 'web訂單數' }
      ],
      barData: {
        // '總金額':62847,
        // APP: 13253,
        // WEB: 34235,
        // '平均金額':10414,
        // 'APP平均': 26321,
        // 'WEB平均': 12340
      }
    }
  },
  created () {
      this.getDatas()
      this.getList()
  },
  methods:{
    getDatas(){
      var data = {}
      this.$http('keyDataService','findTimelyData',data)
      .then((res)=>{
          console.log(res);
          if(res.rows){
            var rowsData = res.rows[0];
            var  inforCardData = [
                  { title: '今日訂單數', icon: 'md-person-add', count: rowsData.ordernum?rowsData.ordernum:0, color: '#2d8cf0' },
                  { title: '今日訂單金額', icon: 'md-locate', count: rowsData.ordermoney?rowsData.ordermoney:0, color: '#19be6b' },
                  { title: '待出貨訂單', icon: 'md-help-circle', count: rowsData.dchnum?rowsData.dchnum:0, color: '#ff9900' },
                  { title: '平均出貨天數', icon: 'md-share', count: rowsData.avgchday?rowsData.avgchday:0, color: '#ed3f14' },
                  { title: '總商品數', icon: 'md-chatbubbles', count: rowsData.totalproduct?rowsData.totalproduct:0, color: '#E46CBB' },
                  { title: '零庫存數', icon: 'md-map', count: rowsData.nokcproduct?rowsData.nokcproduct:0, color: '#9A66E4' }
                ]
            this.inforCardData = inforCardData;
          }
      })
    },
    getList(){
      var data = {}
      this.$http('keyDataService','findNearData',data)
      .then(res=>{
          console.log(res)
          this.loading = false;
          if(res.rows){
            var rowsData={}
            res.rows.forEach(item => {
              if(item.days==30){
                rowsData = item
              }
            });
            
              var pie =  [
                  { value: rowsData.ordernum, name: '總訂單數' },
                  { value: rowsData.appnum, name: 'APP訂單數' },
                  { value: rowsData.webnum, name: 'web訂單數' }
                ]
            var  barData = {
                '總金額':rowsData.totalmoney,
                APP: rowsData.appmoney,
                WEB: rowsData.webmoney,
                '平均金額':rowsData.avgmoney,
                'APP平均': rowsData.appavgmoney,
                'WEB平均': rowsData.webavgmoney
              }
            this.pieData = pie
            this.barData = barData
          }
      })
    },
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
