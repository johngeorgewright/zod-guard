# zod-guard

Guarding functions for zod types.

```ts
import { z } from 'zod'
import { zodGuard, zodGuardAsync } from 'zod-guard'

const MyType = z.string()
const isMyType = zodGuard(MyType)

if (isMyType(x)) {
  // `x` is definitely of MyType
  return x.substr(...)
}

const MyAsyncType = z.string().refine(async (val) => val.length < 20)
type MyAsyncType = z.infer<typeof MyAsyncType>
const isMyType = zodGuardAsync(MyAsyncType)

if (await isMyType(x)) {
  // `x` is definitely of MyAsyncType
  // ...however, Typescript doesn't yet allow for an asynchronous guards,
  // so you'll still need to do a little casting.
  return (x as MyAsyncType).substr(...)
}
```
