import Toast from './Toast'
const obj={
}
obj.install=function(Vue){
  // console.log('执行了install',vue)
  //创建组件构造器
  const toastContrustor=Vue.extend(Toast);
  //创建组件对象
  const toast=new toastContrustor();
  //将组件对象用$mount挂载在新创建的div上
  toast.$mount(document.createElement('div'));
  //将toast.$el获取到的内部模板在body中显示
  document.body.appendChild(toast.$el);

  //给vue原型对象添加$toast属性
  Vue.prototype.$toast=toast
}
export default obj