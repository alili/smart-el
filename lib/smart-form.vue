<template lang="pug">
el-form.smart-form(:data='data', :size="size || 'mini'", :inline='isInline', :label-position='labelPosition', :label-width='labelWidth')
  el-form-item(v-for='(item, index) in realConfig', :key='index')
    span(slot='label') {{item.label}}
      el-popover(width='200', trigger='hover')
        i.el-icon-question(v-if='item.reminder', slot='reference')
        div(v-html='item.reminder')
    //- 渲染 switch 组件
    el-switch(v-if="item.type === 'switch'", v-model='data[item.prop]')
    //- 渲染 cascader 组件
    el-cascader(v-if="item.type === 'cascader'", :options='item.options', v-model='data[item.prop]', :filterable="item.filterable")
    //- 渲染 select 组件
    el-select(v-if="item.type === 'select'", :multiple='item.multiple', :allow-create="item.allowCreate", :default-first-option="item.defaultFirstOption", :filterable='item.filterable || item.allowCreate', v-model='data[item.prop]', :placeholder='item.placeholder', :disabled="typeof item.disabled === 'function' ? item.disabled() : item.disabled", @change='selectChange.bind(this, item)()')
      el-option(v-for='option in customOptions.bind(this, item)()', :key='option.value', :label='option.label', v-html='option.custom && option.custom.bind(this, option)() || option.label', :value='option.value')
    //- 渲染 number 组件
    el-input(v-if="item.type === 'number'", type='number', v-model='data[item.prop]', :min='item.min || 0', :max='item.max || Math.infinity', :disabled='item.disabled', :placeholder='item.placeholder')
      template(v-if='item.append', slot='append') {{item.append}}
      template(v-if='item.prepend', slot='prepend') {{item.prepend}}
    //- 渲染 text 组件
    el-input(v-if="item.type === 'text'", v-model='data[item.prop]', :disabled='item.disabled', :placeholder='item.placeholder')
      template(v-if='item.append', slot='append') {{item.append}}
      template(v-if='item.prepend', slot='prepend') {{item.prepend}}
    //- 渲染  date 组件
    el-date-picker(v-if="item.type === 'date'", v-model='data[item.prop]',type='date', :disabled='item.disabled', :placeholder='item.placeholder')
    //- 渲染  datetimerange 组件
    //- 渲染  daterange 组件
    el-date-picker(v-if="item.type === 'daterange'", v-model='data[item.prop]',type='daterange', :disabled='item.disabled', :placeholder='item.placeholder')
    //- 渲染  datetimerange 组件
    el-date-picker(v-if="item.type === 'datetimerange'", v-model='data[item.prop]',type='datetimerange', :disabled='item.disabled', :placeholder='item.placeholder')
    //- 渲染  slider 组件
    el-slider(v-if="item.type === 'slider'", v-model='data[item.prop]', :step="item.step", :min="item.min", :max="item.max", :show-stops="item.showStops")
    //- 渲染 textarea 组件
    el-input(v-if="item.type === 'textarea'", type='textarea', v-model='data[item.prop]', :disabled='item.disabled', :placeholder='item.placeholder')
    //- 渲染 password 组件
    el-input(v-if="item.type === 'password'", type='password', v-model='data[item.prop]', :placeholder='item.placeholder')
      template(v-if='item.append', slot='append') {{item.append}}
      template(v-if='item.prepend', slot='prepend') {{item.prepend}}

</template>
<script>

export default {
  name: 'SmartForm',
  props: {
    isInline: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'mini'
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    config: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.data = this.clone(this.value)
  },
  components: {},
  watch: {
    value: {
      handler (value) {
        this.data = this.clone(value)
      },
      deep: true
    },
    data: {
      handler (data) {
        if (JSON.stringify(this.data) !== JSON.stringify(this.value)) {
          this.$emit('input', data)
        }
      },
      deep: true
    }
  },
  computed: {
    realConfig () {
      return this.config.filter(item => this.isShow(item))
    }
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
        item.trigger.call(this.data)
      }
    },
    customOptions (item) {
      if (typeof item.options === 'function') {
        return item.options.call(this.data)
      } else {
        return item.options
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-select,
.el-cascader {
  width: 100%;
}
</style>
