(() => {
  "use strict";

  const categoryLabels = {
    academic: "教学科研",
    landmark: "校园地标",
    life: "生活服务",
    sport: "体育设施",
    landscape: "水景园林"
  };

  const places = [
    {
      id: "library-pool", name: "图书馆馆前水池", english: "LIBRARY REFLECTING POOL", category: "landscape",
      description: "位于校园北端、图书馆正前方的静水水池，主要形成建筑倒影，与图书馆入口广场共同组成北部礼仪空间。",
      hours: "全天开放，请勿下水", nearby: "图书馆、北部林荫步道", keywords: "水池 图书馆 倒影 水景 北部",
      point: [735, 105], route: [[745, 970], [745, 712], [729, 697], [729, 628], [760, 520], [735, 105]]
    },
    {
      id: "library", name: "图书馆", english: "UNIVERSITY LIBRARY", category: "academic",
      description: "校园北部的综合文献与学习中心，设公共阅览、研讨间、特藏与数字资源服务，建筑南侧面向校园主湖。",
      hours: "07:30—22:30", nearby: "馆前水池、主湖、北部学习区", keywords: "图书 阅读 自习 文献 研讨",
      point: [727, 198], route: [[745, 970], [745, 712], [729, 628], [760, 520], [727, 198]]
    },
    {
      id: "stadium", name: "体育场", english: "ATHLETIC FIELD", category: "sport",
      description: "位于校园东北部，包括标准田径场和足球场，是体育课程、日常训练和大型校园活动的主要场地。",
      hours: "06:30—21:30", nearby: "体育馆、工程实验中心", keywords: "操场 田径 足球 跑步 体育",
      point: [1126, 301], route: [[745, 970], [745, 713], [969, 713], [969, 586], [1227, 586], [1227, 302], [1126, 301]]
    },
    {
      id: "gymnasium", name: "体育馆", english: "GYMNASIUM", category: "sport",
      description: "体育场东侧的室内运动建筑，可容纳篮球、羽毛球、排球训练以及校级体育活动。",
      hours: "08:00—21:30", nearby: "体育场、东北门支路", keywords: "室内 体育 篮球 羽毛球 排球",
      point: [1300, 316], route: [[745, 970], [745, 713], [969, 713], [1227, 586], [1227, 316], [1300, 316]]
    },
    {
      id: "innovation", name: "实验楼与创新中心", english: "LABORATORY & INNOVATION CENTER", category: "academic",
      description: "位于主湖西南侧的实验与创新组团，设置公共实验平台、创客空间、项目路演厅和跨学科协作空间。",
      hours: "08:00—22:00，部分区域需预约", nearby: "主湖、大礼堂、人文社科楼群", keywords: "实验 创新 创客 科研 路演",
      point: [422, 618], route: [[745, 970], [745, 827], [531, 827], [531, 713], [422, 618]]
    },
    {
      id: "grand-hall", name: "大礼堂", english: "UNIVERSITY AUDITORIUM", category: "landmark",
      description: "位于主湖正南侧、校园礼仪轴线上，用于开学典礼、学术报告、艺术演出与重要会议。礼堂南侧设置独立喷泉。",
      hours: "按活动安排开放", nearby: "主湖、礼堂喷泉、中央庭园", keywords: "礼堂 会议 演出 典礼 报告",
      point: [729, 628], route: [[745, 970], [745, 712], [729, 697], [729, 628]]
    },
    {
      id: "grand-fountain", name: "礼堂喷泉", english: "AUDITORIUM FOUNTAIN", category: "landmark",
      description: "位于大礼堂正南侧的轴线喷泉，是礼堂前广场的视觉中心，并连接南侧草坪、倒影池与中央庭园。",
      hours: "水景演示 10:00、16:00、19:30", nearby: "大礼堂、中央庭园", keywords: "喷泉 水景 礼堂 广场",
      point: [729, 697], route: [[745, 970], [745, 712], [729, 697]]
    },
    {
      id: "engineering", name: "工程实验中心", english: "ENGINEERING LAB CENTER", category: "academic",
      description: "位于体育区南侧的工程实践平台，提供工程训练、原型制造、智能控制和学生科研项目空间。",
      hours: "08:00—21:00，实验室需预约", nearby: "体育场、医学楼、理工教学楼群", keywords: "工程 实验 制造 控制 科研",
      point: [1092, 540], route: [[745, 970], [745, 713], [969, 713], [969, 586], [1092, 540]]
    },
    {
      id: "medical", name: "医学楼", english: "SCHOOL OF MEDICINE", category: "academic",
      description: "位于校园东侧中部的医学教学楼，配置基础医学实验室、形态学平台、模拟教学空间和师生研讨区。",
      hours: "07:30—22:00", nearby: "工程实验中心、理工教学楼群", keywords: "医学 生命科学 实验 教学 模拟",
      point: [1093, 648], route: [[745, 970], [745, 713], [969, 713], [1093, 648]]
    },
    {
      id: "humanities", name: "人文社科楼群", english: "HUMANITIES COMPLEX", category: "academic",
      description: "中央庭园西侧的院落式教学组团，容纳文学、历史、法学、经济与公共管理相关教学空间。",
      hours: "教学日 07:00—22:00", nearby: "中央庭园、学生食堂、西苑学生公寓", keywords: "人文 社科 文学 历史 法学 经济",
      point: [473, 805], route: [[745, 970], [745, 901], [531, 901], [531, 827], [473, 805]]
    },
    {
      id: "science", name: "理工教学楼群", english: "SCIENCE & ENGINEERING COMPLEX", category: "academic",
      description: "中央庭园东侧的理工科教学组团，设置公共教室、基础实验室、计算中心与专业研讨空间。",
      hours: "教学日 07:00—22:00", nearby: "中央庭园、医学楼、大学生活动中心", keywords: "理工 数学 物理 计算机 教学",
      point: [984, 805], route: [[745, 970], [745, 901], [969, 901], [969, 827], [984, 805]]
    },
    {
      id: "canteen", name: "学生食堂", english: "STUDENT DINING HALL", category: "life",
      description: "位于校园南部西侧的综合餐饮空间，设置基本餐、地方风味、轻食与师生交流区。",
      hours: "06:30—09:00；10:30—13:30；16:30—20:00", nearby: "西苑学生公寓、校医院", keywords: "食堂 餐厅 吃饭 餐饮 轻食",
      point: [425, 946], route: [[745, 970], [745, 901], [425, 901], [425, 946]]
    },
    {
      id: "west-dorm", name: "西苑学生公寓", english: "WEST RESIDENCE HALLS", category: "life",
      description: "南门西侧的学生居住组团，配置门禁、自习室、洗衣房和共享会客空间。",
      hours: "门禁时段按学生管理规定执行", nearby: "学生食堂、校医院、南门", keywords: "宿舍 公寓 西苑 住宿 洗衣",
      point: [613, 945], route: [[745, 970], [745, 901], [613, 901], [613, 945]]
    },
    {
      id: "south-gate", name: "江夏大学南门", english: "SOUTH GATE", category: "landmark",
      description: "校园南侧主入口，进入后依次连接学生生活区、中央庭园、礼堂喷泉和大礼堂。",
      hours: "每日 06:00—23:00", nearby: "校医院、东西苑学生公寓", keywords: "南门 大门 校门 入口 访客",
      point: [745, 970], route: [[745, 970]]
    },
    {
      id: "east-dorm", name: "东苑学生公寓", english: "EAST RESIDENCE HALLS", category: "life",
      description: "南门东侧的学生居住组团，邻近大学生活动中心，配置公共自习与生活服务空间。",
      hours: "门禁时段按学生管理规定执行", nearby: "大学生活动中心、南门", keywords: "宿舍 公寓 东苑 住宿 洗衣",
      point: [889, 945], route: [[745, 970], [745, 901], [889, 901], [889, 945]]
    },
    {
      id: "student-center", name: "大学生活动中心", english: "STUDENT ACTIVITY CENTER", category: "life",
      description: "校园南部东侧的学生公共空间，提供社团排练、学生事务咨询、展览和多功能活动场地。",
      hours: "08:00—22:00", nearby: "东苑学生公寓、理工教学楼群", keywords: "学生 社团 活动 排练 服务",
      point: [1064, 946], route: [[745, 970], [745, 901], [1064, 901], [1064, 946]]
    },
    {
      id: "central-gardens", name: "中央庭园", english: "CENTRAL GARDENS", category: "landscape",
      description: "大礼堂南侧、两组教学楼之间的轴线景观，由草坪、步道与矩形倒影池组成，连接教学区和学生生活区。",
      hours: "全天开放", nearby: "大礼堂、人文社科楼群、理工教学楼群", keywords: "草坪 庭园 倒影池 中央 景观",
      point: [746, 803], route: [[745, 970], [745, 803]]
    },
    {
      id: "campus-clinic", name: "校医院", english: "CAMPUS CLINIC", category: "life",
      description: "校园南部西侧的基础医疗服务点，提供门诊、健康咨询与常用药品服务；紧急情况请直接联系当地急救机构。",
      hours: "门诊 08:00—17:30；值班安排以通知为准", nearby: "学生食堂、西苑学生公寓", keywords: "医院 医务室 门诊 健康 药品",
      point: [275, 921], route: [[745, 970], [745, 901], [282, 901], [275, 921]]
    }
  ];

  const byId = new Map(places.map((place) => [place.id, place]));
  const mapSvg = document.getElementById("mapSvg");
  const mapCanvas = document.getElementById("campusMap");
  const placeNodes = [...document.querySelectorAll(".place[data-place]")];
  const search = document.getElementById("placeSearch");
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const status = document.getElementById("mapStatus");
  const searchResults = document.getElementById("searchResults");
  const placeList = document.getElementById("placeList");
  const resultCount = document.getElementById("resultCount");
  const card = document.getElementById("placeCard");
  const routeLayer = document.getElementById("routeLayer");
  const routeLine = document.getElementById("routeLine");
  const clearRoute = document.getElementById("clearRoute");

  let activeFilter = "all";
  let selectedId = "south-gate";
  let routeVisible = false;
  let view = { x: 0, y: 0, w: 1500, h: 1050 };
  let drag = null;
  let didDrag = false;
  let suppressClickUntil = 0;

  const normalize = (value) => value.toLocaleLowerCase("zh-CN").replace(/\s+/g, "").trim();

  function matches() {
    const query = normalize(search.value);
    return places.filter((place) => {
      const inCategory = activeFilter === "all" || place.category === activeFilter;
      const haystack = normalize(`${place.name}${place.english}${place.description}${place.keywords}`);
      return inCategory && (!query || haystack.includes(query));
    });
  }

  function renderResults() {
    const visible = matches();
    const ids = new Set(visible.map((place) => place.id));
    placeNodes.forEach((node) => node.classList.toggle("is-hidden", !ids.has(node.dataset.place)));
    status.textContent = visible.length ? `当前显示 ${visible.length} 个地点` : "没有找到匹配地点";
    resultCount.textContent = `${visible.length} 处`;

    const hasFilter = activeFilter !== "all" || search.value.trim() !== "";
    searchResults.hidden = !hasFilter;
    if (!hasFilter) return;

    if (!visible.length) {
      placeList.innerHTML = '<p class="empty-result">没有匹配结果，请更换关键词或分类。</p>';
      return;
    }

    placeList.innerHTML = visible.map((place, index) => `
      <button type="button" data-list-place="${place.id}">
        <span class="number">${String(index + 1).padStart(2, "0")}</span>
        <strong>${place.name}</strong>
        <small>${categoryLabels[place.category]}</small>
      </button>
    `).join("");

    placeList.querySelectorAll("[data-list-place]").forEach((button) => {
      button.addEventListener("click", () => {
        searchResults.hidden = true;
        selectPlace(button.dataset.listPlace, true);
      });
    });
  }

  function clearActiveRoute() {
    routeLayer.classList.remove("is-visible");
    routeLine.setAttribute("points", "");
    clearRoute.hidden = true;
    routeVisible = false;
  }

  function fillCard(place) {
    document.getElementById("detailCategory").textContent = categoryLabels[place.category];
    document.getElementById("detailName").textContent = place.name;
    document.getElementById("detailEnglish").textContent = place.english;
    document.getElementById("detailDescription").textContent = place.description;
    document.getElementById("detailHours").textContent = place.hours;
    document.getElementById("detailNearby").textContent = place.nearby;
    const routeButton = document.getElementById("routeButton");
    routeButton.disabled = place.id === "south-gate";
    routeButton.textContent = place.id === "south-gate" ? "当前地点为路线起点" : "从南门规划路线";
    card.classList.add("is-open");
  }

  function selectPlace(id, focusMap = false) {
    const place = byId.get(id);
    if (!place) return;
    selectedId = id;
    placeNodes.forEach((node) => node.classList.toggle("is-active", node.dataset.place === id));
    clearActiveRoute();
    fillCard(place);
    status.textContent = `已选择：${place.name}`;
    window.history.replaceState(null, "", `#${id}`);
    if (focusMap) centerOn(place.point[0], place.point[1], 1.7);
  }

  function showRoute() {
    const place = byId.get(selectedId);
    if (!place || place.route.length < 2) return;
    routeLine.setAttribute("points", place.route.map((point) => point.join(",")).join(" "));
    routeLayer.classList.add("is-visible");
    clearRoute.hidden = false;
    routeVisible = true;
    resetView();
    status.textContent = `已显示：南门 → ${place.name} 的步行示意路线`;
  }

  function setViewBox() {
    view.w = Math.min(1500, Math.max(420, view.w));
    view.h = view.w * .7;
    view.x = Math.min(1500 - view.w, Math.max(0, view.x));
    view.y = Math.min(1050 - view.h, Math.max(0, view.y));
    mapSvg.setAttribute("viewBox", `${view.x} ${view.y} ${view.w} ${view.h}`);
  }

  function resetView() {
    view = { x: 0, y: 0, w: 1500, h: 1050 };
    setViewBox();
  }

  function centerOn(x, y, zoom) {
    const width = 1500 / zoom;
    const height = width * .7;
    view = { x: x - width / 2, y: y - height / 2, w: width, h: height };
    setViewBox();
  }

  function zoomAt(factor, clientX, clientY) {
    const rect = mapSvg.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width;
    const py = (clientY - rect.top) / rect.height;
    const cursorX = view.x + px * view.w;
    const cursorY = view.y + py * view.h;
    const nextW = Math.min(1500, Math.max(420, view.w * factor));
    const nextH = nextW * .7;
    view = { x: cursorX - px * nextW, y: cursorY - py * nextH, w: nextW, h: nextH };
    setViewBox();
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderResults();
    });
  });

  search.addEventListener("input", renderResults);
  search.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      search.value = "";
      renderResults();
      search.blur();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
      event.preventDefault();
      search.focus();
    }
  });

  mapSvg.addEventListener("click", (event) => {
    const placeNode = event.target.closest?.(".place[data-place]");
    if (!placeNode) return;
    event.preventDefault();
    if (Date.now() < suppressClickUntil) return;
    selectPlace(placeNode.dataset.place, true);
  });

  document.getElementById("cardClose").addEventListener("click", () => card.classList.remove("is-open"));
  document.getElementById("routeButton").addEventListener("click", showRoute);
  clearRoute.addEventListener("click", () => {
    clearActiveRoute();
    status.textContent = "路线已清除";
  });

  document.getElementById("zoomIn").addEventListener("click", () => {
    const rect = mapSvg.getBoundingClientRect();
    zoomAt(.8, rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
  document.getElementById("zoomOut").addEventListener("click", () => {
    const rect = mapSvg.getBoundingClientRect();
    zoomAt(1.25, rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
  document.getElementById("resetView").addEventListener("click", resetView);

  mapSvg.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoomAt(event.deltaY > 0 ? 1.12 : .88, event.clientX, event.clientY);
  }, { passive: false });

  mapSvg.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    drag = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      x: view.x,
      y: view.y,
      captured: false
    };
    didDrag = false;
  });
  mapSvg.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const rect = mapSvg.getBoundingClientRect();
    const dx = event.clientX - drag.clientX;
    const dy = event.clientY - drag.clientY;
    if (!didDrag && Math.abs(dx) + Math.abs(dy) > 5) {
      didDrag = true;
      mapCanvas.classList.add("is-dragging");
      if (mapSvg.setPointerCapture && event.pointerId !== undefined) {
        mapSvg.setPointerCapture(event.pointerId);
        drag.captured = true;
      }
    }
    if (!didDrag || !rect.width || !rect.height) return;
    view.x = drag.x - (dx / rect.width) * view.w;
    view.y = drag.y - (dy / rect.height) * view.h;
    setViewBox();
  });

  function endDrag(event) {
    if (!drag) return;
    const wasDragging = didDrag;
    const hadCapture = drag.captured;
    drag = null;
    mapCanvas.classList.remove("is-dragging");
    if (hadCapture && mapSvg.hasPointerCapture?.(event.pointerId)) {
      mapSvg.releasePointerCapture(event.pointerId);
    }
    if (wasDragging) suppressClickUntil = Date.now() + 250;
    didDrag = false;
  }

  mapSvg.addEventListener("pointerup", endDrag);
  mapSvg.addEventListener("pointercancel", endDrag);

  const hashId = window.location.hash.slice(1);
  renderResults();
  resetView();
  if (byId.has(hashId)) selectPlace(hashId, false);
})();
