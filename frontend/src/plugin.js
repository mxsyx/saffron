import MessageBox from '@components/MessageBox.vue'

const Alert = {
  install(Vue) {
    const Constructor = Vue.extend(AlertComponent) //创建一个alert子实例
    let instance = new Constructor({
      el: document.createElement('div') //将alert实例挂载到创建的div上
    })
    document.body.appendChild(instance.$el) //添加到body中
    //绑定到vue原型上，以供全局使用
    Vue.prototype.$alert = (msg, confirmSure = () => {}) => {
      instance.message = msg //需要显示的信息
      instance.show = true //在调用alert时显示组件
      instance.confirmSure = confirmSure //点击关闭的时候触发的回调函数
    }
  }
}

export default Alert
