<template lang="pug">
.template
  //- 渲染 switch 组件
  el-switch(v-if="type === 'switch'", :size="size" v-model='data')
  //- 渲染 number 组件
  el-input(v-if="type === 'number'", :size="size" type='number', v-model='data')
  //- 渲染 text 组件
  el-input(v-if="type === 'text'", :size="size" v-model='data')
  //- 渲染 textarea 组件
  el-input(v-if="type === 'textarea'", :size="size" type='textarea', v-model='data')
  //- 渲染 select 组件
  el-select(v-if="type === 'select'", :size="size" :multiple='config.multiple', :allow-create="config.allowCreate", :default-first-option="config.defaultFirstOption", :filterable='config.filterable || config.allowCreate', v-model='data', :placeholder='config.placeholder', :disabled="typeof config.disabled === 'function' ? config.disabled() : config.disabled", @change='selectChange.bind(this, config)()')
    template(v-if="config.groups")
      el-option-group(v-for='group in customGroups.bind(this, config)()', :key='group.label', :label='group.label')
        el-option(v-for='option in group.children', :key='option.value', :label='option.label', v-html='option.custom && option.custom.bind(this, option)() || option.label', :value='option.value')
    template(v-else)
      el-option(v-for='option in customOptions.bind(this, config)()', :key='option.value', :label='option.label', v-html='option.custom && option.custom.bind(this, option)() || option.label', :value='option.value')

</template>
<script>
let clone = require('lodash.clone')

export default {
  name: 'SmartItem',
  components: {},
  props: {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Boolean, Array, Number, Object],
    },
    size: {
      type: [String],
      default: 'mini',
    },
    config: {
      type: [Object],
      required: false,
    },
  },
  data () {
    return {
      data: '',
    }
  },
  created () {
    this.data = clone(this.value)
  },
  watch: {
    value: {
      handler (value) {
        this.data = clone(value)
      },
      deep: true,
    },
    data: {
      handler (data) {
        if (JSON.stringify(this.data) !== JSON.stringify(this.value)) {
          this.$emit('input', data)
        }
      },
      deep: true,
    },
  },
  computed: {},
  mounted () {},
  methods: {
    selectChange (item) {
      if (item.trigger) {
        item.trigger.call(this.data, item)
      }
    },
    customOptions (item) {
      if (typeof item.options === 'function') {
        return item.options.call(this.data)
      } else {
        return item.options
      }
    },
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
