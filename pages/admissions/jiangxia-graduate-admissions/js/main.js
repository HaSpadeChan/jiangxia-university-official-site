(function () {
  "use strict";

  var oldSystemMessage = "系统过于老旧，不支持该功能";

  document.querySelectorAll("[data-old-system]").forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      window.alert(oldSystemMessage);
    });
  });

  var searchForm = document.getElementById("site-search");
  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      window.alert(oldSystemMessage);
    });
  }
})();
