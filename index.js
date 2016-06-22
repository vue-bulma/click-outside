const Vue = require('vue')

const { on, off } = Vue.util

Vue.directive('click-outside', {
  priority: 700,
  bind () {
    on(document, 'click', this.handler, true)
  },
  update (onClickOutside) {
    if (!this.descriptor.raw) {
      onClickOutside = () => {}
    }
    this.unbind()
    this.handler = (e) => {
      if (!this.el.contains(e.target)) onClickOutside(e)
    }
    this.bind()
  },
  unbind () {
    off(document, 'click', this.handler, true)
  }
})
