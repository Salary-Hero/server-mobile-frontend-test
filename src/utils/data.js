const users = require('../data/user.json')
const creditBalances = require('../data/creditBalance.json')

const randomUsers = () => {
  const mockUid = ['john_uid', 'serena_uid']
  const index = Math.floor(Math.random() * 2)
  return mockUid[index]
}

const getAllUser = () => {
  return users
}

const getUserData = (uid) => {
  if (uid) {
    return users[uid]
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
