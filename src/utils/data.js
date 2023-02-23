const users = require('../data/user.json')
const creditBalances = require('../data/creditBalance.json')

const JOHN_UID = 'john_uid'
const SERENA_UID = 'serena_uid'

const randomUsers = () => {
  const mockUid = [JOHN_UID, SERENA_UID]
  const index = Math.floor(Math.random() * 2)
  return mockUid[index]
}

const getAllUser = () => {
  return users
}

const getUserData = (uid) => {
  if (uid) {
    return { ...users[uid] }
  }

  const random = randomUsers()
  return users[random]
}

const getCreditBalance = (uid) => {
  return creditBalances[uid]
}

module.exports = {
  getUserData,
  getAllUser,
  getCreditBalance,
}
