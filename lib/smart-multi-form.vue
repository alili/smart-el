<template lang="pug">
.smart-multi-form
  el-table(:data="tableData" stripe)
    el-table-column(
      v-for="(item, index) in config"
      :key="JSON.stringify(item)"
      :label="item.label")
      template(#default="{row}")
        SmartItem(:type="item.type" size="mini" v-model="row[item.prop]" :config="item" :formData="row")
    el-table-column(width="40")
      template(#default="{$index}" v-if="$index !== tableData.length - 1")
        el-button.close(type="danger" size="mini" icon="el-icon-close" circle @click="close($index)")
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
      tableData: [],
    }
  },
  watch: {
    value: {
      handler (value) {
        this.tableData = clone(value)
      },
      immediate: true,
      deep: true,
    },
    tableData: {
      handler (tableData) {
        if (JSON.stringify(this.tableData) !== JSON.stringify(this.value)) {
          this.$emit('input', tableData)
        }
        if (!tableData.length || Object.values(tableData[tableData.length - 1]).join('') !== '') {
          this.newLine()
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {},
  created () {
  },
  mounted () {
    this.tableData = clone(this.value)
    this.$nextTick(() => {
      this.newLine()
    })
  },
  methods: {
    newLine () {
      let obj = this.config.reduce((obj, item) => {
        obj[item.prop] = ''
        return obj
      }, {})
      this.tableData.push(obj)
    },
    close (index) {
      this.tableData.splice(index, 1)
    },
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.close {
  width: 20px;
  height: 20px;
  padding: 0px;
  line-height: 20px;
  text-align: center;
  padding-left: 1px;
}
</style>
