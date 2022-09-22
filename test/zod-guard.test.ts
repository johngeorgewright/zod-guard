import { z } from 'zod'
import { zodGuard, zodGuardAsync } from '../src/zod-guard'

describe('synchronous guarding', () => {
  const MyType = z.strictObject({ foo: z.literal('bar') })
  const isMyType = zodGuard(MyType)

  test('success', () => {
    const success: unknown = { foo: 'bar' }
    if (isMyType(success)) {
      const foo = success.foo
      expect(foo).toBe('bar')
    } else {
      // @ts-expect-error
      success.foo
      throw new Error('Guard failed runtime validation')
    }
  })

  test('failure', () => {
    const failure: unknown = { foo: 'baz' }
    if (isMyType(failure)) {
      throw new Error('Guard succeeded')
    } else {
      expect(() => MyType.parse(failure)).toThrow()
    }
  })
})

describe('asynchronous guarding', () => {
  const MyType = z
    .strictObject({ foo: z.literal('bar') })
    .refine((val) => val.foo === 'bar')
  type MyType = z.infer<typeof MyType>
  const isMyType = zodGuardAsync(MyType)

  test('success', async () => {
    const success: unknown = { foo: 'bar' }
    if ((await isMyType(success))(success)) {
      const foo = (success as MyType).foo
      expect(foo).toBe('bar')
    } else {
      // @ts-expect-error
      success.foo
      throw new Error('Guard failed runtime validation')
    }
  })

  test('failure', async () => {
    const failure: unknown = { foo: 'baz' }
    if ((await isMyType(failure))(failure)) {
      throw new Error('Guard succeeded')
    } else {
      return expect(() => MyType.parseAsync(failure)).rejects.toThrow()
    }
  })
})
