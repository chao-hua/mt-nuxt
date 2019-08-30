<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>
        {{ name }}
        <i class="el-icon-arrow-down el-icon--right" />
      </dt>
      <dd>
        <h3>{{ name }}</h3>
        <span v-for="(item,idx) in list" :key="idx">{{ item }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
.m-product-select {
    // vat
//   padding-bottom: 5px;
  min-width: 120px;

  .tab {
    position: relative;

    dt {
      font-size: 14px;
      line-height: 24px;
    }

    dd {
      &:before {
        content: " ";
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent transparent #e5e5e5;
        border-style: solid;
        border-width: 5px;
        top: -11px;
      }

      &:after {
        content: " ";
        position: absolute;
        top: -8px;
        left: 16px;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent transparent #fff;
        border-style: solid;
        border-width: 4px;
      }

      display: none;
      top: 24px;
      width: 510px;
      background: #fff;
      position: absolute;
      cursor: auto;
      user-select: text;
      white-space: normal;
      font-size: 12px;
      text-align: left;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      padding: 19px 15px 9px;

      span {
        display: inline-block;
        min-width: 120px;
        line-height: 1.5;
        font-weight: 500;
      }

      h3 {
        color: #ccc;
        font-size: 16px;
        margin-bottom: 11px;
      }
    }

    &:hover {
      dd {
        display: block;
        z-index: 999;
      }
    }
  }
}
</style>
