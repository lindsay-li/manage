import CommonIcon from '../common-icon'
// import { showTitle } from '@/libs/util'
export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle (item) {
      return this.showTitles(item, this)
    },
    showChildren (item) {
      return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
    },
    getNameOrHref (item, children0) {
      return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
    },
    showTitles(item, vm){
      var useI18n = false;
      let { title, __titleIsFunction__ } = item.meta
      if (!title) return
      if (useI18n) {
        if (title.includes('{{') && title.includes('}}') && useI18n) title = title.replace(/({{[\s\S]+?}})/, (m, str) => str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim())))
        else if (__titleIsFunction__) title = item.meta.title
        else title = vm.$t(item.name)
      } else title = (item.meta && item.meta.title) || item.name
      return title
    }
  }
}
