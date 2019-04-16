<template lang="pug">
.board
  .title {{title}}
  .content
    slot
</template>
<script>

export default {
  name: 'Board',
  props: {
    title: {
      type: String,
      default: '标题',
    },
    md: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
    }
  },
  created () {},
  components: {},
  computed: {},
  methods: {},
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.board {
  width 100%
  box-sizing border-box
  margin 20px 0
  border 1px solid #aaa
  position relative
  padding 20px
  .title {
    position absolute
    top -12px
    left 10px
    padding 0 10px
    background-color #fff
  }
  .content {
    min-width 100%
  }
  ul {
    padding-left 0
  }
  >>>img {
    max-width 100%
  }
}
</style>
