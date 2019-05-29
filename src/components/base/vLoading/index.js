import Vue from 'vue';
import vLoading from './vLoading.vue'

const loadingConstructor = Vue.extend(vLoading);

loadingConstructor.prototype.close = function () {
    if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
    };
    this.show = false;
    this.$destroy();
};

const loading = (options = {}) => {
    if(options.target){
        if(typeof options.target === 'string'){
            options.target = document.querySelector(options.target);
        }
    }else{
        options.target = document.body;
    }

    let instance = new loadingConstructor({
        el: document.createElement('div'),
        data: options
    })
    let parent = options.target;
    parent.appendChild(instance.$el);
    instance.show = true;
    return instance
};

export default loading;