/**
 * 插件定义
 */
import Loading from '@/components/Loading.vue'
import Message from '@/components/Message.vue'

// 加载插件
const LoadingPlugin = {
  install(Vue) {
    const Constructor = Vue.extend(Loading);
    const instance = new Constructor({
      el: document.createElement('div')
    });
    
    document.body.insertBefore(
      instance.$el, 
      document.body.firstElementChild
    );

    Vue.prototype.$loading = () => {
      instance.showProgress = true;
    },
    Vue.prototype.$loaded = () => {
      instance.showWaiting = false;
      instance.showProgress = false;
    }
  }
}

// 消息插件
const MessagePlugin = {
  install(Vue) {
    const Constructor = Vue.extend(Message);
    const instance = new Constructor({
      el: document.createElement('div')
    });
    document.body.appendChild(instance.$el);

    Vue.prototype.$message = (type, msg) => {
      instance.type = type
      instance.message = msg;
      instance.show = true;
      setTimeout(instance.close, 4500);
    }
  }
}

export { MessagePlugin, LoadingPlugin }
