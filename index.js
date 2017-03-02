function validate(binding) {
  if (typeof binding.value !== 'function') {
    console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.')
    return false
  }

  return true
}

function isPopup(popupItem, elements) {
  if (!popupItem) 
    return false

  for (var i = 0, len = elements.length; i < len; i++) {
    if (popupItem.contains(elements[i])) 
      return true
    if (elements[i].contains(popupItem))
      return false
  }

  return false
}

exports = module.exports = {
  bind: function (el, binding, vNode) {
    if (!validate(binding)) return

    // Define Handler and cache it on the element
    function handler(e) {
      if (!vNode.context) return

      // some components may have related popup item, on which we shall prevent the click outside event handler.
      var elements = e.composedPath()
      elements.unshift(e.target)    
      
      if (el.contains(e.target) || isPopup(vNode.context.popupItem, elements)) return

      binding.value(e)
    }

    // add Event Listeners
    el.__vueClickOutside__ = handler
    document.addEventListener('click', handler)
  },

  update: function (el, binding) {
    if (validate(binding)) el.__vueClickOutside__ = binding.value
  },
  
  unbind: function (el, binding) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__

  }
}