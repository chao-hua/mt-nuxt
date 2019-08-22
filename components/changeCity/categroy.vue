<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl v-for="item in block" :key="item.title" class="m-categroy-section">
      <dt :id="'city-'+item.title">{{ item.title }}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import Pinyin from 'js-pinyin'
export default {
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block: []
    }
  },
  async mounted() {
    const result = []
    const { status, data: { city } } = await this.$axios.get('/geo/city')
    if (status === 200) {
      let p, c
      const d = {}
      city.forEach((item) => {
        p = Pinyin.getFullChars(item.name).toLocaleUpperCase().slice(0, 1)
        c = p.charCodeAt(0)
        if (c > 64 && c < 91) {
          // 不存在该字母
          if (!d[p]) {
            d[p] = []
          }
          d[p].push(item.name)
        }
      })
      for (const [k, v] of Object.entries(d)) {
        result.push({
          city: v,
          title: k
        })
      }
      result.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      this.block = result
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/categroy.scss";
</style>
