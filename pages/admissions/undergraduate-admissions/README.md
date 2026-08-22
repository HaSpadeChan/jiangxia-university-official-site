# 江夏大学本科招生网

本项目是与“江夏大学虚拟官网 v2”配套的本科招生子站。视觉上沿用原官网的蓝绿色品牌体系，并加入江江、小夏的蓝、绿、粉、黄辅助色；信息架构参考国内高校本科招生网站常见组织方式，但所有页面、文字和数据均为原创虚构内容。

## 主要页面

- `index.html`：本科招生首页；
- `pages/meet.html`：遇见江夏；
- `pages/news.html`：招生动态；
- `pages/policies.html`：招生政策；
- `pages/plans.html`：招生计划筛选；
- `pages/scores.html`：往年分数筛选；
- `pages/majors.html`：专业探索；
- `pages/special.html`：专题招生；
- `pages/campus.html`：校园生活；
- `pages/faq.html`：报考问答；
- `pages/query.html`：录取查询演示；
- `pages/contact.html`：联系我们；
- `pages/search.html`：站内搜索。

## 已实现的交互

- 桌面端与移动端导航；
- 站内本地搜索；
- 招生计划与往年分数筛选；
- FAQ 展开与收起；
- 录取查询前端演示；
- 外部报名平台待配置提示；
- 返回顶部按钮；
- 江江、小夏固定报考助手；
- 响应式布局与键盘焦点样式。

## 本地运行

直接双击 `index.html` 可以浏览。推荐在包含本目录的上一级目录运行：

```bash
python -m http.server 8080
```

然后访问：

```text
http://localhost:8080/undergraduate-admissions/
```

完整接入方法见 `integration/INTEGRATION_GUIDE.md`。

## 修改内容

- 首页文字和卡片：编辑 `index.html`；
- 二级页内容：编辑 `pages/` 下对应 HTML；
- 全站颜色和布局：编辑 `css/admissions.css` 的 `:root` 变量；
- 筛选、搜索、FAQ、查询：编辑 `js/admissions.js`；
- 图片：替换 `assets/` 中同名文件，或修改 HTML 中的图片路径；
- 搜索索引：编辑 `pages/search.html` 中的 `window.JX_ADMISSIONS_SEARCH`。

> 江夏大学为虚构学校。正式公开使用前，必须替换招生政策、计划、分数、联系方式、报名入口和录取查询接口，并完成内容审核、隐私保护和安全测试。

