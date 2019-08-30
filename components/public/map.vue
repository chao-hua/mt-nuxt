<template>
  <div :id="id" :style="{width:width+'px',height:height+'px',margin:'34px auto'}" class="m-map"></div>
</template>

<script>
export default {
  props: {
    point: {
      type: Array,
      default: () => {
        return [116.46, 39.92]
      }
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      id: `map${Math.random().toString().slice(4, 8)}`,
      key: '0dbc0dfd7c775f2a927174493eab8220',
      map: undefined,
      marker: undefined
    }
  },
  watch: {
    point(newValue, oldValue) {
      this.map.setCenter(newValue)
      this.marker.setPosition(newValue)
    }
  },
  mounted() {
    window.onmaploaded = () => {
      const map = new window.AMap.Map(this.id, {
        resizeEnable: true,
        zomm: 11,
        center: this.point
      })
      this.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        const toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        const marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: this.point
        })
        this.marker = marker
        marker.setMap(map)
      })
    }

    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${this.key}&callback=onmaploaded`
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }
}
</script>

<style lang="scss" scoped>
</style>
