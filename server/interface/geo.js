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

export default router
