# IconSvg

IconSvg 是一个通用的 React svg 组件容器，支持三种调用方式：

- 直接把 svg 路径当做 children 直接使用。
- 和 webpack loader `svg-loader` 配合，对后缀名为 `.inline.svg` 的文件，直接 inline 插入
- 和 webpack loader `svg-sprite-loader` 配合，对非后缀名 `.inline.svg` 的 svg 生成 svg sprite 插入页面头部，然后使用 use 调用

## 属性说明

|Prop name | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
|name	|string	|Required	|svg 名字，会用作 class|
|className|	string	|||	
|inline	|bool		||是否直接内嵌 svg，使用 svg-loader 加载|
|svgData|	object	|	|通过 loader 解析出来的 svg 数据对象|
|url|	string	|	|直接使用 svg sprite url，注意 use 不能跨域|
|extLink|	bool		| |svg 自动转 react 组件，如果生成的 svg sprite 是外链请启用该参数，同样 use 不能跨域|

## webpack 配置

```js
{
  {
    test: /\.inline.svg$/,
    use: [
      {
        loader: 'svg-loader',
      },
    ],
  },
  {
    test: (filePath) => {
      return /\.svg$/.test(filePath) && !/\.inline.svg$/.test(filePath);
    },
    use: [
      'svg-sprite-loader',
    ],
  },
}
```

## 如何使用

```js
// children 方式
<IconSvg name="star" viewBox="0 0 32 32">
  <path fill="#fbaf2a" d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z" />
</IconSvg>

// svg inline 方式
import home from 'assets/svgInline/home.inline.svg';
<IconSvg className="svg--home" inline name={home} />
```

## DEMO

[React IconSvg Demo](https://imweb.github.io/stone-ui/index.html#!/SvgDemos)

## 最后说明

注：由于目前 svg 的 use 不能跨域，所以不建议使用外链形式的 svg sprite。