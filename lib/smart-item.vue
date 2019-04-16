<template lang="pug">
.template
  //- 渲染 switch 组件
  el-switch(v-if="type === 'switch'", v-model='data')
  //- 渲染 number 组件
  el-input(v-if="type === 'number'", type='number', v-model='data')
  //- 渲染 text 组件
  el-input(v-if="type === 'text'", v-model='data')
  //- 渲染 textarea 组件
  el-input(v-if="type === 'textarea'", type='textarea', v-model='data')
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
  methods: {},
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
