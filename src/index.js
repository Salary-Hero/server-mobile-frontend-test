const express = require('express')
const bodyParser = require('body-parser')

const { generateToken } = require('./utils/jwt')
const { auth, delay } = require('./utils/middleware')
const { getUserData, getCreditBalance } = require('./utils/data')

const app = express()

const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/v1/signin', async (req, res) => {
  const { phone } = req.body

  if (!phone) {
    return res.status(400).send({ message: 'phone is missing' })
  }

  const user = getUserData()

  const payload = {
    userUid: user.uid,
    phone,
  }

  const token = generateToken(payload)

  await delay(500)

  res.send(token)
})

app.use(auth)

app.get('/api/v1/user/profile', async (req, res) => {
  const userData = req.user
  const userUid = userData.data.userUid

  const user = getUserData(userUid)

  res.send({ data: user })
})

app.get('/api/v1/user/transactions', async (req, res) => {
  const userData = req.user
  const userUid = userData.data.userUid

  const creditBalance = getCreditBalance(userUid)

  res.send({ data: creditBalance })
})

app.post('/api/v1/user/withdraw', async (req, res) => {
  const { amount } = req.body

  if (!amount) {
    res.status(400).send({ message: 'amount is missing' })
    return
  }

  const userData = req.user
  const userUid = userData.data.userUid

  const creditBalance = getCreditBalance(userUid)

  if (amount > creditBalance.available / 2) {
    res.status(400).send({ message: 'creditBalance is not available' })
    return
  }

  await delay(1000)

  res.status(200).send({ message: 'success' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
