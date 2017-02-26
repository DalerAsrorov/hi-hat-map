import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';

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
        babel({
            exclude: 'node_modules/**'
        })
    ]

};