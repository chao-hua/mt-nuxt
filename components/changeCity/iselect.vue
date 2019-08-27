<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份" filterable>
      <el-option v-for="item in province" :key="item.id" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市" filterable>
      <el-option v-for="item in city" :key="item.id" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: []
    }
  },
  watch: {
    pvalue: async function (newValue, oldValue) {
      if (newValue) {
        const { status, data: { city } } = await this.$axios.get(`/geo/province/${newValue}`)
        if (status === 200) {
          this.city = city.map((item) => {
            return {
              value: item.id,
              label: item.name
            }
          })
          this.cvalue = ''
        }
      } else {
        this.city = []
      }
    }
  },
  async mounted() {
    const { status, data: { province } } = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.province = province.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function (query, cb) {
      if (this.cities.length) {
        cb(this.cities.filter((item) => { return item.value.includes(query) }))
      } else {
        const { status, data: { city } } = await this.$axios.get('/geo/city')
        if (status === 200) {
          this.cities = city.map((item) => {
            return {
              value: item.name
            }
          })
          cb(this.cities.filter((item) => { return item.value.includes(query) }))
        } else {
          const emity = []
          cb(emity)
        }
      }
    }, 200),
    handleSelect: function (item) {
      this.$store.commit('geo/setPosition', { city: item.value, province: '' })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
