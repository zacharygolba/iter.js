// @flow

import Zip from '../zip'
import * as orio from '../../'

let subj

const zip = (a, b) => {
  const adapter = new Zip(a, b)

  jest.spyOn(adapter.producerA, 'drop')
  jest.spyOn(adapter.producerB, 'drop')
  return adapter
}

beforeEach(() => {
  const producerA = orio.repeat('test').producer
  const producerB = orio.of(1, 2, 3).producer
  subj = zip(producerA, producerB)
})

afterEach(() => {
  jest.resetAllMocks()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.producerA.drop).toHaveBeenCalled()
  expect(subj.producerB.drop).toHaveBeenCalled()
})

describe('#next()', () => {
  test('with an unbound lhs and a bound rhs', () => {
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
  })

  test('with a bound lhs and an unbound rhs', () => {
    const producerA = orio.of(1, 2, 3).producer
    const producerB = orio.repeat('test').producer
    subj = zip(producerA, producerB)

    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
  })

  test('with a self reference to bound lhs', () => {
    const { producer } = orio.of(1, 2, 3, 4)
    subj = zip(producer, producer)

    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
  })
})
