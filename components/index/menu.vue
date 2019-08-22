<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="menuLeave">
      <dt>全部种类</dt>
      <dd v-for="(item,index) of $store.state.menu.menu" :key="index" @mouseenter="menuEnter">
        <i :class="item.type" />
        {{ item.name }}
        <span class="arrow" />
      </dd>
    </dl>
    <div v-if="kind" class="detail" @mouseenter="detailEnter" @mouseleave="detailLeave">
      <template v-for="(item,idx) of curdetail.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span v-for="v in item.child" :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: ''
    }
  },
  computed: {
    curdetail() {
      return this.$store.state.menu.menu.find(item =>
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
