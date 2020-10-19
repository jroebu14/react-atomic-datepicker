import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import size from 'rollup-plugin-size'

const external = ['react']

const globals = {
  react: 'React',
}

const config = {
  input: 'src/index.js',
  output: {
    name: 'ReactCalendarHook',
    file: 'dist/react-atomic-datepicker.production.min.js',
    format: 'umd',
    sourcemap: true,
    globals,
  },
  external,
  plugins: [
    babel(),
    peerDepsExternal(),
    terser(),
    size({
      writeFile: false,
    }),
  ],
}

export default config
