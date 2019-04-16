<template lang="pug">
.smart-multi-form
  el-table(:data="data" stripe)
    el-table-column(
      v-for="(item, index) in config"
      :key="index"
      :label="item.label")
      template(slot-scope="scope")
        SmartItem(:type="item.type" v-model="scope.row[item.prop]")
    el-table-column(width="40")
      template(slot-scope="scope")
        el-button.close(type="danger" size="mini" icon="el-icon-close" circle @click="close(scope.$index)")
  el-button.btn(type="primary" @click="newLine") 新增
</template>
<script>
import SmartItem from './smart-item'
let clone = require('lodash.clone')

export default {
  name: 'SmartMultiForm',
  components: {
    SmartItem,
  },
  props: {
    value: {
      type: Array,
      required: true,
      default () { return [] },
    },
    config: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      data: null,
    }
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
  created () {
    this.data = clone(this.value)
  },
  mounted () {
  },
  methods: {
    newLine () {
      let obj = this.config.reduce((obj, item) => {
        obj[item.prop] = ''
        return obj
      }, {})
      this.value.push(obj)
    },
    close (index) {
      this.data.splice(index, 1)
    },
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.btn {
  width 100%
}
.close {
  width: 20px;
  height: 20px;
  padding: 0px;
  line-height: 20px;
  text-align: center;
  padding-left: 1px;
}
</style>
