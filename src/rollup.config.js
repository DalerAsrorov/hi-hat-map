import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'app/js/main.js',
    dest: 'app/min/main.min.js',
    format: 'iife',
    sourceMap: 'inline',
    plugins: [
        eslint({
            'exclude': [
                'app/css/**'
            ]
        }),
        babel(),
        commonjs({
            include: 'node_modules/**'
        })
    ]

};