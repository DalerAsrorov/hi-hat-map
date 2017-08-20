import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'app/js/main.js',
    dest: 'app/min/main.min.js',
    format: 'iife',
    sourceMap: 'inline',
    plugins: [
        resolve({
            jsnext: true,
            browser: true,
            main: true,
            preferBuiltins: false
        }),
        eslint({
            exclude: ['app/css/**']
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: false
        }),
        commonjs({
            include: 'node_modules/**'
        })
    ]
};
