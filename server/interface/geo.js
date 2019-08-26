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
      code: -1,
      province: '',
      city: ''
    }
  }
})

router.get('/menu', async (ctx) => {
  const {
    status,
    data: { menu }
  } = await axios.get('http://cp-tools.cn/geo/menu')
  if (status === 200) {
    ctx.body = { code: 0, menu }
  } else {
    ctx.body = { code: -1, menu: [] }
  }
})

router.get('/city', async (ctx) => {
  const {
    status,
    data: { city }
  } = await axios.get('http://cp-tools.cn/geo/city')
  if (status === 200) {
    ctx.body = { code: 0, city }
  } else {
    ctx.body = { code: -1, city: [] }
  }
})

router.get('/hotCity', async (ctx) => {
  const {
    status,
    data: { hots }
  } = await axios.get('http://cp-tools.cn/geo/hotCity')
  if (status === 200) {
    ctx.body = {
      code: 0,
      hots
    }
  } else {
    ctx.body = {
      code: -1,
      hots: []
    }
  }
})

router.get('/province', async (ctx) => {
  const {
    status,
    data: { province }
  } = await axios.get('http://cp-tools.cn/geo/province')

  ctx.body = {
    code: status === 200 ? 0 : -1,
    province: status === 200 ? province : []
  }
})

router.get('/province/:id', async (ctx) => {
  const {
    status,
    data: { city }
  } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`)

  ctx.body = {
    code: status === 200 ? 0 : -1,
    city: status === 200 ? city : []
  }
})

export default router
