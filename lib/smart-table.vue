<template lang="pug">
  el-table(:data="data" stripe :row-class-name="rowClassName")
    el-table-column(
      v-for="(item, index) in config"
      :key="index"
      :width="item.width"
      :min-width="item.minWidth"
      :label="item.label")
      template(slot-scope="scope")
        span(v-html="realValue.bind(this, scope.row, item)()")
    el-table-column(
      label="操作"
      :width="`${operations.length * 75}px`"
      v-if="operations.length")
      template(
        slot-scope="scope")
        el-popover(
          v-for="(btn, index) in operations"
          :disabled="!btn.check"
          placement="top"
          trigger="click"
          width="160"
          :key="index")
          p {{btn.check}}
          div(style="text-align: right; margin: 0")
            el-button(type="primary", size="mini", @click="btn.action.bind(this, scope)()") 确定
          el-button(
            slot="reference"
            :size="btn.size"
            :type="btn.type"
            :disabled="typeof btn.disabled === 'function' ? btn.disabled.bind(this, scope)() : btn.disabled"
            @click="!btn.check && btn.action.bind(this, scope)()"
          ) {{btn.label}}
</template>
<script>
export default {
  name: 'SmartTable',
  components: {},
  props: {
    data: {
      type: Array,
      required: true,
    },
    config: {
      type: Array,
      required: true,
    },
    operations: {
      type: Array,
      required: false,
      default () { return [] },
    },
  },
  data () {
    return {
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    realValue (row, item) {
      let value = row[item.prop]
      if (typeof item.formatter === 'function') {
        return item.formatter(row, item)
      } else {
        return value
      }
    },
    rowClassName ({ row, rowIndex }) {
      if (row.status) {
        return `${row.status}-row`
      }
      return ''
    },
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-button {
  margin 0 4px
}
</style>
