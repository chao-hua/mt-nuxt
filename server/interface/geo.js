import Router from 'koa-router'
import axios from '../utils/axios'

const router = new Router({ prefix: '/geo' })

router.get('/getPosition', async (ctx) => {
  const {
    status,
    data: { province, city }
  } = await axios.get('http://cp-tools.cn/geo/getPosition')

  if (status === 200) {
    ctx.body = {
      code: 0,
      province,
      city
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

export default router
