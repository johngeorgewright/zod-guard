import { InitialOptionsTsJest } from 'ts-jest'

const config: InitialOptionsTsJest = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'test/tsconfig.json' }],
  },
}

export default config
