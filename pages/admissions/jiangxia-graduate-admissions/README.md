# 江夏大学研究生招生网（静态版）

这是一个不需要服务器、数据库或构建工具的静态网站。双击 `index.html` 即可预览。

## 文件结构

```text
jiangxia-graduate-admissions/
├── index.html                 网站首页
├── css/style.css              全站样式
├── js/main.js                 老旧系统提示功能
├── assets/logo-mark.svg       江夏大学校徽（用户提供）
└── news/                      可打开的新闻详情页
```

请不要随意改变 `css`、`js`、`assets` 和 `news` 文件夹之间的层级，否则需要同步修改 HTML 中的相对路径。

## 添加到江夏大学总网站

1. 把整个 `jiangxia-graduate-admissions` 文件夹放到总网站根目录，与总网站的 `index.html` 并列。
2. 在总网站首页需要跳转的位置添加：

```html
<a href="jiangxia-graduate-admissions/index.html">研究生招生</a>
```

如果链接所在文件位于总网站的 `pages` 文件夹内，通常应写为：

```html
<a href="../jiangxia-graduate-admissions/index.html">研究生招生</a>
```

如果链接所在文件位于 `pages/services`，通常应写为：

```html
<a href="../../jiangxia-graduate-admissions/index.html">研究生招生</a>
```

路径中每一个 `../` 表示向上返回一层文件夹。最终请从实际页面点击测试一次。

## 修改校徽和文字

- 校徽文件：`assets/logo-mark.svg`
- 学校名称：首页和每个新闻页顶部的 `.brand-copy`
- 首页新闻：首页 `index.html` 中的 `.news-list`
- 联系方式：首页 `index.html` 中的 `#contact`
- 全站颜色：`css/style.css` 顶部 `:root` 内的变量

如果替换校徽，最省事的方法是保持文件名仍为 `logo-mark.svg`，直接覆盖原文件。

## 新增新闻页面

1. 复制 `news` 文件夹中任意一个 HTML 文件并改名，例如 `2027-new-notice.html`。
2. 修改该文件中的 `<title>`、文章标题、日期、来源和正文。
3. 回到首页新闻列表，把新闻链接写成：

```html
<a href="news/2027-new-notice.html">新闻标题</a>
```

新闻页返回首页的路径是 `../index.html`，其 CSS、JS 和校徽路径都需要以 `../` 开头。

## 设置“系统过于老旧”提示

给任何链接加上 `data-old-system` 属性即可：

```html
<a href="#" data-old-system>网上报名</a>
```

提示文字位于 `js/main.js`：

```js
var oldSystemMessage = "系统过于老旧，不支持该功能";
```

直接修改引号中的文字即可。不要删除引号、分号或变量名。

## 注意事项

- “江夏大学”及招生内容均为虚构演示信息。
- 本站只有前端界面，不收集或保存考生信息。
- 深层报名、查询、下载和后台入口统一显示老旧系统提示。
