import type { ZodType, ZodTypeDef } from 'zod'

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
export function zodGuard<Output, Def extends ZodTypeDef, Input>(
  zodType: ZodType<Output, Def, Input>
) {
  return (x: unknown): x is Input => zodType.safeParse(x).success
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
export function zodGuardAsync<Output, Def extends ZodTypeDef, Input>(
  zodType: ZodType<Output, Def, Input>
) {
  return async (x: unknown): Promise<(x: unknown) => x is Input> => {
    const { success } = await zodType.safeParseAsync(x)
    return (_x1: unknown): _x1 is Input => success
  }
}
