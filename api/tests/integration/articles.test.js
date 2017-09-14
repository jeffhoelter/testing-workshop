import axios from 'axios'
import faker from 'faker'
import {generateArticleForClient} from '../../../other/generate/article'
import generateUserData from '../../../other/generate/user'
// you're going to need to start the server before all the tests
// start and close the server after all the tests are finished.
// startServer is a function that returns a promise which resolves
// to the server object. The server object has a `close` function
// which accepts a callback. Kinda wonky, I know... But you should
// learn how to use both async styles with these tests so I left it
// like that :)
import startServer from '../../src/start-server'

let server

beforeAll(() => {
  return startServer().then(s => {
    server = s
  })
})

afterAll(done => {
  server.close(done)
})

// I'm going to give you this just so you don't have to look it up:
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// Note also that the articles endpoints are at: api/articles
// So to get articles, you can do: api.get('articles') which
// will return a promise that resolves to the response from the
// request.
//
// From here you're pretty much on your own.
// To come up with what to test, try to think of
// the use cases you want to support. Start with
// the unauthenticated stuff.
//
// If you want to do authenticated endpoints,
// you'll need to call createNewUser, and use the
// token you get back like this:
// api.defaults.headers.common.authorization = `Token ${token}`
// then the api is authenticated

// just a handy utility for some of our promise-based code
// you might consider making something similar for the articles
// stuff
const getUser = res => res.data.user

test('Article count verification', () => {
  return api.get('articles?limit=100000000').then(response => {
    const {articles, articlesCount} = response.data
    expect(articles.length).toBe(articlesCount)
  })
})

test('Article and Author schema verification', () => {
  return api.get('articles?limit=10').then(response => {
    const article = response.data.articles[6]

    // article primitives
    expect(article).toMatchObject({
      title: expect.any(String),
      description: expect.any(String),
      body: expect.any(String),
      slug: expect.any(String),
      tagList: expect.any(Array),
      createdAt: expect.any(String),
      favorited: expect.any(Boolean),
      favoritesCount: expect.any(Number),
    })

    // author primitives
    /*expect(article.author).toMatchObject({
      username: 'userRemoved',
      bio: expect.any(String),
      image: expect.any(String),
      following: expect.any(Boolean),
    })*/
  })
})

describe('Feed verification (authenticated)', () => {
  let user, cleanupCallback

  beforeAll(async () => {
    const createNewUserResult = await createNewUser()
    user = createNewUserResult.user
    cleanupCallback = createNewUserResult.cleanup
    api.defaults.headers.common.authorization = `Token ${user.token}`
  })

  afterAll(async () => {
    await cleanupCallback()
    api.defaults.headers.common.authorization = ''
  })

  test('Feed verification', () => {
    return api.get('articles/feed').then(response => {
      // simply verifying we don't get a 401
    })
  })
})

const sampleArticle = generateArticleForClient()
describe('Create article (authenticated)', () => {
  let user, cleanupCallback

  beforeAll(async () => {
    const createNewUserResult = await createNewUser()
    user = createNewUserResult.user
    cleanupCallback = createNewUserResult.cleanup
    api.defaults.headers.common.authorization = `Token ${user.token}`
  })

  afterAll(async () => {
    await cleanupCallback()
    api.defaults.headers.common.authorization = ''
  })

  test('Article creation', () => {
    return api
      .post('articles', {article: sampleArticle})
      .then(response => {
        // simple verification
        expect(sampleArticle.title).toEqual(response.data.article.title)
      })
      .catch(error => {
        expect(error).toBe('')
      })
  })
})

// I've left this here for you as a little utility that's a little
// domain-specific and isn't super pertinent to learning testing :)
// Just know that utilities like this are pretty darn useful and you
// should probably have things like this in your tests :)
async function createNewUser(overrides) {
  const password = faker.internet.password()
  const userData = generateUserData(overrides)
  const {email, username} = userData
  const user = await api
    .post('users', {user: {email, password, username}})
    .then(getUser)
  return {
    user,
    cleanup() {
      return api.delete(`users/${user.username}`)
    },
  }
}

//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=Testing&e=API%20Integration&em=jeffh@loar.net*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them as extra credit!
// Learn more here: http://kcd.im/testing-workshop-contributing
