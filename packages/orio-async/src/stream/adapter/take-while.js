// @flow

import * as result from 'orio-result'
import { AsAsyncIterator, ToString } from 'orio-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'orio-types'

@ToString
@AsAsyncIterator
export default class TakeWhile<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  fn: T => Promise<boolean> | boolean
  producer: AsyncProducer<T>

  constructor(producer: AsyncProducer<T>, fn: T => Promise<boolean> | boolean) {
    this.fn = fn
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  async next(): AsyncIteratorResult<T, void> {
    const next = await this.producer.next()

    if (next.done || !await this.fn(next.value)) {
      return result.done()
    }

    return next
  }
}
