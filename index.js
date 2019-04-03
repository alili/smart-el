/**
 * @Author: wangdaohan
 * @Date:   2018-01-15T15:54:07+08:00
 * @Email:  wangdaohan@didichuxing.com
 * @Filename: smart.js
 * @Last modified by:   wangdaohan
 * @Last modified time: 2018-03-30T21:47:08+08:00
 */
import SmartForm from './lib/smart-form'
import SmartTable from './lib/smart-table'
import SmartInfo from './lib/smart-info'
import Board from './lib/board'

const smart = {}
smart.install = function (Vue) {
  Vue.mixin({
    components: {
      SmartForm,
      SmartTable,
      SmartInfo,
      Board,
    },
  })
}

export default smart
