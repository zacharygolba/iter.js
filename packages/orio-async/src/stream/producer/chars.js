// @flow

import * as result from 'orio-result'
import { AsAsyncIterator, ToString } from 'orio-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'orio-types'

@ToString
@AsAsyncIterator
export default class Chars implements AsyncProducer<*> {
  /*:: @@asyncIterator: () => $AsyncIterator<string, void, void> */
  cursor: number
  source: string

  constructor(source: string) {
    this.cursor = 0
    this.source = source
  }

  drop(): void {
    this.cursor = 0
    this.source = ''
  }

  async next(): AsyncIteratorResult<string, void> {
    const { cursor, source } = this

    if (cursor >= source.length) {
      return result.done()
    }

    this.cursor += 1
    return result.next(source.substr(cursor, 1))
  }
}
