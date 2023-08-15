import presetWeapp from 'unocss-preset-weapp'
import { defineConfig } from 'unocss'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

export default defineConfig({
  presets: [
    presetWeapp(
    ), // 工具预设
  ],
  transformers: [
    transformerAttributify(), // 支持属性化模式
    transformerClass(),	// 转换转义类名，支持class写法
  ],
  shortcuts: [
    { center: 'flex items-center justify-center' },
    { around: 'flex items-center justify-around' },
    { between: 'flex items-center justify-between' },
    { colCenter: 'flex flex-col items-center justify-center' },
  ],
  rules: [
    [/^w-(\d+)$/, ([, d]) => ({ 'width': `${d}rpx` })],
    [/^h-(\d+)$/, ([, d]) => ({ 'height': `${d}rpx` })],
    [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}rpx` })],
    [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${d}rpx` })],
    [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}rpx` })],
    [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d}rpx` })],
    [/^mx-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}rpx`, 'margin-right': `${d}rpx` })],
    [/^my-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}rpx`, 'margin-bottom': `${d}rpx` })],
    [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${d}rpx` })],
    [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${d}rpx` })],
    [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${d}rpx` })],
    [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${d}rpx` })],
    [/^px-(\d+)$/, ([, d]) => ({ 'padding-left': `${d}rpx`, 'padding-right': `${d}rpx` })],
    [/^py-(\d+)$/, ([, d]) => ({ 'padding-top': `${d}rpx`, 'padding-bottom': `${d}rpx` })],
    [/^lh-(\d+)$/, ([, d]) => ({ 'line-height': `${d}rpx` })],
    [/^rd-(\d+)$/, ([, d]) => ({ 'border-radius': `${d}rpx` })],
    [/^gap-(\d+)$/, ([, d]) => ({ 'gap': `${d}rpx` })],
    [/^text-(\d+)$/, ([, d]) => ({ 'font-size': `${d}rpx` })],
    [/^c-(.+)$/, ([, color]) => ({ 'color': `#${color}` })],
    ['bg1', { 'background': 'rgba(255,255,255,0.7)' }],
    ['bg2', { 'background': 'rgba(84, 147, 255, 0.9)' }],
    ['border1', { 'border': '1px solid #fff' }],
    ['border2', { 'border': '1px solid rgba(197,219,255,0.49)' }],
  ]
})