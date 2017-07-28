import makeMeASandwich from '../make-me-a-sandwich'

test('returns null if the sandwich does not exist', () => {
  const req = createRequestObject()
  const result = makeMeASandwich(req)

  expect(result).toBeNull()
})

test('returns my sandwich', () => {
  const sandwich = 'Monte Cristo'
  const req = createRequestObject(sandwich)
  const result = makeMeASandwich(req)

  expect(result).toBe(sandwich)
})

function createRequestObject(sandwich) {
  return {query: {sandwich}}
}
