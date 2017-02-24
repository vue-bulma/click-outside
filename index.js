const validate = (binding) => {
  if (typeof binding.value !== 'function') {
    const compName = vNode.context.name
    let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function.`

    if (compName) { 
      warn += ` Found in component '${compName}'` 
    }
    
    console.warn(warn)
    return false
  }

  return true
}

export default {
  bind(el, binding, vNode) {
    if (!validate(binding)) return

    // Define Handler and cache it on the element
    const handler = (e) => {
      if (!vNode.context) return

      // some components may have related popup item, on which we shall prevent the click outside event handler.
      let popupItem = vNode.context.popupItem
      if (el.contains(e.target) || (popupItem && popupItem.contains(e.target))) return

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