# zod-guard

Guarding functions for zod types.

```ts
import { z } from 'zod'
import { zodGuard, zodGuardAsync } from 'zod-guard'

const MyType = z.string()
const isMyType = zodGuard(MyType)

if (isMyType(x)) {
  // `x` is definitely of MyType
  console.info(x.substr(...))
}

const MyAsyncType = z.string().refine(async (val) => val.length < 20)
type MyAsyncType = z.infer<typeof MyAsyncType>
const isMyAsyncType = zodGuardAsync(MyAsyncType)

// Sadly there isn't the conecpt of asynchronous guards yet.
// The only way to successfully get around them is to asynchronously
// return a guard function.
if ((await isMyAsyncType(x))(x)) {
  console.info(x.substr(...))
}
```

**Note: This will guard validators' inputs. Not the outputs.**

IE, if you're using a transformer, this will guard the input type.

```typescript
import { z } from 'zod'
import { zodGuard } from 'zod-guard'

interface User {
  id: number
  name: string
}

const User = z.strictObject({
  name: z.string()
}).transform<User>((input) => ({
  ...input
  id: generateId(),
}))

const isUser = zodGuard(User)

console.info(isUser({ id: 1, name: 'one' }))
// false

console.info(isUser({ name: 'one' }))
// true
```

If you want to guard the output of your transformer, you'll need to create a validator for the output specifically.

```typescript
import { z } from 'zod'
import { zodGuard } from 'zod-guard'

const User = z.strictObject({
  id: z.number(),
  name: z.string(),
})

const UserInput = User.omit({
  id: true,
}).transform<z.output<typeof User>>((input) => ({
  ...input,
  id: generateId(),
}))

const isUser = zodGuard(User)
const isUserInput = zodGuard(UserInput)

console.info(isUser({ id: 1, name: 'one' }))
// true

console.info(isUserInput({ name: 'one' }))
// true
```
