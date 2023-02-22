const { verifyToken } = require('./jwt')
const { getAllUser } = require('./data')

const foundUser = (uid) => {
  if (!uid) return false

  const users = getAllUser()
  const usersUid = Object.keys(users)

  return usersUid.includes(uid)
}

const auth = (req, res, next) => {
  const authHeader = req.headers?.authorization

  const token = authHeader && authHeader.split(' ')[1]

  const verify = verifyToken(token)

  if (!verify.valid) {
    res.status(403).send({ message: 'token was not valid' })
  }

  if (!foundUser(verify.data.userUid)) {
    res.status(403).send({ message: 'user not found' })
  }

  req.user = verify

  next()
}

module.exports = {
  auth,
}
