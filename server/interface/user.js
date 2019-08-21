import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/user'
import config from '../dbs/config'
import axios from '../utils/axios'
import passport from '../utils/passport'

const router = new Router({ prefix: '/user' })
const Store = new Redis().client

// 注册
router.post('/signup', async (ctx) => {
  const { username, password, email, code } = ctx.request.body

  // 验证用户名
  if (username) {
    const user = await User.find({ username })
    if (user.length) {
      ctx.body = {
        code: -1,
        msg: '用户名已被注册'
      }
      return false
    }
  }
  // 验证验证码
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新发送'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请输入正确的验证码'
      }
      return false
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请输入验证码'
    }
    return false
  }

  // 保存用户信息
  const nuser = await User.create({ username, password, email })
  if (nuser) {
    const res = await axios.post('/user/signin', { username, password })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

// 登录
router.post('/signin', (ctx, next) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else if (user) {
      ctx.body = {
        code: 0,
        msg: '登录成功',
        user
      }
      return ctx.login(user)
    } else {
      ctx.body = {
        code: 1,
        msg: info
      }
    }
  })(ctx, next)
})

// 发送验证邮件
router.post('/verify', async (ctx) => {
  const username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }

  const transporter = nodeMailer.createTransport({
    service: config.smtp.service,
    port: config.smtp.port,
    secure: false,
    secureConnection: true, // 使用 SSL
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    }
  })

  const ko = {
    code: config.smtp.code(),
    expire: config.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  const mailOptions = {
    from: `认证邮件 <${config.smtp.user}>`,
    to: ko.email,
    subject: '美团网注册码',
    html: `您正在美团网进行注册，注册码是${ko.code}`
  }

  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: '注册码邮件发送失败'
      }
      return false
    } else {
      Store.hmset(
        `nodemail:${ko.user}`,
        'code',
        ko.code,
        'expire',
        ko.expire,
        'email',
        ko.email
      )
    }
  })

  ctx.body = {
    code: 0,
    msg: '验证码已发送，有效期为一分钟'
  }
})

// 退出
router.get('/exit', async (ctx) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户信息
router.get('/getUser', (ctx) => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      code: 0,
      user: username,
      email
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

export default router
