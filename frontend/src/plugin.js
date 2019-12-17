import Loading from '@/components/Loading.vue'
import Progress from '@/components/Progress.vue'
import Message from '@/components/Message.vue'

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
      instance.show = true;
    },
    Vue.prototype.$loaded = () => {
      instance.show = false;
    }
  }
}

const ProgressPlugin = {
  install(Vue) {
    const Constructor = Vue.extend(Progress);
    const instance = new Constructor({
      el: document.createElement('div')
    });
    document.body.appendChild(instance.$el);

    Vue.prototype.$loading = () => {
      instance.show = true;
    },
    Vue.prototype.$loaded = () => {
      instance.show = false;
    }
  }
}

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

export { MessagePlugin, LoadingPlugin, Progress}
