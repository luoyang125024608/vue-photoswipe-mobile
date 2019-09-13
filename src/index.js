import Vue from 'vue'
import PreviewComponent from './previewer.vue'

var instance
PreviewComponent.open = function (index, list, params) {
  if (!instance) {
    var PreviewConstruct = Vue.extend(PreviewComponent)
    instance = new PreviewConstruct({ el: document.createElement('div') })
    document.body.appendChild(instance.$el)
  }
  instance.open(index, list, params)
}
PreviewComponent.close = function () {
  instance.close()
}
export default PreviewComponent
