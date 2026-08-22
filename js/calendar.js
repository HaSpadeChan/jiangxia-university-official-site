(function () {
  "use strict";

  const root = document.querySelector("[data-calendar-root]");
  if (!root) return;

  const terms = {
    autumn: {
      badge: "AUTUMN",
      title: "秋季学期重要安排",
      range: "2026年8月20日—2027年2月21日",
      months: [[2026, 8], [2026, 9], [2026, 10], [2026, 11], [2026, 12], [2027, 1], [2027, 2]],
      teaching: ["2026-09-21", "2027-01-10"],
      weekStart: "2026-09-21"
    },
    spring: {
      badge: "SPRING",
      title: "春季学期重要安排",
      range: "2027年2月19日—2027年8月15日",
      months: [[2027, 2], [2027, 3], [2027, 4], [2027, 5], [2027, 6], [2027, 7], [2027, 8]],
      teaching: ["2027-02-22", "2027-06-13"],
      weekStart: "2027-02-22"
    }
  };

  const events = [
    { date: "2026-08-20", term: "autumn", type: "event", text: "教职工上班" },
    { date: "2026-08-24", end: "2026-09-19", term: "autumn", type: "teaching", text: "本科生暑期学校" },
    { date: "2026-08-29", term: "autumn", type: "event", text: "本科新生报到注册" },
    { date: "2026-08-30", end: "2026-09-12", term: "autumn", type: "event", text: "本科新生军训与入学教育" },
    { date: "2026-09-09", term: "autumn", type: "event", text: "校学位评定委员会会议" },
    { date: "2026-09-17", term: "autumn", type: "event", text: "2026级新生开学典礼" },
    { date: "2026-09-18", end: "2026-09-19", term: "autumn", type: "event", text: "在校生报到注册" },
    { date: "2026-09-21", term: "autumn", type: "event", text: "秋季学期正式上课" },
    { date: "2026-09-25", end: "2026-09-27", term: "autumn", type: "holiday", text: "中秋节假期" },
    { date: "2026-10-01", end: "2026-10-07", term: "autumn", type: "holiday", text: "国庆节假期（教学调整以通知为准）" },
    { date: "2026-11-05", end: "2026-11-07", term: "autumn", type: "event", text: "江夏大学秋季运动会" },
    { date: "2026-12-16", term: "autumn", type: "event", text: "校学位评定委员会会议" },
    { date: "2027-01-11", end: "2027-01-24", term: "autumn", type: "exam", text: "秋季学期期末复习与考试" },
    { date: "2027-01-25", end: "2027-02-21", term: "autumn", type: "holiday", text: "学生寒假" },
    { date: "2027-02-19", term: "spring", type: "event", text: "教职工上班" },
    { date: "2027-02-22", end: "2027-02-26", term: "spring", type: "event", text: "春季学期报到注册" },
    { date: "2027-02-22", term: "spring", type: "event", text: "春季学期正式上课" },
    { date: "2027-03-03", term: "spring", type: "event", text: "2027级春季博士研究生报到" },
    { date: "2027-03-17", term: "spring", type: "event", text: "校学位评定委员会会议" },
    { date: "2027-04-04", end: "2027-04-06", term: "spring", type: "holiday", text: "清明节假期（暂定）" },
    { date: "2027-05-01", end: "2027-05-05", term: "spring", type: "holiday", text: "劳动节假期（暂定）" },
    { date: "2027-06-14", end: "2027-06-27", term: "spring", type: "exam", text: "春季学期期末复习与考试" },
    { date: "2027-06-18", term: "spring", type: "event", text: "校学位评定委员会会议" },
    { date: "2027-06-19", end: "2027-06-25", term: "spring", type: "event", text: "本科毕业生离校手续办理" },
    { date: "2027-06-22", end: "2027-06-23", term: "spring", type: "event", text: "2027届毕业典礼暨学位授予仪式" },
    { date: "2027-06-28", end: "2027-08-15", term: "spring", type: "holiday", text: "学生暑假" },
    { date: "2027-07-05", end: "2027-08-12", term: "spring", type: "holiday", text: "教职工轮休" },
    { date: "2027-08-13", term: "spring", type: "event", text: "教职工上班" }
  ];

  const monthGrid = root.querySelector("#monthGrid");
  const eventList = root.querySelector("#eventList");
  const termRange = root.querySelector("#termRange");
  const termBadge = root.querySelector("#termBadge");
  const termNotesTitle = root.querySelector("#termNotesTitle");
  const detail = root.querySelector("#selectedDateDetail");
  const termButtons = Array.from(root.querySelectorAll("[data-term]"));
  const todayKey = formatDate(new Date());
  let currentTerm = "autumn";

  function toDate(key) {
    const parts = key.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function displayDate(key) {
    const date = toDate(key);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }

  function isBetween(key, start, end) {
    return key >= start && key <= end;
  }

  function eventsOnDate(key, term) {
    return events.filter((event) => event.term === term && isBetween(key, event.date, event.end || event.date));
  }

  function dayType(key, term) {
    const dayEvents = eventsOnDate(key, term);
    if (dayEvents.some((event) => event.type === "holiday")) return "holiday";
    if (dayEvents.some((event) => event.type === "exam")) return "exam";
    if (dayEvents.some((event) => event.type === "teaching")) return "teaching";
    const config = terms[term];
    const date = toDate(key);
    const weekday = date.getDay();
    if (isBetween(key, config.teaching[0], config.teaching[1]) && weekday !== 0 && weekday !== 6) return "teaching";
    return "";
  }

  function academicWeek(monday, term) {
    const start = toDate(terms[term].weekStart);
    const difference = Math.floor((monday - start) / 604800000) + 1;
    return difference >= 1 && difference <= 18 ? String(difference) : "";
  }

  function renderMonth(year, month, term) {
    const first = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0).getDate();
    const mondayOffset = (first.getDay() + 6) % 7;
    const rowCount = Math.ceil((mondayOffset + lastDay) / 7);
    let rows = "";

    for (let row = 0; row < rowCount; row += 1) {
      const monday = new Date(year, month - 1, 1 - mondayOffset + row * 7);
      let cells = `<td class="week-number">${academicWeek(monday, term)}</td>`;
      for (let column = 0; column < 7; column += 1) {
        const day = row * 7 + column - mondayOffset + 1;
        if (day < 1 || day > lastDay) {
          cells += "<td></td>";
          continue;
        }
        const date = new Date(year, month - 1, day);
        const key = formatDate(date);
        const dayEvents = eventsOnDate(key, term);
        const type = dayType(key, term);
        const classes = ["calendar-day"];
        if (column >= 5) classes.push("is-weekend");
        if (type) classes.push(`is-${type}`);
        if (dayEvents.length) classes.push("has-event");
        if (key === todayKey) classes.push("is-today");
        const label = `${displayDate(key)}${dayEvents.length ? `，${dayEvents.map((event) => event.text).join("；")}` : ""}`;
        const tag = dayEvents.length ? "button" : "span";
        const attributes = dayEvents.length ? ` type="button" data-calendar-date="${key}"` : "";
        cells += `<td><${tag}${attributes} class="${classes.join(" ")}" aria-label="${label}">${day}</${tag}></td>`;
      }
      rows += `<tr>${cells}</tr>`;
    }

    return `
      <section class="month-card" aria-labelledby="month-${year}-${month}">
        <h2 id="month-${year}-${month}">${year}年${month}月</h2>
        <table>
          <thead><tr><th>周</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th class="weekend">六</th><th class="weekend">日</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </section>`;
  }

  function eventDateText(event) {
    return event.end ? `${displayDate(event.date)}—${displayDate(event.end)}` : displayDate(event.date);
  }

  function renderTerm(term) {
    const config = terms[term];
    currentTerm = term;
    monthGrid.innerHTML = config.months.map(([year, month]) => renderMonth(year, month, term)).join("");
    eventList.innerHTML = events.filter((event) => event.term === term).map((event) => `
      <li><time datetime="${event.date}">${eventDateText(event)}</time>${event.text}</li>`).join("");
    termRange.textContent = config.range;
    termBadge.textContent = config.badge;
    termNotesTitle.textContent = config.title;
    detail.textContent = "点击带有圆点的日期，可查看当天安排。";
    termButtons.forEach((button) => {
      const active = button.dataset.term === term;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  termButtons.forEach((button) => {
    button.addEventListener("click", () => renderTerm(button.dataset.term));
  });

  monthGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-calendar-date]");
    if (!button) return;
    const key = button.dataset.calendarDate;
    const items = eventsOnDate(key, currentTerm);
    detail.innerHTML = `<strong>${displayDate(key)}</strong>　${items.map((item) => item.text).join("；")}`;
  });

  root.querySelector("[data-print-calendar]").addEventListener("click", () => window.print());
  renderTerm(currentTerm);
})();
