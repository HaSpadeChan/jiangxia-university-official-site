# 添加到“江夏大学虚拟官网 v2”的教程

以下步骤按现有官网的目录结构编写。开始前建议复制一份原网站压缩包作为备份。

## 一、放置本科招生子站

1. 解压本科招生网站压缩包。
2. 将其中的 `undergraduate-admissions` 整个文件夹复制到现有江夏大学官网根目录。
3. 复制后应与主站 `index.html`、`assets/`、`css/`、`js/`、`pages/` 并列。

正确结构：

```text
jiangxia-university-site_v2/
├─ index.html
├─ assets/
├─ css/
├─ js/
├─ pages/
└─ undergraduate-admissions/
   ├─ index.html
   ├─ assets/
   ├─ css/
   ├─ js/
   └─ pages/
```

不要把子站的 `assets`、`css`、`js` 分散合并到主站同名目录。保持子站文件夹完整，可以避免文件重名和相对路径错误。

## 二、修改官网首页“本科招生”入口

打开主站根目录的 `index.html`，搜索：

```html
href="pages/admissions/undergraduate-admissions/index.html"
```

替换为：

```html
href="undergraduate-admissions/index.html"
```

原首页快捷入口修改后类似：

```html
<a href="undergraduate-admissions/index.html">
  <span class="quick-icon">招</span>
  <span><strong>本科招生</strong><small>Undergraduate</small></span>
</a>
```

## 三、修改“招生就业”总览页入口

打开：

```text
pages/admissions/index.html
```

搜索：

```html
href="../../pages/admissions/undergraduate-admissions/index.html"
```

替换为：

```html
href="../../undergraduate-admissions/index.html"
```

这样从“招生就业”栏目点击“本科招生”时，也会进入新子站。

## 四、保留旧网址兼容跳转（推荐）

为了避免旧链接失效，可将本压缩包中的：

```text
undergraduate-admissions/integration/undergraduate-redirect.html
```

复制并覆盖主站原文件：

```text
pages/admissions/undergraduate-admissions/index.html
```

覆盖后，访问旧地址会自动跳转到新的本科招生子站。

## 五、让主站搜索能够搜到本科招生网（可选）

主站搜索页是：

```text
pages/search.html
```

找到 `window.JX_SEARCH_INDEX` 数组，在数组中加入：

```js
{
  title: "江夏大学本科招生网",
  summary: "招生政策、招生计划、往年分数、专业探索和校园生活",
  href: "undergraduate-admissions/index.html"
}
```

主站的 `js/search.js` 会在路径前自动补充 `../`，因此这里不要写 `../`。

## 六、检查返回江夏大学主页

本科招生子站顶部“江夏大学主页”已经按页面层级设置好：

```html
href="../index.html"
```

招生首页使用 `../index.html`，子站二级页使用 `../../index.html`。按照本教程把子站放在主站根目录后，这两个路径都会返回主站首页，无需修改。

如果将子站放在其他层级，需要在所有 HTML 中批量修改该链接。

## 七、使用本地服务器测试

在江夏大学官网根目录运行：

```bash
python -m http.server 8080
```

依次检查：

1. `http://localhost:8080/` 可以打开主站；
2. 首页“本科招生”可以进入子站；
3. 招生就业总览页的“本科招生”可以进入子站；
4. 子站顶部“江夏大学主页”可以返回主站；
5. 招生计划和往年分数可以筛选；
6. 搜索、FAQ 和演示录取查询可以使用；
7. 手机宽度下导航按钮可以展开。

## 八、正式上线前必须替换

- 招生章程、录取规则和信息公开内容；
- 各省招生计划、往年分数与位次；
- 专业名称、培养方案和学院链接；
- 招生办公室电话、邮箱、地址与服务时间；
- 报名系统和录取查询真实地址；
- 微信、招生小程序和视频平台地址；
- 隐私政策、数据安全说明、备案和版权信息。

录取查询不能直接使用当前前端演示，需要接入经过身份校验和权限控制的后端系统。不要把真实考生数据写入 HTML 或 JavaScript 文件。
