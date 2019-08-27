import Router from 'koa-router'
import axios from '../utils/axios'

const router = new Router({ prefix: '/search' })

router.get('/hotPlace', async (ctx) => {
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  const {
    status,
    data: { result }
  } = await axios.get('http://cp-tools.cn/search/hotPlace', {
    params: {
      city
    }
  })

  ctx.body = {
    code: status === 200 ? 0 : -1,
    result: status === 200 ? result : []
  }
})

router.get('/top', async (ctx) => {
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  const {
    status,
    data: { top }
  } = await axios.get('http://cp-tools.cn/search/top', {
    params: {
      city,
      input: ctx.query.input
    }
  })
  ctx.body = {
    code: status === 200 ? 0 : -1,
    top: status === 200 ? top : []
  }
})

export default router
