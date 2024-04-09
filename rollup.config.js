const typescript = require("rollup-plugin-typescript2");
const babel = require("@rollup/plugin-babel");
const terser = require("@rollup/plugin-terser");
const filesize = require("rollup-plugin-filesize");

module.exports = [
  {
    input: "package/index.ts", // 输入文件路径
    output: {
      file: "dist/vue-debounce-throttle.js", // 输出文件路径
      name: "vueDebounceThrottleDirective",
      format: "umd", // 输出格式，这里是 CommonJS 格式
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
      }), // 使用 rollup-plugin-typescript2 插件处理 TypeScript 文件
      babel({
        babelHelpers: "bundled", // 指定 Babel 使用的辅助函数的类型
        presets: ["@babel/preset-env"], // 指定 Babel 使用的预设
      }),
      filesize(),
    ],
  },
  {
    input: "package/index.ts", // 输入文件路径
    output: {
      file: "dist/vue-debounce-throttle.min.js", // 输出文件路径
      name: "vueDebounceThrottleDirective",
      format: "umd", // 输出格式，这里是 CommonJS 格式
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
      }), // 使用 rollup-plugin-typescript2 插件处理 TypeScript 文件
      babel({
        babelHelpers: "bundled", // 指定 Babel 使用的辅助函数的类型
        presets: ["@babel/preset-env"], // 指定 Babel 使用的预设
      }),
      terser(), // 使用 Terser 插件压缩代码
      filesize(),
    ],
  },
];
