/* global describe, it, expect */
import { logger } from '../../../src/server/util'

describe('logger', () => {
  it('should create a valid logger', () => {
    expect(logger).toHaveProperty('info')
    expect(logger).toHaveProperty('error')
  })
})
