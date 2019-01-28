<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>商品名称：</span>
            <Input type="text" style="width:160px" v-model="searchData.product_name"/>
        </div>
        <div class="option">
            <span>年份：</span>
            <Input type="text" name="time" style="width:160px" v-model="searchData.year"/>
        </div>
        <!-- <div class="option">
            <span>類型：</span>
            <Input type="text" name="time" style="width:160px"/>
        </div> -->
        <div class="serch" @click='search'>查詢</div>
    </div>
    <div class="query">
        <Table border  :columns="columns1" :data="data1"   height="550" class="post" :loading="loading">
            <template slot-scope="{ row, index }" slot="product_descr">
                <Tooltip placement="bottom" max-width="370" theme="light">
                    <span v-if="row.product_descr">{{stringHanle(row.product_descr,3)}}</span>
                    <div slot="content">
                        <div v-if="row.product_descr&&row.product_descr.indexOf('h4')>=0">
                            <h4>{{stringHanle(row.product_descr,1)}}</h4>
                            <p>{{stringHanle(row.product_descr,2)}}</p>
                        </div>
                        <div v-else>{{row.product_descr}}</div>
                    </div>
                </Tooltip>
            </template>
            <template slot-scope="{ row, index }" slot="type">
                <div v-if="row.type">{{types(row.type)}}</div>
            </template>
            <template slot="special_type" slot-scope="{ row, index }">
                <div v-if="row.special_type">{{row.special_type==2?'优惠价格':'折扣'}}</div>
            </template>
            <template slot="texture" slot-scope="{ row, index }">
                <div v-if="row.texture">{{texture(row.texture)}}</div>
            </template>
            <template slot="special_update" slot-scope="{ row, index }">
                <div v-if="row.special_update">{{$changeTime(row.special_update)}}</div>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="add_goods"  @click="openCreatePage">添加商品</div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div>
    <!-- 創建商品彈窗 -->
    <div class="create_model" v-show="createPage">
        <div class="create_box">
            <div class="c_title">添加商品</div>
            <div class="c_table">
                <table  >
                    <tr>
                        <td>商品名称</td>    
                        <td>數量</td>
                        <td>售價</td>
                        <td>年份</td>
                        <td>類型</td>
                        <td>年產量</td>
                    </tr>
                    <tr>
                        <td>
                            <Input type="text" v-model="inputValue.product_name" />
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.num" /> -->
                            <InputNumber  :min="0" v-model="inputValue.num"></InputNumber>
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.price" /> -->
                            <InputNumber  :min="0" v-model="inputValue.price"></InputNumber>
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.year" /> -->
                            <InputNumber  :min="0" 
                                          v-model="inputValue.year"
                                          :formatter="value => `${value}年`"
                                          :parser="value => value.replace('年', '')"
                            ></InputNumber>
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.product_type" /> -->
                            <InputNumber  :min="0" v-model="inputValue.product_type"></InputNumber>
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.annual_output" /> -->
                            <InputNumber  :min="0" v-model="inputValue.annual_output"></InputNumber>
                        </td>
                    </tr>
                    <tr>
                        <td>最低温度</td>    
                        <td>最高温度</td>
                        <td>品牌特色</td>
                        <td>商品ID</td>
                        <td>产区风格</td>
                        <td>产品风格</td>
                    </tr>
                    <tr>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.temperature_low" /> -->
                            <InputNumber   v-model="inputValue.temperature_low"></InputNumber>
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.temperature_high" /> -->
                            <InputNumber   v-model="inputValue.temperature_high"></InputNumber>
                        </td>
                        <td>
                            <Input type="text" v-model="inputValue.brand_feature" />
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.goods_id" /> -->
                            <!-- <InputNumber  :min="0" v-model="inputValue.goods_id"></InputNumber> -->
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.productAreaList" /> -->
                            <Select v-model="inputValue.product_area" >
                                <Option v-for="(item,index) in productAreaList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.product_style" /> -->
                            <Select v-model="inputValue.product_style" >
                                <Option v-for="(item,index) in productStyleList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>酒精濃度</td>
                        <td>口感</td>
                        <td>国家</td>
                        <td>是否進口包装</td>
                        <td>酒莊</td>
                        <td>葡萄品種</td>
                    </tr>
                    <tr>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.concentration" /> -->
                            <InputNumber  :min="0" v-model="inputValue.concentration"></InputNumber>
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.texture" /> -->
                            <!-- <Select v-model="inputValue.texture" >
                                <Option v-for="(item,index) in textureList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select> -->
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.country" /> -->
                            <Select v-model="inputValue.country" >
                                <Option v-for="(item,index) in countryList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <Input type="text" v-model="inputValue.import" />
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.winery" /> -->
                            <Select v-model="inputValue.winery" >
                                <Option v-for="(item,index) in wineryList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <!-- <Input type="text" v-model="inputValue.grape" /> -->
                            <Select v-model="inputValue.grape" >
                                <Option v-for="(item,index) in gropeList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>特价活动名称</td>
                        <td>特价活动优惠类型</td>
                        <td>特价活动优惠值</td>
                        <td>特价活动开始时间</td>
                        <td>特价活动结束时间</td>
                        <td>特价活动更新时间</td>
                    </tr>
                    <tr>
                        <td>
                            <Input type="text" v-model="inputValue.special" />
                        </td>
                        <td>
                            <Select v-model="inputValue.special_type" >
                                <Option v-for="(item,index) in specialList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <InputNumber  :min="0" v-model="inputValue.special_num"></InputNumber>
                        </td>
                        <td>
                            <DatePicker type="date" v-model="inputValue.special_start" placeholder="选择时间" ></DatePicker>
                        </td>
                        <td>
                            <DatePicker type="date" v-model="inputValue.special_end" placeholder="选择时间" ></DatePicker>
                        </td>
                        <td>
                            <DatePicker type="date" v-model="inputValue.special_update" placeholder="选择时间" ></DatePicker>
                        </td>
                    </tr>
                    <tr>
                        <td>规格(ml)</td>
                        <td>商品图片</td>
                        <td>状态</td>
                        <td colspan="3">商品描述</td>
                        
                    </tr>
                    <tr >
                        <td>
                            <!-- <Input type="text" v-model="inputValue.specification" /> -->
                            <InputNumber  :min="0" v-model="inputValue.specification"></InputNumber>
                        </td>
                        <td>
                            <div v-if="iSimage">
                                <input type="file" class="files" @change="fileChanged" ref="file" multiple="multiple" name="file" accept="image/jpg,image/jpeg,image/png,image/bmp">
                                <Button icon="ios-cloud-upload-outline" @click="addpic">点击上传</Button>
                            </div>
                            <div class="pic" v-else>
                                <img :src="files[0].src" />
                            </div>
                        </td>
                        <td>
                            <Select v-model="inputValue.type" >
                                <Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td colspan="3">
                            <Input type="textarea" v-model="inputValue.product_descr" />
                        </td>
                    </tr>
                </table>
            </div>
            <div class="c_btns">
                <div class="cancel" @click='closeProp'>取消</div>
                <div class="sure" @click="sureBtn">確定</div>
            </div>
        </div>
    </div>  
</div>    
</template>
<script>
import {times} from '../until/tool.js'
export default {
    data(){
        return{
            columns1: [
                {
                    title: '商品ID',
                    key: 'id',
                    fixed: 'left',
                    minWidth:80
                },
                {
                    title: '名稱',
                    key: 'product_name',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:170
                },
                {
                    title: '库存数',
                    key: 'num',
                    minWidth:100
                },
                {
                    title: '售價',
                    key: 'price',
                    minWidth:100
                },
                {
                    title: '年份',
                    key: 'year',
                    minWidth:170
                },
                {
                    title:'類型',
                    key:'product_type_value',
                    minWidth:120  
                },
                {
                    title:'国家',
                    key:'country_value',
                    minWidth:130
                },
                {
                    title:'年產量',
                    key:'annual_output',
                    minWidth:100
                },
                {
                    title:'酒精濃度',
                    key:'concentration',
                    minWidth:100
                },
                {
                    title:'最低溫度',
                    key:'temperature_low',
                    minWidth:100
                },
                {
                    title:'最高溫度',
                    key:'temperature_high',
                    minWidth:100
                },
                {
                    title:'進口包裝',
                    minWidth:124,
                    key:'import'
                },
                {
                    title:'酒莊',
                    key:'winery_name',
                    minWidth:120
                },
                {
                    title:'產品风格',
                    key:'product_style_value',
                    minWidth:130
                },
                {
                    title:'葡萄品種',
                    key:'grape_value',
                    minWidth:130
                },
                {
                    title:'状态',
                    slot:'type',
                    minWidth:110
                },
                {
                    title:'商品图片',
                    key:'product_photo',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:160
                },
                {
                    title:'品牌特色',
                    key:'brand_feature',
                    minWidth:120
                },
                {
                    title:'口感',
                    slot:'texture',
                    minWidth:120
                },
                {
                    title:'规格',
                    key:'specification',
                    minWidth:100
                },
                {
                    title:'出售商品id',
                    key:'goods_id',
                    minWidth:110
                },
                {
                    title:'产区风格',
                    key:'product_area_value',
                    minWidth:100
                },
                {
                    title:'产区国家',
                    key:'product_area_country_value',
                    minWidth:130
                },
                {
                    title:'商品描述',
                    slot:'product_descr',
                    ellipsis:true,
                    minWidth:160
                },
                {
                    title:'创建时间',
                    key:'time',
                    minWidth:170
                },
                {
                    title:'用户id',
                    key:'user_id',
                    minWidth:90
                },
                {
                    title:'特价活动',
                    key:'special',
                    minWidth:140,
                },
                {
                    title:'活动id',
                    key:'special_id',
                    minWidth:90,
                },
                {
                    title:'优惠值',
                    key:'special_num',
                    minWidth:90,
                },
                {
                    title:'优惠类型',
                    slot:'special_type',
                    minWidth:100
                },
                {
                    title:'活动开始时间',
                    key:'special_start',
                    minWidth:170
                },
                {
                    title:'活动结束时间',
                    key:'special_end',
                    minWidth:170
                },
                {
                    title:'活动更新时间',
                    slot:'special_update',
                    minWidth:170
                },
                {
                    title:'編輯',
                    key:'action',
                    minWidth:90,
                    fixed: 'right',
                    render: (h, params) => {
                        return h('div', [
                            // h('Button', {
                            //     props: {
                            //         type: 'primary',
                            //         size: 'small'
                            //     },
                            //     style: {
                            //         marginRight: '5px'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.show(params)
                            //         }
                            //     }
                            // }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row.id)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            searchData:{
                product_name:"",
                year:''

            },
            data1: [],
            createPage:false,
            c_data1:'',
            total:0,
            current:0,
            loading:false,
            specialList:[
                {
                    value:1,
                    label:'折扣值'
                },
                {
                    value:2,
                    label:'优惠价格'
                }
            ],
            typeList:[
                {value:0,label:'删除'},
                {value:1,label:'可以售卖'},
                {value:2,label:'关闭售卖'},
                {value:3,label:'用户上传'}
            ],
            textureList:[
                {value:0,label:'香氣'}
            ],
            countryList:[],
            wineryList:[],
            productAreaList:[],
            productStyleList:[],
            gropeList:[],
            inputValue:{
                product_descr:"",
                specification:0,
                grape:0,
                winery:'',
                import:'',
                concentration:0,
                annual_output:0,
                product_type:0,
                year:0,
                price:0,
                num:0,
                product_name:'',
                product_photo:'',
                product_style:'',
                product_area:'',
                goods_id:'',
                special:'',
                special_type:'',
                special_num:0,
                special_start:'',
                special_end:'',
                special_update:"",
                temperature_high:0,
                temperature_low:0,
                brand_feature:'',
                country:'',
                texture:'',
                user_id:'',
                type:''
            },
            files:[],
            iSimage:true,
            userInfo:{
                id:1
            }
        }
    },
    created(){
        this.getList(0);
        this.getWinery();
        this.getCountry();
        this.productArea();
        this.getgrope();
        this.productStyle();
        var user = JSON.parse(sessionStorage.getItem('user_info'));
        if(user){
            this.userInfo = user.dbUser;
            console.log(this.userInfo)
        }
    },
    methods:{
        getList(index){
            var data = {
                start:index,
                rows:10
            }
            this.loading = true;
            this.$http('alcoholService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    this.total = res.total;
                    this.data1 = res.rows;
                }
            })
            .catch(err=>{
                this.loading = false;
            })
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作将删除数据，是否继续？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('alcoholService','deleteData',data)
                    .then(res=>{
                        if(res.result == 'success'){
                            this.$Message.success('删除成功');
                            this.getList(this.current);
                        }else{
                            this.$Message.error('操作失败');
                        }
                    })
                },
                onCancel: () => {
                }
            })
        },
        openCreatePage(){ //打開創建商品彈窗
            this.createPage = true;
        },
        closeProp(){
            this.createPage = false;
        },
        stringHanle(str,type){
            if(!str){return;}
            var strs = '';
            if(type ==1){
                strs = str.substring(str.indexOf('<h4>')+4,str.indexOf('</h4>'));
            }else if(type==3){
                strs = str.substring(str.indexOf('<h4>')+4,16) +'...';
            }else{
                strs = str.substring(str.indexOf('<p>')+3,str.indexOf('</p>'));
            }
            return strs;
        },
        pageChange(index){ //切换页数
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
        },
        types(type){//产品状态
            if(!type){return}
            var str = ''; 
            switch(type){
                case 0:
                str = '删除';
                break;
                case 1:
                str = '可以售卖';
                break;
                case 2:
                str = '关闭售卖';
                break;
                case 3:
                str = '用户上传';
                break;
            }
            return str;
        },
        texture(type){
            if(!type){return}
            var str = ''; 
            switch(type){
                case 0:
                str = '香氣';
                break;
                case 1:
                str = '單寧';
                break;
                case 2:
                str = '酒';
                break;
                case 3:
                str = '果酸';
                break;
                case 4:
                str = '尾韻';
                break;
                case 5:
                str = '果味';
                break;
            }
            return str;
        },
        handleUpload(file){
            
            this.inputValue.product_photo = file.name;
            return false;
        },
        sureBtn(){  //新增商品信息
            var data = this.inputValue;
            // var data = {
            //     annual_output:1000,
            //     brand_feature:"水果蛋糕",
            //     concentration:40,
            //     country:1,
            //     grape:3,
            //     import:"是",
            //     num:50,
            //     price:1999,
            //     product_area:3,
            //     product_descr:"这是一组测试数据啊",
            //     product_name:"82年拉菲",
            //     product_photo:"/file/20190124/1548315569620_微信图片_20181121095827.jpg",
            //     product_style:1,
            //     product_type:1,
            //     specification:500,
            //     temperature_high:20,
            //     temperature_low:6,
            //     type:1,
            //     user_id:0,
            //     winery:1,
            //     year:1982,
            //     texture:3,
            //     special:'春节特卖',
            //     special_type:1,
            //     special_num:90,
            //     special_start:'2019-01-29 00:00:00',
            //     special_end:'2019-01-30 00:00:00',
            //     special_update:"2019-01-29 00:00:00",
            //     goods_id:"dddd",
            //     special_id:2,
            //     time:this.$changeTime(new Date())
            // }
            data.user_id = this.userInfo.id
            data.special_end = this.$changeTime(data.special_end);
            data.special_start = this.$changeTime(data.special_start);
            data.special_update = this.$changeTime(data.special_update);
            data.time = this.$changeTime(new Date());
            console.log(data)
            // return;
            this.$http('alcoholService','addOrUpdate',data)
            .then(res=>{
                this.createPage = false
                if(res.result == 'success'){
                    this.$Message.success('新增成功');
                    this.getList(this.current);
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        search(){
            var data = {};
            console.log(this.searchData)
            for(let key in this.searchData){
                if(this.searchData[key] != ''){
                    data[key] = this.searchData[key];
                }
            }
            var arr = Object.keys(data).length;
            if(arr<=0){
                // this.$Message.warning('请输入查询参数');
                // return;
                data.start = 0;
                data.rows = 10;
            }
            this.loading = true;
            this.$http('alcoholService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows.length>0){
                    this.total = res.total;
                    this.data1 = res.rows;
                }else{
                    this.$Message.warning('暂无数据')
                }
            })
            .catch(err=>{
                this.loading = false;
            })
        },
        getWinery(){//获取酒庄列表
            var data = {
                start:0
            }
            this.$http('alcoholWineryService','findDatas',data)
            .then(res=>{
                console.log('酒庄',res)
                if(res.rows){
                    var arr = [];
                    for(let i =0;i<res.rows.length;i++){
                        var obj = {};
                        obj.value = res.rows[i].id;
                        obj.label = res.rows[i].winery;
                        arr.push(obj);
                    }
                    this.wineryList = arr;
                    console.log(this.wineryList)
                }
                
            })
        },
        addpic(){
            this.$refs.file.click();
        },
        fileChanged(e){
            const list = this.$refs.file.files
            for (let i = 0; i < list.length; i++) {
                if (!this.isContain(list[i])) {
                    const item = {
                        name: list[i].name,
                        size: list[i].size,
                        file: list[i],
                    }
                    this.html5Reader(list[i], item);
                    this.files.push(item);
                }
            }
            console.log(this.files)
            if(list.length > 0) {
                let form = new FormData();  
                form.append('file', list[0]) 
                this.$http('','',form,2)
                .then(res=>{
                    console.log(res)
                    if(res.result=='success'){
                        this.$Message.success(res.message);
                        this.iSimage = false;
                        this.inputValue.product_photo = res.data;
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            }
            this.$refs.file.value = '';
        },
        // 将图片文件转成BASE64格式
      html5Reader(file, item){
          const reader = new FileReader()
          reader.onload = (e) => {
              this.$set(item, 'src', e.target.result)
          }
          reader.readAsDataURL(file)
      },
      isContain(file) {
        return this.files.find((item) => item.name === file.name && item.size === file.size)
      },
      getCountry(){
        var data = {
            start:0,
            rows:300
        }
        this.$http('alcoholCountryService','findDatas',data)
        .then(res=>{
            console.log(res)
            if(res.rows.length>0){
                var arr = res.rows
                var arr1 = [];
                for(let i =0;i<arr.length;i++){
                    var obj = {};
                    obj.value = arr[i].id;
                    obj.label = arr[i].country;
                    arr1.push(obj);
                }
                this.countryList = arr1;
            }
        })
      },
      productArea(){
        var data = {
            start:0,
            rows:1000
        }
        this.$http('alcoholAreaStyleService','findDatas',data)
        .then(res=>{
            if(res.rows.length>0){
                var arr = res.rows
                var arr1 = [];
                for(let i =0;i<arr.length;i++){
                    var obj = {};
                    obj.value = arr[i].id;
                    obj.label = arr[i].product_area;
                    arr1.push(obj);
                }
            this.productAreaList = arr1;
            }
        })
      },
      productStyle(){
        var data = {
            start:0,
            rows:1000
        }
        this.$http('alcoholStyleService','findDatas',data)
        .then(res=>{
            if(res.rows.length>0){
                var arr = res.rows
                var arr1 = [];
                for(let i =0;i<arr.length;i++){
                    var obj = {};
                    obj.value = arr[i].id;
                    obj.label = arr[i].product_style;
                    arr1.push(obj);
                }
            this.productStyleList = arr1;
            }
        })
      },
      getgrope(){
        var data = {
            start:0,
            rows:1000
        }
        this.$http('alcoholGrapeService','findDatas',data)
        .then(res=>{
            if(res.rows){
                var arr = res.rows
                var arr1 = [];
                for(let i =0;i<arr.length;i++){
                    var obj = {};
                    obj.value = arr[i].id;
                    obj.label = arr[i].grape_type;
                    arr1.push(obj);
                }
            this.gropeList = arr1;
            }
        })
      }
    }  
}
</script>
<style scoped>
.page{
    justify-content: space-between;
}
.create_model{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.create_box{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -340px 0 0 -460px;
    width: 920px;
    height: 680px;
    background-color:#fff;
    border-radius: 4px; 
}
.c_title{
    width: 90%;
    height:38px;
    border-radius: 6px;
    background-color: #009688;
    text-align: center;
    line-height: 38px;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    margin: 20px auto ;
}
.c_table{
    width: 90%;
    
    margin: 0 auto 30px;
}
table,table tr th, table tr td { border:1px solid #555; }
table{
    border-collapse: collapse;
    padding:2px;
}
td{
    /* width: 98px; */
    height: 37px;
    box-sizing: border-box;
    line-height: 36px;
    padding: 5px;
    text-align: center;
    /* border: 1px solid #555; */
    /* border-left:0;
    border-bottom: 0; */
}
.c_btns{
    width: 100%;
    display: flex;
    justify-content: center;
}
.cancel,
.sure{
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    box-sizing: border-box;
}
.cancel{
    color: #fff;
    background-color: #ED4014;
}
.sure{
    color: #fff;
    background-color: #009688;
    margin-left: 30px;
}
input[type="file"] {
    display: none;
}
.pic{
    display: inline-block;
    width: 60px;
    height: auto;
}
.pic img{
    width: 100%;
    vertical-align: middle;
}
</style>
