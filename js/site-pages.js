(function () {
  "use strict";

  /*
 * 统一信息门户暂未开放登录。
 * 后续接入后端认证系统后再恢复登录功能。
 */
  const PORTAL_LOGIN_ENABLED = false;
  const SESSION_KEY = "jx_portal_session";
  const RETURN_URL_KEY = "jx_portal_return_url";
  const WINDOW_STATE_PREFIX = "JX_PORTAL_STATE:";
  const LOGIN_VALID_DAYS = 7;

  const roleSettings = {
    student: {
      accountLabel: "学生账号",
      accountPlaceholder: "请输入学号",
      explanation: "用于学生账户登录。",
      submitText: "登录学生门户",
    },
    staff: {
      accountLabel: "教职工账号",
      accountPlaceholder: "请输入工号",
      explanation: "用于教职工账户登录",
      submitText: "登录教职工门户",
    },
    alumni: {
      accountLabel: "校友账号",
      accountPlaceholder: "请输入校友账号",
      explanation: "用于校友账号登录",
      submitText: "登录校友门户",
    },
    visitor: {
      explanation: "请勿填写真实手机号。",
      submitText: "进入访客系统",
    },
  };

  /*
   * file:// 页面在部分浏览器中不会跨 HTML 文件共享 sessionStorage。
   * 因此同时把演示状态写入 window.name；它会在同一标签页跳转时保留，
   * 可以避免“登录页 → 功能页 → 登录页”的无限跳转。
   */
  function readWindowState() {
    try {
      if (!window.name.startsWith(WINDOW_STATE_PREFIX)) return {};
      return JSON.parse(window.name.slice(WINDOW_STATE_PREFIX.length)) || {};
    } catch (error) {
      return {};
    }
  }

  function writeWindowState(changes) {
    const nextState = { ...readWindowState(), ...changes };
    Object.keys(nextState).forEach((key) => {
      if (nextState[key] === null || nextState[key] === undefined)
        delete nextState[key];
    });
    window.name = WINDOW_STATE_PREFIX + JSON.stringify(nextState);
  }

  function safeStorageGet(key) {
    try {
      return sessionStorage.getItem(key) || localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      /* file:// 环境可能禁用 sessionStorage，继续使用 window.name。 */
    }
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      /* 某些浏览器不允许本地文件使用 localStorage。 */
    }
  }

  function safeStorageRemove(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {}
    try {
      localStorage.removeItem(key);
    } catch (error) {}
  }

  function getSession() {
  /*
   * 登录功能关闭期间，不接受任何历史登录状态。
   * 同时清除浏览器中此前保存的会话。
   */
  safeStorageRemove(SESSION_KEY);
  writeWindowState({ session: null });

  return null;
}

  function saveSession(value) {
  const expiresAt =
    Date.now() + LOGIN_VALID_DAYS * 24 * 60 * 60 * 1000;

  const sessionData = {
    ...value,
    expiresAt: expiresAt,
  };

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(sessionData),
  );
  }

  function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  }

  function saveReturnUrl(url) {
    safeStorageSet(RETURN_URL_KEY, url);
    writeWindowState({ returnUrl: url });
  }

  function takeReturnUrl() {
    const url =
      safeStorageGet(RETURN_URL_KEY) || readWindowState().returnUrl || "";
    safeStorageRemove(RETURN_URL_KEY);
    writeWindowState({ returnUrl: null });
    return url;
  }

  function getSitePageUrl(relativePath) {
    const marker = "/pages/";
    const currentUrl = window.location.href;
    const markerIndex = currentUrl.lastIndexOf(marker);
    if (markerIndex === -1) return relativePath;
    return currentUrl.slice(0, markerIndex) + "/pages/" + relativePath;
  }

  function isProtectedPage() {
    const path = window.location.pathname.replace(/\\/g, "/");
    return [
      "/pages/services/ehall.html",
      "/pages/services/email.html",
      "/pages/services/library.html",
    ].some((protectedPath) => path.endsWith(protectedPath));
  }

  /* 直接打开办事大厅或电子邮箱时，也必须先经过学生门户登录。 */
  if (isProtectedPage() && !getSession()) {
    saveReturnUrl(window.location.href);
    const loginUrl = getSitePageUrl("portal/login.html");
    if (window.location.href !== loginUrl) window.location.replace(loginUrl);
    return;
  }

  const toggle = document.querySelector("[data-mobile-toggle]");
  const nav = document.querySelector("[data-main-nav]");
  toggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(Boolean(open)));
  });

  document.querySelectorAll("[data-placeholder]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast(
        link.getAttribute("data-placeholder") || "该外部平台地址暂未配置",
      );
    });
  });

  /* 其他页面如需强制登录，只要给链接添加 data-login-required 即可。 */
  document.querySelectorAll("[data-login-required]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (getSession()) return;
      event.preventDefault();
      const target = link.href;
      if (target) saveReturnUrl(target);
      window.location.href = getSitePageUrl("portal/login.html");
    });
  });

  function showToast(message) {
    let toast = document.querySelector("[data-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("data-toast", "");
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(window.__jxToastTimer);
    window.__jxToastTimer = window.setTimeout(
      () => toast.classList.remove("is-visible"),
      3000,
    );
  }

  const loginForm = document.querySelector("[data-login-form]");

  if (loginForm) {
    const requestedRole = new URLSearchParams(window.location.search).get("role");
    if (getSession() && (!requestedRole || requestedRole === "student")) {
      window.location.replace(
        loginForm.getAttribute("data-dashboard") ||
        "dashboard.html",
      );
    } else {
      initialiseLoginForm(loginForm, requestedRole);
    }
  }

  function initialiseLoginForm(form, requestedRole) {
    const roleInput = form.querySelector("[name=role]");
    const accountField = form.querySelector("[data-account-field]");
    const passwordField = form.querySelector("[data-password-field]");
    const phoneField = form.querySelector("[data-phone-field]");
    const accountLabel = accountField?.querySelector("label");
    const accountInput = form.querySelector("[name=account]");
    const passwordInput = form.querySelector("[name=password]");
    const phoneInput = form.querySelector("[name=phone]");
    const explanation = form.querySelector("[data-role-explanation]");
    const submitButton = form.querySelector("[data-login-submit]");
    const feedback = form.querySelector("[data-login-feedback]");
    const roleTabs = document.querySelectorAll("[data-login-role]");

    function showFeedback(message, type) {
      if (!feedback) return;
      feedback.textContent = message;
      feedback.hidden = false;
      feedback.classList.toggle("is-maintenance", type === "maintenance");
    }

    function clearFeedback() {
      if (!feedback) return;
      feedback.textContent = "";
      feedback.hidden = true;
      feedback.classList.remove("is-maintenance");
    }

    function selectRole(role) {
      const setting = roleSettings[role] || roleSettings.student;
      const isVisitor = role === "visitor";
      roleInput.value = role;
      accountField.hidden = isVisitor;
      passwordField.hidden = isVisitor;
      phoneField.hidden = !isVisitor;

      if (accountLabel && setting.accountLabel)
        accountLabel.textContent = setting.accountLabel;
      if (accountInput && setting.accountPlaceholder)
        accountInput.placeholder = setting.accountPlaceholder;
      if (explanation) explanation.textContent = setting.explanation;
      if (submitButton) submitButton.textContent = setting.submitText;

      roleTabs.forEach((tab) => {
        const active = tab.getAttribute("data-login-role") === role;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });

      accountInput.value = "";
      passwordInput.value = "";
      phoneInput.value = "";
      clearFeedback();
      (isVisitor ? phoneInput : accountInput)?.focus();
    }

    roleTabs.forEach((tab) => {
      tab.addEventListener("click", () =>
        selectRole(tab.getAttribute("data-login-role") || "student"),
      );
    });

    const allowedRoles = ["student", "staff", "alumni", "visitor"];
    selectRole(
      allowedRoles.includes(requestedRole) ? requestedRole : "student",
    );

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearFeedback();

      const role = roleInput.value;
      const account = accountInput.value.trim();
      const password = passwordInput.value;
      const phone = phoneInput.value.trim();

      if (role === "visitor") {
        if (!phone) {
          showFeedback("请填写手机号。当然了，该系统为虚构，请勿填写真实手机号。");
          return;
        }
        showFeedback("访客登录系统目前维护中。", "maintenance");
        return;
      }

      if (!account || !password) {
        showFeedback("请输入账号和密码。");
        return;
      }

      if (role === "staff") {
        showFeedback("账号或密码不正确。");
        return;
      }

      if (role === "alumni") {
        showFeedback("账号或密码不正确。你是校友吗你就填");
        return;
      }

      if (role === "student") {
        showFeedback("账号或密码不正确。");
        return;
      }
    });
  }

  /*
   * 登录表单也带有 data-dashboard="dashboard.html"，不能用宽泛的
   * [data-dashboard] 选择器，否则登录页会被误判为控制台并反复刷新。
   */
  const dashboard = document.querySelector("section[data-dashboard]");
  if (dashboard) {
    const session = getSession();
    if (!session) {
      window.location.replace("login.html");
      return;
    }
    const name = dashboard.querySelector("[data-user-name]");
    if (name) name.textContent = session.account;
  }

  document.querySelectorAll("[data-logout]").forEach((logoutLink) => {
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      clearSession();
      safeStorageRemove(RETURN_URL_KEY);
      writeWindowState({ returnUrl: null });
      window.location.href =
      logoutLink.getAttribute("href") || getSitePageUrl("portal/login.html");
    });
  });

  /* v0.3 栏目页通用筛选：同时支持分类按钮和当前页关键词。 */
  document.querySelectorAll("[data-filter-scope]").forEach((scope) => {
    const buttons = Array.from(scope.querySelectorAll("[data-filter]"));
    const items = Array.from(scope.querySelectorAll("[data-filter-item]"));
    const search = scope.querySelector("[data-filter-search]");
    const empty = scope.querySelector("[data-filter-empty]");
    let activeFilter = "all";

    function updateFilter() {
      const keyword = (search?.value || "").trim().toLowerCase();
      let visibleCount = 0;
      items.forEach((item) => {
        const categories = (item.getAttribute("data-category") || "")
          .split(/\s+/)
          .filter(Boolean);
        const categoryMatch =
          activeFilter === "all" || categories.includes(activeFilter);
        const keywordMatch =
          !keyword || item.textContent.toLowerCase().includes(keyword);
        const visible = categoryMatch && keywordMatch;
        item.classList.toggle("is-hidden", !visible);
        if (visible) visibleCount += 1;
      });
      if (empty) empty.hidden = visibleCount !== 0;
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.getAttribute("data-filter") || "all";
        buttons.forEach((candidate) =>
          candidate.classList.toggle("is-active", candidate === button),
        );
        updateFilter();
      });
    });
    search?.addEventListener("input", updateFilter);
    updateFilter();
  });

  /* 所有演示表单只在本地反馈，不保存或发送用户输入。 */
  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      showToast(
        form.getAttribute("data-success") ||
        "演示操作已完成，本页面不会向服务器发送数据。",
      );
      form.reset();
    });
  });

  /* 小夏就业助手：仅回答预先写入的六类常见问题。 */
  const careerAssistant = document.querySelector("[data-career-assistant]");
  if (careerAssistant) {
    const log = careerAssistant.querySelector("[data-career-log]");
    const form = careerAssistant.querySelector("[data-career-form]");
    const input = careerAssistant.querySelector("[data-career-input]");
    const answers = {
      recruitment:
        "招聘信息在统一信息门户的“就业服务—招聘信息”中按行业、地区和学历要求查询。公开页面只展示活动概况，岗位详情需要学生身份登录。",
      guidance:
        "登录学生门户后进入“就业服务—生涯咨询”，选择咨询主题和空闲时段。首次咨询建议提前写下你最难决定的一件事。",
      agreement:
        "收到正式录用意向后，在学生门户发起三方协议申请；学院审核单位与个人信息后生成办理记录。请勿在非官方渠道上传完整协议。",
      recommendation:
        "就业推荐表由学生在门户确认个人信息后申请，学院审核学习经历，就业中心统一生成。发现信息错误时应先联系学院更正。",
      fair:
        "秋季大型双选会拟于10月17日举行，信息技术与智能制造专场拟于11月6日举行。活动和单位名单以门户中的最终通知为准。",
      destination:
        "毕业去向在统一信息门户“就业服务—毕业去向登记”中填写。签约、升学、出国和灵活就业所需证明不同，请按页面清单准备。",
    };

    function appendCareerMessage(text, user) {
      if (!log) return;
      const item = document.createElement("div");
      item.className = "jx-assistant-msg" + (user ? " jx-assistant-msg--user" : "");
      const name = document.createElement("strong");
      name.textContent = user ? "你" : "小夏";
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      item.append(name, paragraph);
      log.appendChild(item);
      log.scrollTop = log.scrollHeight;
    }

    function answerCareerQuestion(question, key) {
      appendCareerMessage(question, true);
      window.setTimeout(() => {
        appendCareerMessage(
          answers[key] ||
            "当前就业服务请求较多，服务器繁忙。小夏暂时只收录招聘信息、就业指导、三方协议、推荐表、校园招聘和毕业去向登记六类问题。",
          false,
        );
      }, 180);
    }

    careerAssistant.querySelectorAll("[data-career-question]").forEach((button) => {
      button.addEventListener("click", () =>
        answerCareerQuestion(
          button.textContent.trim(),
          button.getAttribute("data-career-question"),
        ),
      );
    });

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const question = input?.value.trim() || "";
      if (!question) return;
      const keywordMap = [
        [/招聘|岗位|职位/, "recruitment"],
        [/指导|咨询|生涯|简历/, "guidance"],
        [/三方|协议|签约/, "agreement"],
        [/推荐表|推荐/, "recommendation"],
        [/双选|宣讲|招聘会|校园招聘/, "fair"],
        [/去向|升学|毕业登记/, "destination"],
      ];
      const matched = keywordMap.find(([pattern]) => pattern.test(question));
      answerCareerQuestion(question, matched?.[1]);
      input.value = "";
    });
  }
})();
