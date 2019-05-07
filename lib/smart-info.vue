<template lang="pug">
.smart-info
  .row(
    v-for="(row, index) in config"
    :key="index")
    span.label(v-if="!row.type") {{row.label}}:
    el-tag(v-else :type="row.type") {{row.label}}:
    template(v-if="Array.isArray(realdata(row))")
      smart-table(:data="realdata(row)" :config="formatterConfig(realdata(row))")
    template(v-else)
      span {{realdata(row)}}
</template>
<script>
export default {
  name: 'SmartInfo',
  components: {},
  props: {
    data: {
      type: Object,
      required: true,
    },
    config: {
      type: Array,
      required: true,
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
    realdata (row) {
      return row.formatter ? row.formatter(this.data)
        : ((!this.data[row.prop] && this.data[row.prop] !== 0) ? '-' : this.data[row.prop])
    },
    formatterConfig (data) {
      return Object.keys(data[0]).map(item => {
        return {
          label: item,
          prop: item,
        }
      })
    },
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.row {
  margin-bottom 10px
}
.el-tag {
  margin-bottom 5px
  margin-right 10px
}
.label {
  font-weight bold
  margin-right 10px
}
</style>
