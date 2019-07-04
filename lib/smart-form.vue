<template lang="pug">
el-form.smart-form(:data='data', :size="size || 'mini'", :inline='isInline', :label-position='labelPosition', :label-width='labelWidth')
  el-row(:gutter="gutter")
    el-col(v-for="(item, index) in realConfig"
      :key='index'
      :span="item.span || span"
      :push="item.push || 0"
      :pull="item.pull || 0"
      :offset="item.offset || 0")
      el-form-item
        span(slot='label') {{item.label}}
          el-popover(width='200', trigger='hover')
            i.el-icon-question(v-if='item.reminder', slot='reference' tabIndex="-1")
            div(v-html='item.reminder')
        //- 渲染 switch 组件
        el-switch(v-if="item.type === 'switch'", v-model='data[item.prop]')
        //- 渲染 cascader 组件
        el-cascader(v-if="item.type === 'cascader'", :options='item.options', v-model='data[item.prop]', :filterable="item.filterable")
        //- 渲染 select 组件
        el-select(v-if="item.type === 'select'", :multiple='item.multiple', :allow-create="item.allowCreate", :default-first-option="item.defaultFirstOption", :filterable='item.filterable || item.allowCreate', v-model='data[item.prop]', :placeholder='item.placeholder', :disabled="typeof item.disabled === 'function' ? item.disabled() : item.disabled", @change='selectChange.bind(this, item)()')
          template(v-if="item.groups")
            el-option-group(v-for='group in customGroups.bind(this, item)()', :key='group.label', :label='group.label')
              el-option(v-for='option in group.children', :key='option.value', :label='option.label', v-html='option.custom && option.custom.bind(this, option)() || option.label', :value='option.value')
          template(v-else)
            el-option(v-for='option in customOptions.bind(this, item)()', :key='option.value', :label='option.label', v-html='option.custom && option.custom.bind(this, option)() || option.label', :value='option.value')
        //- 渲染 number 组件
        el-input(v-if="item.type === 'number'", type='number', v-model='data[item.prop]', :min='item.min || 0', :max='item.max || Math.infinity', :disabled='item.disabled', :placeholder='item.placeholder', :clearable="!!item.clearable")
          el-select(v-if="item.append && item.append.type === 'select'", slot='append' :style="item.append.style" :multiple='item.append.multiple', :allow-create="item.append.allowCreate", :default-first-option="item.append.defaultFirstOption", :filterable='item.append.filterable || item.append.allowCreate', v-model='data[item.append.prop]', :placeholder='item.append.placeholder', :disabled="typeof item.append.disabled === 'function' ? item.append.disabled() : item.append.disabled", @change='selectChange.bind(this, item.append)()')
            el-option(v-for='option in customOptions.bind(this, item.append)()', :key='option.value', :label='option.label', v-html='option.custom && option.custom.bind(this, option)() || option.label', :value='option.value')
          template(v-else-if='item.append', slot='append') {{item.append}}
          template(v-if='item.prepend', slot='prepend') {{item.prepend}}
        //- 渲染 text 组件
        el-input(v-if="item.type === 'text'", v-model='data[item.prop]', :disabled='item.disabled', :placeholder='item.placeholder', :clearable="!!item.clearable")
          template(v-if='item.append', slot='append') {{item.append}}
          template(v-if='item.prepend', slot='prepend') {{item.prepend}}
        //- 渲染  autocomplete 组件
        el-autocomplete(v-if="item.type === 'autocomplete'", v-model='data[item.prop]', :fetch-suggestions="item.suggestions.bind(data)" @select="item.select" :disabled='item.disabled', :placeholder='item.placeholder', highlight-first-item)
        //- 渲染  date 组件
        el-date-picker(v-if="item.type === 'date'", v-model='data[item.prop]',type='date', :disabled='item.disabled', :placeholder='item.placeholder')
        //- 渲染  datetime 组件
        el-date-picker(v-if="item.type === 'datetime'", v-model='data[item.prop]',type='datetime', :disabled='item.disabled', :placeholder='item.placeholder')
        //- 渲染  daterange 组件
        el-date-picker(v-if="item.type === 'daterange'", v-model='data[item.prop]',type='daterange', :disabled='item.disabled', :placeholder='item.placeholder')
        //- 渲染  datetimerange 组件
        el-date-picker(v-if="item.type === 'datetimerange'", v-model='data[item.prop]',type='datetimerange', :disabled='item.disabled', :placeholder='item.placeholder')
        //- 渲染  slider 组件
        el-slider(v-if="item.type === 'slider'", v-model='data[item.prop]', :step="item.step", :min="item.min", :max="item.max", :show-stops="item.showStops")
        //- 渲染 textarea 组件
        el-input(v-if="item.type === 'textarea'", type='textarea', v-model='data[item.prop]', :disabled='item.disabled', :rows='item.rows',:placeholder='item.placeholder')
        //- 渲染 password 组件
        el-input(v-if="item.type === 'password'", type='password', v-model='data[item.prop]', :placeholder='item.placeholder')
          template(v-if='item.append', slot='append') {{item.append}}
          template(v-if='item.prepend', slot='prepend') {{item.prepend}}
</template>
<script>
let clone = require('lodash.clone')

export default {
  name: 'SmartForm',
  props: {
    isInline: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'mini',
    },
    gutter: {
      type: Number,
      default: 24,
    },
    labelPosition: {
      type: String,
      default: 'left',
    },
    labelWidth: {
      type: String,
      default: '80px',
    },
    config: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    span: {
      type: Number,
      default: 6,
    },
  },
  data () {
    return {
      data: {},
    }
  },
  created () {
    this.data = clone(this.value)
  },
  components: {},
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
  computed: {
    realConfig () {
      return this.config
        .map((item) => {
          if (item.type === 'autocomplete') {
            item.select = (item.trigger || function () {}).bind(null, this.data)
          }
          return item
        })
        .filter(item => this.isShow(item))
    },
  },
  methods: {
    isShow (item) {
      if (item.visible) {
        return item.visible.apply(this.data)
      }
      return true
    },
    selectChange (item) {
      if (item.trigger) {
        item.trigger.call(this.data, item)
      }
    },
    localSelect (item, data) {
      if (item.select) {
        item.select.call(data, item)
      }
    },
    customOptions (item) {
      if (typeof item.options === 'function') {
        return item.options.call(this.data)
      } else {
        return item.options
      }
    },
    customGroups (item) {
      if (typeof item.groups === 'function') {
        return item.groups.call(this.data)
      } else {
        return item.groups
      }
    },
  },
}
</script>
<style lang="stylus" scoped>
.smart-form
  .el-select,
  .el-autocomplete,
  .el-cascader {
    width: 100%;
  }
  >>>.el-form-item__content .el-input-group {
    vertical-align: bottom;
  }
</style>
