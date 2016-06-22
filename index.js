import Vue from 'vue'

const { on, off } = Vue.util

Vue.directive('click-outside', {
	bind () {
		document.addEventListener('click', this.handle, true)
	},
	update (onClickOutside) {
		this.handle = (e) => {
			if (!this.el.contains(e.target)) onClickOutside(e)
		}
	},
	unbind () {
		document.addEventListener('click', this.handle, true)
	}
})
