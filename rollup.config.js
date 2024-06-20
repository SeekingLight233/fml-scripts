import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.ts',  // 你的主 TypeScript 文件的路径
    output: {
        file: 'dist/bundle.js',  // 输出文件的路径和名称
        format: 'iife',  // 输出格式 (iife, cjs, es等，根据需求选择)
    },
    plugins: [
        typescript({ useTsconfigDeclarationDir: true })
    ]
};
