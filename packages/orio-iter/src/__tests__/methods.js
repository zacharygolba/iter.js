// @flow

import * as orio from '../'

test('#collect()', () => {
  expect(orio.from('test').collect()).toMatchSnapshot()
  expect(orio.from('test').collect(Set)).toMatchSnapshot()
  expect(orio.range(0, 255).collect(Uint8Array)).toMatchSnapshot()
  expect(
    orio
      .from('test')
      .enumerate()
      .collect(Map),
  ).toMatchSnapshot()
})

test('#count()', () => {
  expect(orio.range(1, 10).count()).toBe(10)
})

test('#drop()', () => {
  expect(orio.range().drop()).toBeUndefined()
})

test('#every()', () => {
  {
    const fn = jest.fn(num => num < 10)

    expect(orio.range(1, 5).every(fn)).toBe(true)
    expect(fn).toHaveBeenCalledTimes(5)
  }

  {
    const fn = jest.fn(num => num > 10)

    expect(orio.range(1, 5).every(fn)).toBe(false)
    expect(fn).toHaveBeenCalledTimes(1)
  }
})

test('#find()', () => {
  const fn = jest.fn(char => char === 'c')

  expect(orio.chars('a', 'z').find(fn)).toBe('c')
  expect(fn).toHaveBeenCalledTimes(3)
})

test('#first()', () => {
  expect(orio.chars('a', 'z').first()).toBe('a')
})

test('#forEach()', () => {
  {
    const source = [1, 2, 3]
    const subj = orio.from(source)
    const fn = jest.fn()

    subj.forEach(fn)
    source.forEach(value => expect(fn).toHaveBeenCalledWith(value))
    expect(fn).toHaveBeenCalledTimes(source.length)
  }

  {
    const subj = orio.range(1, 4)
    const fn = jest.fn()

    subj.filter(num => num % 2 === 0).forEach(fn)
    expect(fn).toHaveBeenCalledWith(2)
    expect(fn).toHaveBeenCalledWith(4)
    expect(fn).toHaveBeenCalledTimes(2)
  }
})

test('#join()', () => {
  expect(orio.range(1, 3).join()).toBe('1,2,3')
  expect(orio.range(1, 3).join(' * ')).toBe('1 * 2 * 3')
})

test('#last()', () => {
  expect(orio.chars('a', 'z').last()).toBe('z')
})

test('#nth()', () => {
  expect(orio.chars('a', 'z').nth(0)).toBe('a')
  expect(orio.chars('a', 'z').nth(1)).toBe('b')
  expect(orio.chars('a', 'z').nth(2)).toBe('c')
  expect(orio.chars('a', 'z').nth(-1)).toBeUndefined()
  expect(orio.chars('a', 'z').nth(27)).toBeUndefined()
})

test('#product()', () => {
  expect(orio.of().product()).toBe(0)
  expect(orio.range(2, 4).product()).toBe(2 * 3 * 4)
  expect(Number.isNaN(orio.chars('a', 'z').product())).toBe(true)
})

test('#reduce()', () => {
  const set = orio.range(1, 3).reduce((acc, next) => acc.add(next), new Set())

  expect(set.size).toBe(3)
  expect(set.has(1)).toBe(true)
  expect(set.has(2)).toBe(true)
  expect(set.has(3)).toBe(true)
})

test('#some()', () => {
  {
    const fn = jest.fn(num => num > 2)

    expect(orio.range(1, 5).some(fn)).toBe(true)
    expect(fn).toHaveBeenCalledTimes(3)
  }

  {
    const fn = jest.fn(num => num > 10)

    expect(orio.range(1, 5).some(fn)).toBe(false)
    expect(fn).toHaveBeenCalledTimes(5)
  }
})

test('#sum()', () => {
  expect(orio.of().sum()).toBe(0)
  expect(orio.range(1, 4).sum()).toBe(1 + 2 + 3 + 4)
  expect(Number.isNaN(orio.chars('a', 'z').sum())).toBe(true)
})

test('#toString()', () => {
  expect(orio.of().toString()).toBe('[object Iter]')
})
