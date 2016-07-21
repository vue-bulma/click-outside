# ClickOutside

Vue click outside directive.

## Installation

```
$ npm install vue-click-outside
```

## Example

```vue
<template>
  <div v-click-outside="hide"></div>
</template>

<script>
export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    toggle () {
      this.opened = !this.opened
    },

    hide () {
      this.opened = false
    }
  },

  watch: {
    opened () {
      this.dropdown.classList.toggle('open')
    }
  }
}
</script>
```

## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)
![](https://img.shields.io/badge/status-stable-green.svg)

---

> [fundon.me](https://fundun.me) &nbsp;&middot;&nbsp;
> GitHub [@fundon](https://github.com/fundon) &nbsp;&middot;&nbsp;
> Twitter [@_fundon](https://twitter.com/_fundon)
