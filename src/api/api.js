import axios from 'axios'
import qs from 'qs'
import vue from 'vue';
// import router from '../router';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error);// for debug
    vue.$Message.error({
            message: error.message,
            duration: 5 * 1000,
            closable: true
        });
    return Promise.reject(error);
  }
)
export function postData(api,method,obj,type){
    console.log(obj)
    return new Promise((resolve,reject)=>{
        if(!type){
            let datas = {
                service:api,
                method:method,
                data:JSON.stringify(obj)
            }
            service({
                // url: '/api/op/in',
                url: '/op/in',
                method: 'post',
                data:qs.stringify(datas)
            }).then(res=>{  //axios返回的是一个promise对象
                resolve(res.data)  //resolve在promise执行器内部 
            }).catch(err=>{
                console.log(err,'异常');
                reject(err);
            })
        }else{
            service({
                // url: '/api/op/file/upload',
                url: '/op/file/upload',
                method: 'post',
                data:obj
            }).then(res=>{  //axios返回的是一个promise对象
                resolve(res.data)  //resolve在promise执行器内部 
            }).catch(err=>{
                console.log(err,'异常');
                reject(err);
            })
        }
    })
        
}
