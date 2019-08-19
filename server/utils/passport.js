import Passport from 'koa-passport'
import PassportLocal from 'passport-local'

import User from '../dbs/models/user'

Passport.use(
  new PassportLocal(async function(username, password, done) {
    const where = { username }
    const result = await User.findOne(where)
    if (result != null) {
      if (result.password === password) {
        return done(null, result)
      } else {
        return done(null, false, '密码错误')
      }
    } else {
      return done(null, false, '用户不存在')
    }
  })
)

Passport.serializeUser(function(user, done) {
  done(null, user)
})

Passport.deserializeUser(function(user, done) {
  done(null, user)
})

export default Passport
