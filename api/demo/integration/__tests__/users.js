import axios from 'axios'
import startServer from '../start-server'

let server

beforeAll(() => {
  return startServer().then(s => {
    server = s
  })
})

afterAll(done => {
  server.close(done)
})

test('can get users', () => {
  return axios.get('http://localhost:3001/api/users').then(response => {
    //console.log(response.data.users)
    //throw new Error("Can't get users")
    const user = response.data.users[0]
    expect(user).toMatchObject({
      name: expect.any(String),
      username: expect.any(String),
    })
  })
})

test('can get one or two users at offset of three', () => {
  const fiveUsersPromise = axios
    .get('http://localhost:3001/api/users?limit=5')
    .then(response => response.data.users)

  const twoUsersPromise = axios
    .get('http://localhost:3001/api/users?limit=2&offset=3')
    .then(response => response.data.users)

  return Promise.all([fiveUsersPromise, twoUsersPromise]).then(([
    fiveUsers,
    twoUsers,
  ]) => {
    expect(fiveUsers.length).toBe(5)
    expect(twoUsers.length).toBe(2)

    const [firstUser, secondUser] = twoUsers
    const [, , , firstUserAll, secondUserAll] = fiveUsers

    expect(firstUser).toEqual(firstUserAll)
  })
})
