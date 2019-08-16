<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="menuLeave">
      <dt>全部种类</dt>
      <dd v-for="(item,index) of menu" :key="index" @mouseenter="menuEnter">
        <i :class="item.type" />
        {{ item.name }}
        <span class="arrow" />
      </dd>
    </dl>
    <div v-if="kind" class="detail" @mouseenter="detailEnter" @mouseleave="detailLeave">
      <template v-for="(item,index) of curdetail.child">
        <h4 :key="index">
          {{ item.title }}
        </h4>
        <span v-for="(v,idx) in item.child" :key="idx">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '',
      menu: [{
        type: 'food',
        name: '美食',
        child: [{
          title: '美食',
          child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
        }]
      }, {
        type: 'takeout',
        name: '外卖',
        child: [{
          title: '外卖',
          child: ['美团外卖']
        }]
      }, {
        type: 'hotel',
        name: '酒店',
        child: [{
          title: '酒店星级',
          child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
        }]
      }]
    }
  },
  computed: {
    curdetail() {
      return this.menu.find(item =>
        item.type === this.kind
      )
    }
  },
  methods: {
    menuEnter(e) {
      this.kind = e.target.querySelector('i').className
    },
    menuLeave() {
      this._timmer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    detailEnter() {
      clearTimeout(this._timmer)
    },
    detailLeave() {
      this.kind = ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
