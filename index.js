const validate = binding => {
  if (typeof binding.value !== 'function') {
    let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function.` 
    console.warn(warn)
    return false
  }

  return true
}

const isPopup = (popupItem, elements) => {
  if (!popupItem) 
    return false

  for (let element of elements) {
    if (popupItem.contains(element)) 
      return true
    if (element.contains(popupItem))
      return false
  }

  return false
}

export default {
  bind(el, binding, vNode) {
    if (!validate(binding)) return

    // Define Handler and cache it on the element
    const handler = (e) => {
      if (!vNode.context) return

      // some components may have related popup item, on which we shall prevent the click outside event handler.
      let elements = e.composedPath()
      elements.unshift(e.target)    
      
      if (el.contains(e.target) || isPopup(vNode.context.popupItem, elements)) return

      binding.value(e)
    }

    // add Event Listeners
    el.__vueClickOutside__ = handler
    document.addEventListener('click', handler)
  },

  update(el, binding) {
    if (validate(binding)) el.__vueClickOutside__ = binding.value
  },
  
  unbind(el, binding) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__

  }
}