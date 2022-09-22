import type { z } from 'express-zod-api'

/**
 * Create a guard function for a zod type.
 *
 * @example
 * const MyType = z.string()
 * const isMyType = zodGuard(MyType)
 *
 * if (isMyType(x)) {
 *   // `x` is definitely of MyType
 *   return x.substr(...)
 * }
 */
export function zodGuard<T>(zodType: z.ZodType<T>) {
  return (x: unknown): x is T => zodType.safeParse(x).success
}

/**
 * Create an async guard function for an async zod type.
 *
 * Sadly there isn't the conecpt of asynchronous guards yet.
 * The only way to successfully get around them is to asynchronously
 * return a guard function.
 *
 * @example
 * const MyType = z.string().refine(async (val) => val.length < 20)
 * type MyType = z.infer<typeof MyType>
 * const isMyType = zodGuardAsync(MyType)
 *
 * if ((await isMyType(x))(x)) {
 *   // `x` is definitely of MyType
 *   return x.substr(...)
 * }
 */
export function zodGuardAsync<T>(zodType: z.ZodType<T>) {
  return async (x: unknown): Promise<(x: unknown) => x is T> => {
    const { success } = await zodType.safeParseAsync(x)
    return (x1: unknown): x1 is T => x === x1 && success
  }
}
