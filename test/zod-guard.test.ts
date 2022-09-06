import tsModule from '../src/zod-guard'

test("it's a module", () => {
  expect(tsModule()).toBe('I am a TypeScript module')
})
