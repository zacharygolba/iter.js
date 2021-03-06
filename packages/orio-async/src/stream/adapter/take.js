// @flow

import * as result from 'orio-result'
import { AsAsyncIterator, ToString } from 'orio-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'orio-types'

@ToString
@AsAsyncIterator
export default class Take<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  amount: number
  calls: number
  producer: AsyncProducer<T>

  constructor(producer: AsyncProducer<T>, amount: number) {
    this.amount = amount
    this.calls = 0
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  async next(): AsyncIteratorResult<T, void> {
    if (this.calls >= this.amount) {
      return result.done()
    }

    this.calls += 1
    return this.producer.next()
  }
}
