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
const isMyAsyncType = zodGuardAsync(MyAsyncType)

// Sadly there isn't the conecpt of asynchronous guards yet.
// The only way to successfully get around them is to asynchronously
// return a guard function.
if ((await isMyAsyncType(x))(x)) {
  return x.substr(...)
}
```
