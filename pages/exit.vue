<template>
  <div />
</template>

<script>
export default {
  layout: 'black',
  middleware: async (ctx) => {
    const { status, data } = await ctx.$axios.get('/user/exit')
    if (status === 200 && data && data.code === 0) {
      window.location.href = '/'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
