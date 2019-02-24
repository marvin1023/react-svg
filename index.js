import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.css';

// 由于目前 svg 的 use 不能跨域，所以不建议使用外链形式的 svg sprite

function IconSvg(props) {
  // 获取传入的参数
  const {
    name, url, className, children,
    inline, extLink, ...rest
  } = props;
  const cssClass = classnames('icon-svg', className);

  // 如果有路径参数，则返回直接嵌入式代码
  if (children) {
    return (
      <svg viewBox={props.viewBox || '0 0 32 32'} className={`${cssClass} svg--${name}`} {...rest} >
        <title>{name}</title>
        {children}
      </svg>
    );
  }

  // 传入 svg sprite url 地址参数，返回外链式代码
  // use 不能跨域，所以慎用
  if (url) {
    return (
      <svg className={`${cssClass} svg--${name}`} {...rest}>
        <use xlinkHref={`${url}#icon-${name}`} />
      </svg>
    );
  }

  // svg-loader
  // 直接 inline svg
  if (inline) {
    const { attributes, content } = name;
    return (
      /* eslint-disable */
      <svg
        className={`${cssClass}`}
        dangerouslySetInnerHTML={{ __html: content }}
        {...attributes}
      />
      /* eslint-enable */
    );
  }

  // svg-sprite-loader
  // inline svg，且把 svg 合并在一起插入到前面，使用的时候使用 use 根据 id 调用
  return (
    <svg className={`${cssClass}`} viewBox={name.viewBox} {...rest}>
      <use xlinkHref={extLink ? name.url : `#${name.id}`} />
    </svg>
  );
}

IconSvg.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  /** 是否直接内嵌 svg，使用 svg-loader 加载 */
  inline: PropTypes.bool,
  /** 通过 loader 解析出来的 svg 数据对象 */
  svgData: PropTypes.object,
  /** 直接使用 svg sprite url，注意 use 不能跨域  */
  url: PropTypes.string,
  /** svg 自动转 react 组件，如果生成的 svg sprite 是外链请启用该参数，同样 use 不能跨域 */
  extLink: PropTypes.bool,
};

export default IconSvg;
