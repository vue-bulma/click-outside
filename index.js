const Vue = require('vue')

Vue.directive('click-outside', {
  acceptStatement: true,
  priority: 700,
  bind () {
    Vue.util.on(document, 'click', this.handler, true)
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
    Vue.util.off(document, 'click', this.handler, true)
  }
})
