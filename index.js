const Vue = require('vue')

Vue.directive('click-outside', {
  acceptStatement: true,
  priority: 700,
  bind: function () {
    Vue.util.on(document, 'click', this.handler, true)
  },
  update: function (onClickOutside) {
    if (!this.descriptor.raw) {
      onClickOutside = function () {}
    }
    this.unbind()
    var el = this.el
    this.handler = function (e) {
      if (el && !el.contains(e.target)) onClickOutside(e)
    }
    this.bind()
  },
  unbind: function () {
    Vue.util.off(document, 'click', this.handler, true)
  }
})
