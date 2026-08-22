(function () {
  "use strict";

  const root = document.querySelector("[data-disclosure-root]");
  if (!root) return;

  const categoryLabels = {
    basic: "基本信息",
    admissions: "招生考试信息",
    finance: "财务、资产及收费信息",
    staff: "人事师资信息",
    teaching: "教学质量信息",
    students: "学生管理",
    integrity: "学风建设信息",
    degrees: "学位、学科信息",
    cooperation: "对外交流与合作信息",
    other: "其他"
  };

  const items = [
    ["basic", "学校办学规模、师生结构及专业设置基本情况", "发展规划处", "2026-07-18", "公开", "集中说明学校办学规模、校区设置、专业数量、在校生与教职工构成等基本情况。"],
    ["basic", "江夏大学章程及章程修订说明", "学校办公室", "2026-06-30", "公开", "展示学校治理结构、办学宗旨、师生权利义务和章程修订程序。"],
    ["basic", "学校现任领导及工作分工", "学校办公室", "2026-07-12", "公开", "公布现任校级领导基本信息、职责分工及联系部门。"],
    ["basic", "学校组织机构和直属单位设置", "机构编制办公室", "2026-07-10", "公开", "列明党政管理机构、学院、直属单位和科研平台的设置情况。"],
    ["basic", "江夏大学“十五五”发展规划纲要", "发展规划处", "2026-05-20", "公开", "介绍学校未来五年的办学目标、重点任务和建设计划。"],
    ["basic", "校学术委员会年度工作报告", "学术委员会办公室", "2026-04-16", "公开", "概述学术委员会履职、学术评价和学术治理相关工作。"],
    ["basic", "2025—2026学年信息公开工作年度报告", "学校办公室", "2026-08-01", "公开", "总结本学年主动公开、依申请公开和监督保障工作。"],

    ["admissions", "2027年本科招生章程与分省招生计划", "本科招生办公室", "2026-08-10", "公开", "集中公开本科招生章程、招生专业、计划安排和录取原则。"],
    ["admissions", "本科招生录取结果及录取分数查询说明", "本科招生办公室", "2026-08-08", "公开", "说明考生录取结果、分省分专业录取数据的查询渠道。"],
    ["admissions", "研究生招生简章、专业目录与报考条件", "研究生院", "2026-07-25", "公开", "公布硕士、博士研究生招生专业、考试科目及报考条件。"],
    ["admissions", "研究生复试录取工作办法与拟录取名单", "研究生院", "2026-05-12", "公开", "公开复试基本要求、综合成绩计算办法和拟录取结果。"],
    ["admissions", "招生咨询、申诉和违规举报渠道", "招生监察办公室", "2026-06-18", "公开", "列明本科与研究生招生咨询、申诉及监督受理方式。"],

    ["finance", "学校财务与国有资产管理制度", "财务处", "2026-05-30", "公开", "汇总预算管理、经费使用、采购及国有资产管理相关制度。"],
    ["finance", "江夏大学2026年度经费预算公开", "财务处", "2026-03-26", "公开", "公布年度收支预算、财政拨款支出和重点项目预算。"],
    ["finance", "江夏大学2025年度经费决算公开", "财务处", "2026-07-28", "公开", "公布年度收入、支出和财政拨款决算情况。"],
    ["finance", "学费、住宿费及服务性收费项目标准", "财务处", "2026-07-05", "公开", "列明各类学生学费、住宿费和服务性收费依据及投诉方式。"],

    ["staff", "学校岗位设置与人员聘用管理办法", "人力资源处", "2026-04-08", "公开", "介绍各类岗位设置、聘用条件、考核和续聘办法。"],
    ["staff", "2026年度教学科研岗位公开招聘信息", "人力资源处", "2026-07-22", "公开", "发布教学科研人员招聘岗位、申请条件和考核程序。"],
    ["staff", "校内中层干部任免信息", "党委组织部", "2026-06-15", "公开", "按规定公开校内中层干部任免与试用期相关信息。"],
    ["staff", "教职工劳动与人事争议解决办法", "人力资源处", "2026-03-18", "公开", "说明教职工人事争议受理、调解和申诉程序。"],

    ["teaching", "本科专业设置及2026年度专业调整情况", "教务处", "2026-07-16", "公开", "公开本科专业目录、新增专业和暂停招生专业情况。"],
    ["teaching", "课程开设、实践教学和选修学分比例", "教务处", "2026-06-26", "公开", "说明课程总量、实践教学和选修课程学分所占比例。"],
    ["teaching", "教授承担本科课程教学情况", "教务处", "2026-06-22", "公开", "公布教授为本科生授课人数比例和课程门次比例。"],
    ["teaching", "2026届毕业生就业质量年度报告", "学生发展中心", "2026-07-30", "公开", "介绍毕业生规模、去向结构、就业地区和就业服务情况。"],
    ["teaching", "2025—2026学年本科教学质量报告", "教学质量办公室", "2026-08-03", "公开", "展示本科人才培养、专业建设、课程教学和质量保障情况。"],

    ["students", "江夏大学本科生学籍管理办法", "教务处", "2026-05-12", "公开", "规定注册、选课、考核、转专业、休复学及毕业管理要求。"],
    ["students", "学生奖助学金及困难资助管理办法", "学生工作处", "2026-06-08", "公开", "介绍奖学金、助学金、助学贷款和勤工助学申请条件。"],
    ["students", "学生奖励与纪律处分规定", "学生工作处", "2026-04-20", "公开", "明确学生表彰奖励、违纪处理及教育管理程序。"],
    ["students", "学生申诉处理办法", "学生申诉委员会", "2026-04-20", "公开", "说明学生对处理决定提出申诉的范围、时限和办理流程。"],

    ["integrity", "学校学风建设工作机构及职责", "科学技术研究院", "2026-03-14", "公开", "公布学风建设责任机构、工作职责及日常联系渠道。"],
    ["integrity", "学术道德规范与科研诚信管理办法", "科学技术研究院", "2026-03-14", "公开", "明确科研活动中的学术规范、诚信要求与责任边界。"],
    ["integrity", "学术不端行为调查处理规程", "学术委员会办公室", "2026-05-05", "公开", "说明学术不端举报、受理、调查、认定和申诉程序。"],

    ["degrees", "学士、硕士和博士学位授予基本要求", "研究生院", "2026-06-06", "公开", "公开各层次学位授予的课程、成果和学术规范要求。"],
    ["degrees", "学位授权点建设与年度质量报告", "学科建设处", "2026-07-02", "公开", "介绍学位授权点建设进展、师资条件和人才培养质量。"],
    ["degrees", "拟新增学位授权点申报及论证材料", "学科建设处", "2026-05-26", "公开", "按程序公开拟新增学位授权点的申报和专家论证材料。"],
    ["degrees", "重点学科与交叉学科平台建设情况", "学科建设处", "2026-07-08", "公开", "说明重点学科、交叉平台和优势方向的建设情况。"],

    ["cooperation", "国际交流合作项目与学生交换计划", "国际合作处", "2026-06-28", "公开", "公开合作院校、学生交换、联合培养和短期访学项目信息。"],
    ["cooperation", "来华留学生招生与管理规定", "国际教育学院", "2026-05-18", "公开", "说明来华留学生招生、培养、学籍和日常管理要求。"],
    ["cooperation", "学校全球合作伙伴与合作机构目录", "国际合作处", "2026-07-20", "公开", "汇总学校合作院校、研究机构和企业伙伴基本信息。"],

    ["other", "校内巡察反馈意见及整改情况", "党委巡察办公室", "2026-06-12", "公开", "按规定公开巡察反馈、整改任务和阶段性进展。"],
    ["other", "校园突发事件应急预案与处置流程", "保卫处", "2026-04-02", "公开", "公开自然灾害、公共卫生和校园安全事件应急处置流程。"],
    ["other", "校园后勤服务与节能减排工作情况", "后勤管理处", "2026-07-14", "公开", "介绍校园能源管理、绿色运行和后勤服务改进情况。"]
  ].map((entry, index) => ({
    id: `jx-disclosure-${String(index + 1).padStart(3, "0")}`,
    category: entry[0],
    title: entry[1],
    department: entry[2],
    date: entry[3],
    status: entry[4],
    summary: entry[5]
  }));

  const list = root.querySelector("#disclosureList");
  const search = root.querySelector("#disclosureSearch");
  const resultCount = root.querySelector("#resultCount");
  const categoryButtons = Array.from(root.querySelectorAll("[data-category]"));
  const detailDialog = document.querySelector("#disclosureDialog");
  const infoDialog = document.querySelector("#infoDialog");
  let activeCategory = "all";

  function normalize(value) {
    return value.toLocaleLowerCase("zh-CN").replace(/\s+/g, "");
  }

  function visibleItems() {
    const query = normalize(search.value);
    return items.filter((item) => {
      const categoryMatches = activeCategory === "all" || item.category === activeCategory;
      const text = normalize(`${item.title}${item.department}${item.summary}${categoryLabels[item.category]}`);
      return categoryMatches && (!query || text.includes(query));
    });
  }

  function render() {
    const visible = visibleItems();
    resultCount.textContent = String(visible.length);
    if (!visible.length) {
      list.innerHTML = '<p class="disclosure-empty">没有找到匹配的公开事项，请更换关键词或分类。</p>';
      return;
    }
    list.innerHTML = visible.map((item) => {
      const index = items.indexOf(item) + 1;
      return `
        <button type="button" class="disclosure-item" data-disclosure-id="${item.id}">
          <span class="disclosure-title"><small>${String(index).padStart(2, "0")}</small><strong>${item.title}</strong></span>
          <span class="disclosure-department">${item.department}</span>
          <time class="disclosure-date" datetime="${item.date}">${item.date}</time>
          <span class="disclosure-status">${item.status}</span>
        </button>`;
    }).join("");
  }

  function updateCounts() {
    root.querySelector('[data-category-count="all"]').textContent = String(items.length);
    Object.keys(categoryLabels).forEach((category) => {
      const count = items.filter((item) => item.category === category).length;
      root.querySelector(`[data-category-count="${category}"]`).textContent = String(count);
    });
  }

  function openDetails(id) {
    const item = items.find((entry) => entry.id === id);
    if (!item) return;
    document.querySelector("#dialogCategory").textContent = categoryLabels[item.category];
    document.querySelector("#dialogTitle").textContent = item.title;
    document.querySelector("#dialogDepartment").textContent = `责任部门：${item.department}`;
    document.querySelector("#dialogDate").textContent = `更新时间：${item.date}`;
    document.querySelector("#dialogDate").dateTime = item.date;
    document.querySelector("#dialogSummary").textContent = item.summary;
    document.querySelector("#dialogStatus").textContent = item.status;
    detailDialog.showModal();
  }

  const panelContent = {
    guide: {
      title: "信息公开指南",
      html: "<p>江夏大学遵循公正、公平、便民原则，通过信息公开网主动公开学校基本情况、招生考试、财务收费、教学质量和学生管理等信息。</p><p>师生和社会公众可使用本页分类目录或关键词检索；主动公开范围以外的信息，可通过依申请公开流程提出申请。</p>"
    },
    rules: {
      title: "信息公开制度",
      html: "<p>学校建立由信息公开办公室统筹、各职能部门共同参与的信息公开工作机制，并对信息制作、审核、发布、更新和监督进行规范管理。</p><p>本窗口为演示内容。做不动更多了（）</p>"
    },
    report: {
      title: "文件占位区域",
      html: "<p>42个文件 一个一个写真要死人的啊T_T</p><p>不搞了 摆烂！</p>"
    },
    application: {
      title: "依申请公开模拟入口",
      html: "<p>为避免收集真实个人信息，本演示页不提供线上表单。</p><p>请勿在虚构网站中填写真实姓名、身份证号、联系方式或其他个人敏感信息。</p>"
    }
  };

  function openInfoPanel(key) {
    const panel = panelContent[key];
    if (!panel) return;
    document.querySelector("#infoDialogTitle").textContent = panel.title;
    document.querySelector("#infoDialogContent").innerHTML = panel.html;
    infoDialog.showModal();
  }

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      categoryButtons.forEach((entry) => entry.classList.toggle("is-active", entry === button));
      render();
    });
  });

  search.addEventListener("input", render);
  root.querySelector("#clearDisclosureSearch").addEventListener("click", () => {
    search.value = "";
    search.focus();
    render();
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-disclosure-id]");
    if (button) openDetails(button.dataset.disclosureId);
  });

  root.querySelectorAll("[data-info-panel]").forEach((button) => {
    button.addEventListener("click", () => openInfoPanel(button.dataset.infoPanel));
  });

  root.querySelector("[data-application-button]").addEventListener("click", () => openInfoPanel("application"));
  document.querySelector("[data-dialog-close]").addEventListener("click", () => detailDialog.close());
  document.querySelector("[data-info-close]").addEventListener("click", () => infoDialog.close());
  document.querySelector("[data-document-button]").addEventListener("click", () => {
    detailDialog.close();
    openInfoPanel("report");
  });

  [detailDialog, infoDialog].forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) dialog.close();
    });
  });

  updateCounts();
  render();
})();
