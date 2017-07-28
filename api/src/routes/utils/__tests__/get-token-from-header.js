// Things to know:
// - `test` is a global function from Jest:
//   `test(messageString, testerFunction)`
//   Learn more here: https://facebook.github.io/jest/docs/api.html#testname-fn
// - `expect` is a global function from Jest
//   which allows you to make assertsions. For
//   example:
//     `expect(1).toBe(1)`
//   Learn more here: https://facebook.github.io/jest/docs/expect.html
//
// Write unit tests for getTokenFromHeader.
// See `api/src/routes/utils/get-token-from-header.js`
// to see how this function has been implemented and
// how it's intended to be used. Write at least two unit
// tests to ensure that that use case is always supported.
import getTokenFromHeader from '../get-token-from-header'

function createRequestHeader(authorization) {
  return {
    headers: {
      authorization,
      // other headers
    },
  }
}

test('test valid token', () => {
  const tokenData = 'blahblahblahblah.blahblahblah.blahblahblah'
  const req = createRequestHeader(`Token ${tokenData}`)
  const result = getTokenFromHeader(req)

  expect(result).toBe(tokenData)
})

test('test invalid token', () => {
  const req = createRequestHeader('Bad Data')
  const result = getTokenFromHeader(req)

  expect(result).toBeNull()
})

test('test null authorization object', () => {
  const result = getTokenFromHeader({headers: {}})

  expect(result).toBeNull()
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=API%20Unit&em=jeffh@loar.net*/
test('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(true).toBe(submitted)
})
