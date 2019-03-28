<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>商品名稱：</span>
            <Input type="text" style="width:130px" v-model="searchData.product_name"/>
        </div>
        <div class="option">
            <span>商品編號：</span>
            <Input type="text" style="width:130px" v-model="searchData.id"/>
        </div>
        <div class="option">
            <span>年份：</span>
            <Input type="text" name="time" style="width:130px" v-model="searchData.year"/>
        </div>
        <!-- <div class="option">
            <span>類型：</span>
            <Input type="text" name="time" style="width:160px"/>
        </div> -->
        <div class="serch" @click='search'>查詢</div>
        <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
          <Button icon="ios-cloud-upload-outline" type="primary" style="position:absolute;right:160px;top:1.5px" :loading="uploadLoading" @click="handleUploadFile">上傳excel</Button>
        </Upload>
        <Button icon="md-download" type="primary" style="position:absolute;right:20px" :loading="exportLoading" @click="exportExcel">導出excel</Button>
    </div>
    <div class="query">
        <Table border  :columns="columns1" :data="data1"   height="550" class="post" :loading="loading">
            <template slot-scope="{ row }" slot="description">
                <!-- <Tooltip placement="bottom" max-width="370" theme="light">
                    <span v-if="row.description">{{stringHanle(row.description,3)}}</span>
                    <div slot="content">
                        <div v-if="row.description&&row.description.indexOf('h4')>=0">
                            <h4>{{stringHanle(row.description,1)}}</h4>
                            <p>{{stringHanle(row.description,2)}}</p>
                        </div>
                        <div v-else>{{row.description}}</div>
                    </div>
                </Tooltip> -->
                <div class="contents" @click="openRowContent(row)">
                    {{row.description}}
                </div>
            </template>
            <template slot-scope="{ row}" slot="type">
                <div v-if="row.type">{{types(row.type)}}</div>
            </template>
            <template slot-scope="{row}" slot="type_id">
                <div>{{styles(row.type_id)}}</div>
            </template>
            <template slot-scope="{row}" slot="country_id">
                <div>{{country(row.country_id)}}</div>
            </template>
            <template slot-scope="{row}" slot="winery_id">
                <div>{{winery(row.winery_id)}}</div>
            </template>
            <template slot-scope="{row}" slot="region_id">
                <div>{{region(row.region_id)}}</div>
            </template>
            <template slot-scope="{row}" slot="product_style">
                <div>{{product_style(row.product_style)}}</div>
            </template>
            <template slot-scope="{row}" slot="brand_id">
                <div>{{brand(row.brand_id)}}</div>
            </template>
            <template slot-scope="{row}" slot="subregion_id">
                <div>{{subregion(row.subregion_id)}}</div>
            </template>
        </Table>
    </div>
    <Modal :title="imageTitle" v-model="visible">
        <div class="over" style="max-height:500px;overflow-y:scroll;">
          {{imgName}}
        </div>
    </Modal>
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
                        <td>商品名稱</td> 
                        <td>中文名稱</td>   
                        <td>數量</td>
                        <td>售價</td>
                        <td>年份</td>
                        <td>類型</td>
                    </tr>
                    <tr>
                        <td>
                            <Input type="text" v-model="inputValue.title" />
                        </td>
                        <td>
                            <Input type="text" v-model="inputValue.source_title" />
                        </td>
                        <td>
                            <InputNumber  :min="0" v-model="inputValue.num"></InputNumber>
                        </td>
                        <td>
                            <InputNumber  :min="0" v-model="inputValue.price"></InputNumber>
                        </td>
                        <td>
                            <InputNumber  :min="0" 
                                          v-model="inputValue.vintage"
                                          :formatter="value => `${value}年`"
                                          :parser="value => value.replace('年', '')"
                            ></InputNumber>
                        </td>
                        <td>
                            <Select v-model="inputValue.type_id" >
                                <Option v-for="(item,index) in productType" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>最低溫度</td>    
                        <td>最高溫度</td>
                        <td>品牌廠家</td>
                        <td>國家</td>
                        <td>產區</td>
                        <td>產品風格</td>
                    </tr>
                    <tr>
                        <td>
                            <InputNumber   v-model="inputValue.temperature_low"></InputNumber>
                        </td>
                        <td>
                            <InputNumber   v-model="inputValue.temperature_high"></InputNumber>
                        </td>
                        <td>
                            <Select v-model="inputValue.brand_id" >
                                <Option v-for="(item,index) in brandList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <Select v-model="inputValue.country_id" >
                                <Option v-for="(item,index) in countryList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <Select v-model="inputValue.region_id" >
                                <Option v-for="(item,index) in productAreaList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <Select v-model="inputValue.product_style" >
                                <Option v-for="(item,index) in productStyleList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>酒精濃度</td>
                        <td>規格(ml)</td>
                        <td>狀態</td>
                        <td>進口包裝(選填)</td>
                        <td>酒莊</td>
                        <td>商品圖片</td>
                    </tr>
                    <tr>
                        <td>
                            <InputNumber  :min="0" v-model="inputValue.concentration"></InputNumber>
                        </td>
                        <td>
                            <Input type="text" v-model="inputValue.specification" />
                        </td>
                        <td>
                            <Select v-model="inputValue.type" >
                                <Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <Select v-model="inputValue.import" >
                                <Option v-for="(item,index) in imports" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <Select v-model="inputValue.winery_id" >
                                <Option v-for="(item,index) in wineryList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <div v-if="iSimage">
                                <input type="file" class="files" @change="fileChanged" ref="file" multiple="multiple" name="file" accept="image/jpg,image/jpeg,image/png,image/bmp">
                                <Button icon="ios-cloud-upload-outline" @click="addpic">點擊上傳</Button>
                            </div>
                            <div class="pic" v-else>
                                <img :src="files[0].src" />
                            </div>
                            <!-- <InputNumber  :min="0" v-model="inputValue.image"></InputNumber> -->
                        </td>
                    </tr>
                    <tr>
                        <td>次產區(選填)</td>
                        <td>年產量</td>
                        <td>口感</td>
                        <td>葡萄種類</td>
                        <td>國際評分</td>
                        <td>國際獎牌</td>
                    </tr>
                    <tr >
                        <td>
                            <Select v-model="inputValue.subregion_id" >
                                <Option v-for="(item,index) in subregionList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <InputNumber  :min="0" v-model="inputValue.annual_output"></InputNumber>
                        </td>
                        <td>
                            <Select v-model="inputValue.texture" >
                                <Option v-for="(item,index) in textureList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <Select v-model="inputValue.grope" >
                                <Option v-for="(item,index) in gropeList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </td>
                        <td>
                            <InputNumber  :min="0" v-model="inputValue.wc_score"></InputNumber>
                        </td>
                        <td>
                            <InputNumber  :min="0" v-model="inputValue.jeb_score"></InputNumber>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6">商品描述</td>
                    </tr>
                    <tr >
                        <td colspan="6">
                            <Input type="textarea" v-model="inputValue.description" :rows="6" />
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
import excel from '../until/excel.js'
export default {
    data(){
        return{
            columns1: [
                {
                    title: '商品編號',
                    key: 'id',
                    width:100
                },
                {
                    title: '名稱',
                    key: 'title',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:170
                },
                {
                    title: '原名稱',
                    key: 'source_title',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:170
                },
                {
                    title: '數量',
                    key: 'num',
                    minWidth:90
                },
                {
                    title: '售價(美元)',
                    key: 'price',
                    minWidth:110
                },
                {
                    title: '源價(其它幣種)',
                    key: 'source_price',
                    minWidth:140
                },
                {
                    title: '市場價(美元)',
                    key: 'market_price',
                    minWidth:130
                },
                {
                    title: '源市場價(其它幣種)',
                    key: 'source_market_price',
                    minWidth:160
                },
                {
                    title: '年份',
                    key: 'vintage',
                    minWidth:170
                },
                {
                    title:'類型',
                    slot:'type_id',
                    minWidth:120  
                },
                {
                    title:'國家',
                    slot:'country_id',
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
                    slot:'winery_id',
                    minWidth:120
                },
                {
                    title:'產區',
                    slot:'region_id',
                    minWidth:130
                },
                {
                    title:'次產區',
                    slot:'subregion_id',
                    minWidth:130
                },
                {
                    title:'產品風格',
                    slot:'product_style',
                    minWidth:120
                },
                {
                    title:'狀態',
                    slot:'type',
                    minWidth:110
                },
                {
                    title:'商品圖片',
                    key:'image',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:160
                },
                {
                    title:'品牌廠家',
                    slot:'brand_id',
                    minWidth:160
                },
                {
                    title:'規格',
                    key:'specification',
                    minWidth:140
                },
                {
                    title:'商品描述',
                    slot:'description',
                    minWidth:160
                },
                {
                    title:'源地址',
                    key:'source_url',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title:'源域名',
                    key:'source_site',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title:'源幣種',
                    key:'source_currency',
                    minWidth:120
                },
                {
                    title:'源語言',
                    key:'source_language',
                    minWidth:120
                },
                {
                    title:'編輯',
                    key:'action',
                    minWidth:140,
                    fixed: 'right',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.row)
                                    }
                                }
                            }, '編輯'),
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
                            }, '刪除')
                        ]);
                    }
                }
            ],
            searchData:{
                product_name:"",
                year:'',
                id:''
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
                    label:'優惠價格'
                }
            ],
            typeList:[
                {value:0,label:'刪除'},
                {value:1,label:'可以售賣'},
                {value:2,label:'關閉售賣'},
                {value:3,label:'默認'}
            ],
            textureList:[
                {value:0,label:'香氣'},
                {value:1,label:'單寧'},
                {value:2,label:'酒體'},
                {value:3,label:'果酸'},
                {value:4,label:'尾韻'},
                {value:5,label:'果味'}
            ],
            countryList:[],
            wineryList:[],
            productAreaList:[],
            productStyleList:[],
            brandList:[],//品牌廠家列表
            productType:[],
            subregionList:[],//次產區
            gropeList:[],
            imports:[{value:'是',label:'是'},{value:'否',label:'否'}],
            inputValue:{
                specification:'',
                description:"",
                brand_id:'',
                import:'',
                concentration:0,
                annual_output:0,
                winery_id:'',
                vintage:0,
                price:0,
                num:0,
                region_id:'',
                product_style:'',
                country_id:'',
                temperature_high:0,
                temperature_low:0,
                type:'',
                type_id:'',
                title:'',
                image:0,
                subregion_id:'',
                source_title:'',
                texture:"",
                grope:"",
                wc_score:0,
                jeb_score:0
            },
            files:[],
            iSimage:true,
            userInfo:{
                id:1
            },
            exportLoading: false,
            uploadLoading:false,
            tableData: [],
            tableTitle: [],
            id:'',
            type:1,
            obj:{},
            visible:false,
            imgName:'',
            imageTitle:"",
        }
    },
    created(){
        this.getTypes();
        this.getWinery();
        this.getCountry();
        this.productArea();
        this.productStyle();
        this.getBrand();
        this.getSubregion();
        this.getgrope();
        this.getList(0);
        // var user = JSON.parse(sessionStorage.getItem('user_info'));
        // if(user){
        //     this.userInfo = user.dbUser;
        //     console.log(this.userInfo)
        // }
    },
    methods:{
        exportExcel () {
            if (this.data1.length) {
                this.exportLoading = true
                var tabledata = this.columns1;
                var title_arr = [];
                var key_arr = [];
                for(let i =0;i<tabledata.length;i++){
                    if(tabledata[i].title != '編輯'){
                        title_arr.push(tabledata[i].title)
                        key_arr.push(tabledata[i].key?tabledata[i].key:tabledata[i].slot)
                    }
                }
                const params = {
                // title: ['一級分類', '二級分類', '三級分類'],
                title:title_arr,
                // key: ['category1', 'category2', 'category3'],
                key:key_arr,
                data: this.data1,
                autoWidth: true,
                filename: '商品信息'
                }
                excel.export_array_to_excel(params)
                this.exportLoading = false
            } else {
                this.$Message.info('表格數據不能為空！')
            }
        },
        handleUploadFile(){
            this.tableData = []
            this.tableTitle = []
        },
        handleBeforeUpload (file) {
            const fileExt = file.name.split('.').pop().toLocaleLowerCase()
            if (fileExt === 'xlsx' || fileExt === 'xls') {
                this.readFile(file)
                // this.file = file
            } else {
                this.$Notice.warning({
                title: '文件類型錯誤',
                desc: '文件：' + file.name + '不是EXCEL文件，請選擇後綴為.xlsx或者.xls的EXCEL文件。'
                })
            }
            return false
        },
        // 讀取文件
        readFile (file) {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onloadstart = e => {
                this.uploadLoading = true
                this.loading = true
                // this.showProgress = true
            }
            reader.onprogress = e => {
                // this.progressPercent = Math.round(e.loaded / e.total * 100)
            }
            reader.onerror = e => {
                this.$Message.error('文件讀取出錯')
            }
            reader.onload = e => {
                this.$Message.info('文件讀取成功')
                const data = e.target.result
                console.log(data)
                const { header, results } = excel.read(data, 'array')
                const tableTitle = header.map(item => { return { title: item, key: item } })
                this.tableData = results
                this.tableTitle = tableTitle
                this.uploadLoading = false
                this.loading = false
                var arr = [];
                // for(let i =0;i<this.columns1.length;i++){
                //     for(let y =0;y<results.length;y++){
                //         if(this.columns1[i].title == Object.keys(results[y])[0]){
                //             var obj ={};
                //             var keys = this.columns1[i].key?this.columns1[i].key:this.columns1[i].slot
                //             obj[keys] = results[y][this.columns1[i].title]
                //         }
                //     }
                // }
                for(let y =0;y<results.length;y++){
                    for(let i =0;i<this.columns1.length;i++){
                        if(this.columns1[i].title == Object.keys(results[y])[0]){
                            var obj ={};
                            var keys = this.columns1[i].key?this.columns1[i].key:this.columns1[i].slot
                            obj[keys] = results[y][this.columns1[i].title]
                            arr.push(obj)
                        }
                    }
                    
                }

                this.data1 = results
                this.columns1 = tableTitle
                alert(JSON.stringify(arr))
            }
        },
        getList(start,obj){
            var data = {}
            if(obj){
                data = obj;
            }
            data.start = start;
            data.rows = 10
            this.loading = true;
            this.$http('moWineService','findDatas',data)
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
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('moWineService','deleteData',data)
                    .then(res=>{
                        if(res.result == 'success'){
                            this.$Message.success('刪除成功');
                            this.getList(this.current);
                        }else{
                            this.$Message.error('操作失敗');
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
            this.id = ''
            this.clearData()
        },
        stringHanle(str,type){
            if(!str){return;}
            var strs = '';
            if(str.indexOf('<h4>') == -1){
                return str
            }
            if(type ==1){
                strs = str.substring(str.indexOf('<h4>')+4,str.indexOf('</h4>'));
            }else if(type==3){
                strs = str.substring(str.indexOf('<h4>')+4,16) +'...';
            }else{
                strs = str.substring(str.indexOf('<p>')+3,str.indexOf('</p>'));
            }
            return strs;
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.getList(this.current,this.obj)
            }
        },
        types(type){//產品狀態
            if(!type){return}
            var str = ''; 
            switch(type){
                case 0:
                str = '刪除';
                break;
                case 1:
                str = '可以售賣';
                break;
                case 2:
                str = '關閉售賣';
                break;
                case 3:
                str = '默認';
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
        show(row){
            this.inputValue = {
                specification:row.specification,
                description:row.description,
                brand_id:row.brand_id,
                import:row.import,
                concentration:row.concentration,
                annual_output:row.annual_output,
                winery_id:row.winery_id,
                vintage:row.vintage,
                price:row.price,
                num:row.num,
                region_id:row.region_id,
                product_style:row.product_style,
                country_id:row.country_id,
                temperature_high:row.temperature_high,
                temperature_low:row.temperature_low,
                type:row.type,
                type_id:row.type_id,
                title:row.title,
                image:row.image,
                subregion_id:row.subregion_id,
                source_title:row.source_title,
                source_price:row.source_price,
                market_price:row.market_price,
                source_market_price:row.source_market_price,
                source_url:row.source_url,
                source_site:row.source_site,
                source_currency:row.source_currency,
                source_language:row.source_language
            }
            this.id = row.id
            this.createPage = true;
        },
        sureBtn(){  //新增商品信息
            var data = this.inputValue;
            console.log(data)
            if(!data.type_id){
                this.$Message.warning('類型為必填項！')
                return
            }
            if(!data.brand_id){
                this.$Message.warning('廠家為必填項！')
                return
            }
            if(!data.country_id){
                this.$Message.warning('國家為必填項！')
                return
            }
            if(!data.region_id){
                this.$Message.warning('產區為必填項！')
                return
            }
            if(!data.image){
                this.$Message.warning('圖片為必填項！')
                return
            }
            if(!data.price){
                this.$Message.warning('價格(美元)為必填項！')
                return
            }
            var notice = '新增成功'
            if(this.id){
                data.id = this.id
                notice = '修改成功'
            }
            this.$http('moWineService','addOrUpdate',data)
            .then(res=>{
                if(res.result == 'success'){
                    this.createPage = false
                    this.$Message.success(notice);
                    this.getList(this.current);
                    this.id = ''
                    this.clearData()
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        clearData(){
            this.inputValue = {
                specification:'',
                description:"",
                brand_id:'',
                import:'',
                concentration:0,
                annual_output:0,
                winery_id:'',
                vintage:0,
                price:0,
                num:0,
                region_id:'',
                product_style:'',
                country_id:'',
                temperature_high:0,
                temperature_low:0,
                type:'',
                type_id:'',
                title:'',
                image:0
            }
        },
        search(){
            console.log(11)
            var data = {};
            console.log(this.searchData)
            for(let key in this.searchData){
                if(this.searchData[key] != ''){
                    data[key] = this.searchData[key];
                }
            }
            if(data.id){
                data.id = parseInt(data.id)
            }
            var arr = Object.keys(data);
            if(arr.length>0){
                this.obj = data
                this.type=2
                this.getList(0,data)
            }else{
                this.type=1
                this.obj={}
                this.getList(0)
            }
        },
        getWinery(){//獲取酒莊列表
            var data = {
                start:0
            }
            this.$http('alcoholWineryService','findDatas',data)
            .then(res=>{
                console.log('酒莊',res)
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
        winery(id){
          if(!id){return ''}
          var result = this.wineryList.find(item=>item.value == id)
          if(result){
              return result.label
          }else{
              return ''
          }
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
                        // this.inputValue.image = res.data;
                        this.setPic(res.data)//將圖片上傳到圖片庫，並獲取圖片id
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            }
            this.$refs.file.value = '';
        },
        // 將圖片文件轉成BASE64格式
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
      setPic(url){
        var data = {
            path:url
        }
        this.$http('moPictureService','addOrUpdate',data)
        .then(res=>{
            if(res.result == 'success'){
                this.inputValue.image = res.data.id;
            }else{
                this.$Message.error(res.message);
            }
        })
      },
      getCountry(){
        var data = {
            start:0
        }
        this.$http('moCountryService','findDatas',data)
        .then(res=>{
            console.log(res)
            if(res.rows.length>0){
                var arr = res.rows
                var arr1 = [];
                for(let i =0;i<arr.length;i++){
                    var obj = {};
                    obj.value = arr[i].id;
                    obj.label = arr[i].country_name;
                    arr1.push(obj);
                }
                this.countryList = arr1;
            }
        })
      },
      country(id){
          if(!id){return ''}
          var result = this.countryList.find(item=>item.value == id)
          if(result){
              return result.label
          }else{
              return ''
          }
      },
      productArea(){//產區
        var data = {
            start:0
        }
        this.$http('moRegionService','findDatas',data)
        .then(res=>{
            if(res.rows.length>0){
                var arr = res.rows
                var arr1 = [];
                for(let i =0;i<arr.length;i++){
                    var obj = {};
                    obj.value = arr[i].id;
                    obj.label = arr[i].region_name;
                    arr1.push(obj);
                }
            this.productAreaList = arr1;
            }
        })
      },
      region(id){
          if(!id){return ''}
          var result = this.productAreaList.find(item=>item.value == id)
          if(result){
              return result.label
          }else{
              return ''
          }
      },
      productStyle(){//商品風格
        var data = {
            start:0
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
      product_style(id){
          if(!id){return ''}
          var result = this.productStyleList.find(item=>item.value == id)
          if(result){
              return result.label
          }else{
              return ''
          }
      },
      getTypes(){//酒類型
            var data = {
                start:0
            }
            this.$http('moTypeService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = res.rows
                    var arr1 = [];
                    for(let i =0;i<arr.length;i++){
                        var obj = {};
                        obj.value = arr[i].id;
                        obj.label = arr[i].type_name;
                        arr1.push(obj);
                    }
                    this.productType = arr1;
                }
            })
        },
      styles(id){
          if(!id){return ''}
          var result = this.productType.find(item=>item.value==id);
          if(result){
              return result.label
          }else{
              return ''
          }
      },
      getBrand(){//品牌
        var data = {
            start:0
        }
        this.$http('moBrandService','findDatas',data)
        .then(res=>{
            if(res.rows){
                var arr = res.rows
                var arr1 = [];
                for(let i =0;i<arr.length;i++){
                    var obj = {};
                    obj.value = arr[i].id;
                    obj.label = arr[i].brand_name;
                    arr1.push(obj);
                }
                this.brandList = arr1;
            }
        })
      },
      brand(id){
          if(!id){return ''}
          var result = this.brandList.find(item=>item.value==id);
          if(result){
              return result.label
          }else{
              return ''
          }
      },
      getSubregion(){
        var data = {
            start:0
        }
        this.$http('moSubregionService','findDatas',data)
        .then(res=>{
            if(res.rows){
                var arr = res.rows
                var arr1 = [];
                for(let i =0;i<arr.length;i++){
                    var obj = {};
                    obj.value = arr[i].id;
                    obj.label = arr[i].subregion_name;
                    arr1.push(obj);
                }
                this.subregionList = arr1;
            }
        })  
      },
      subregion(id){
          if(!id){return ''}
          var result = this.subregionList.find(item=>item.value==id);
          if(result){
              return result.label
          }else{
              return ''
          }
      },
      getgrope(){
        var data = {
            start:0
        }
        this.$http('moVarietalService','findDatas',data)
        .then(res=>{
            if(res.rows){
                var arr = res.rows
                var arr1 = [];
                for(let i =0;i<arr.length;i++){
                    var obj = {};
                    obj.value = arr[i].id;
                    obj.label = arr[i].varietal_name;
                    arr1.push(obj);
                }
            this.gropeList = arr1;
            }
        })
      },
      openRowContent(row){
        if(!row){return}
        this.imgName = row.description
        this.imageTitle = '商品描述'
        this.visible = true
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
    margin: -354px 0 0 -460px;
    width: 920px;
    height: 708px;
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
.contents{
    width: 120px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
</style>
