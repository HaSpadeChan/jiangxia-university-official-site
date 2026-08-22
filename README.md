# 江夏大学虚拟官网

这是一个可离线浏览的多页面静态网站。江夏大学及网站中的人物、机构、数据、项目、联系方式和登录功能均为虚构演示设定，与任何真实高校无隶属或合作关系。

v0.3 在保留 v0.2 已完成模块的基础上，重点完善教育教学、科学研究、招生就业和合作交流的 19 个栏目，并统一了全站身份入口、联系方式、校历路径、校徽调用与冗余页面结构。

## 1. 如何运行

解压后可以直接双击根目录的 `index.html`。为避免浏览器对本地视频、模块和存储功能的限制，推荐在网站根目录启动静态服务器：

```bash
python -m http.server 8080
```

随后访问 `http://localhost:8080/`。

## 2. v0.3 主要更新

### 教育教学

- `pages/education/undergraduate.html`：本科培养结构、数据概览、四年学习路径与常用入口；
- `pages/education/graduate.html`：研究生培养节点、导师组制度、研究支持与常见问题；
- `pages/education/international.html`：国际学生在校培养、三类学习路径和入校支持；
- `pages/education/continuing.html`：六个差异化继续教育项目及分类筛选；
- `pages/education/teaching-development.html`：教师发展路径、活动列表与演示报名反馈；
- 教育教学总览中的“校历与教学安排”改为直接进入 `pages/services/calendar.html`。

### 科学研究

- `pages/research/overview.html`：科研布局、虚构统计数据、重点方向与开放研究原则；
- `pages/research/institutes.html`：八个科研机构，支持领域筛选和关键词搜索；
- `pages/research/platforms.html`：六类公共平台、运行状态与登录预约入口；
- `pages/research/achievements.html`：九项代表成果，支持类型筛选和关键词搜索；
- `pages/research/technology-transfer.html`：成果转化流程、开放项目和本地演示表单；
- `pages/research/events.html`：讲座、论坛、工作坊及活动回顾，可筛选并展开详情。

### 招生就业

- `pages/admissions/international.html`：国际学生项目、申请流程和常见问题；
- `pages/admissions/employment.html`：小夏就业助手、六类预设问答和就业服务入口；
- `pages/admissions/open-day.html`：开放日日程、校园参观路线与演示预约；
- 已完成的本科招生网、研究生招生网和人才招聘页面保持原有内容。

### 合作交流

- `pages/cooperation/overview.html`：合作原则、67 个全球伙伴统计和栏目入口；
- `pages/cooperation/student-exchange.html`：八个交流项目，支持项目类型和关键词筛选；
- `pages/cooperation/joint-labs.html`：六个差异化联合实验室及可展开介绍；
- `pages/cooperation/conferences.html`：即将举行与历届国际会议筛选；
- `pages/cooperation/greater-china.html`：香港、澳门和台湾地区合作项目筛选；
- 已完成的全球伙伴网站保持原有内容。

## 3. 全站统一调整

- 新闻“风云人物”三张 3:4 图片改为竖版居中展示，不再按横图裁切；
- 顶部“学生、教职工、校友、访客”均直接进入统一身份认证，并自动选择对应身份；
- 登录页通过查询参数识别身份，例如 `pages/portal/login.html?role=student`；
- 邮编统一为 `114514`；
- 电话统一为 `318-01919810`；
- 推荐演示域名为 `jiangxia-university.org`；
- 占位邮箱统一为 `example@jiangxia-university.org`；
- 所有名为 `logo-mark.svg` 的校徽文件均与根目录正式校徽字节一致；
- 校徽替代文本统一为“江夏大学校徽”；
- 站内搜索移除了旧占位入口，并更新为当前学院、招生、校历、全球伙伴和统一门户路径。

域名仅作为网站演示设定，正式注册前仍需在域名注册商处确认可用性、商标风险和当地教育机构命名规则。

## 4. 已清理的冗余占位页面

以下页面已经存在更完整的替代入口，且清理前已确认不再被站内页面引用：

- `pages/gateway/` 下原学生、教职工、校友和访客导览页；
- `pages/education/academic-calendar.html` 旧校历占位页；
- `pages/admissions/graduate.html` 旧研究生招生占位页；
- `pages/schools/` 根目录下 12 个旧学院占位 HTML。

对应功能分别由统一身份认证、校园服务校历、完整研究生招生网和 17 个学院独立网站承接。原始 v0.2 压缩包仍可用于恢复这些文件。

## 5. 文件结构

```text
jiangxia-university-site_v0.3/
├─ index.html
├─ README.md
├─ assets/                     图片、校徽、SVG 与视频
├─ css/
│  ├─ style.css                首页样式
│  └─ subpage.css              公共二级页及 v0.3 栏目组件
├─ js/
│  ├─ main.js                  首页交互
│  ├─ site-pages.js            门户、筛选、表单和就业助手交互
│  └─ search.js
└─ pages/
   ├─ about/
   ├─ news/
   ├─ schools/                 17 个学院独立站
   ├─ education/
   ├─ research/
   ├─ admissions/
   ├─ cooperation/
   ├─ services/
   ├─ portal/
   ├─ en/
   └─ search.html
```

## 6. v0.3 互动功能修改方法

### 修改筛选条目

科研机构、科研成果、继续教育、交流项目等页面使用：

```html
<section data-filter-scope>
  <button data-filter="health">生命健康</button>
  <article data-filter-item data-category="health">……</article>
</section>
```

`data-filter` 与 `data-category` 保持一致即可。关键词搜索会读取条目的全部可见文字。

### 修改就业助手回答

打开 `js/site-pages.js`，搜索：

```js
const answers = {
```

可以直接修改六类回答。关键词对应规则位于同一代码块下方的 `keywordMap`。未匹配的问题会显示服务器繁忙及可回答范围。

### 修改演示表单提示

开放日和技术转移页面的表单使用：

```html
<form data-demo-form data-success="提交后的提示文字">
```

表单仅在浏览器本地显示提示，不会上传或保存数据。

### 修改联系方式与域名

全站查找以下内容并统一替换：

```text
114514
318-01919810
example@jiangxia-university.org
jiangxia-university.org
```

修改域名后还应检查邮箱、页脚、HTTPS、服务器配置和站点地图。

## 7. 统一信息门户说明

统一门户为纯前端剧情演示，不是安全的真实认证系统。演示账号和密码保存在 `js/site-pages.js` 中，任何查看源代码的人都能看到，不得用于真实用户系统。

正式上线时必须改为服务器端认证，并配置 HTTPS、会话管理、权限控制、密码策略、审计日志、CSRF/XSS 防护与隐私政策。

## 8. 图片和校徽

- 根目录正式校徽：`assets/logo-mark.svg`；
- 普通新闻封面建议使用 16:9；
- 人物图片建议使用 3:4，并保留 `article-cover--portrait` 类；
- 替换图片后应检查文件名、相对路径、替代文本和移动端裁切效果。

## 9. 上线前检查

- 将虚构数据和演示声明替换为最终内容；
- 确认域名是否可注册并符合当地规则；
- 对表单、搜索和认证接入后端；
- 检查图片、字体、视频和第三方素材版权；
- 进行移动端、键盘操作、颜色对比和屏幕阅读器测试；
- 使用真实服务器环境再次检查大小写路径和 404 链接；
- 根据服务器所在地完成必要的隐私、Cookie 和法律声明。
