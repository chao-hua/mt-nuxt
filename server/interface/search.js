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

router.get('/resultsByKeywords', async (ctx) => {
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  const {
    status,
    data: { count, pois }
  } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword: ctx.query.keyword
    }
  })
  ctx.body = {
    code: status === 200 ? 0 : -1,
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})

export default router
