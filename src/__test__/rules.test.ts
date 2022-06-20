import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { hasWon } from '../rules'

const test = suite('src/rules')

test('returns true when the given moves contains a set of winning positions', () => {
  assert.is(hasWon([1, 2, 3]), true)
  assert.is(hasWon([0, 3, 1, 6, 8, 9]), true)
})

test('returns false when the given moves does not contain a set of winning positions', () => {
  assert.is(hasWon([0, 1, 4]), false)
  assert.is(hasWon([0, 3, 1, 6, 8, 5]), false)
})

test.run()
