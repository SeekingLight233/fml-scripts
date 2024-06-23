(function () {
  'use strict';

  function findAllDeepestElementsWithText(text) {
      var allElements = document.querySelectorAll('body *');
      var deepestElements = [];
      function findDeepest(element) {
          var isDeepest = true;
          element.childNodes.forEach(function (child) {
              if (child.nodeType === Node.ELEMENT_NODE) {
                  if (findDeepest(child)) {
                      isDeepest = false;
                  }
              }
          });
          if (element.textContent && element.textContent.includes(text) && isDeepest) {
              deepestElements.push(element);
          }
          return element.textContent && element.textContent.includes(text);
      }
      allElements.forEach(function (element) { return findDeepest(element); });
      return deepestElements;
  }

  // @ts-nocheck
  document.addEventListener('DOMContentLoaded', function () {
      var targetNode = document.body;
      var config = { childList: true, subtree: true };
      var observer = new MutationObserver(function (mutationsList, observer) {
          for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
              var mutation = mutationsList_1[_i];
              if (mutation.type === 'childList') {
                  updateSelectElement();
                  fixNumber();
                  if (location.href.includes("/events/"))
                      changeDomText("Get Tickets Facebook", "Purchase Tickets");
                  setupChangeDate();
              }
          }
      });
      if (targetNode) {
          observer.observe(targetNode, config);
      }
  });
  function updateSelectElement() {
      if (!location.href.includes("listing-author/?dashboard=events"))
          return;
      var selectElement = document.querySelector('#lp-events-form > div:nth-child(6) > div > div.row > div.col-md-4 > select');
      if (selectElement) {
          var firstOption = selectElement.options[0];
          if (firstOption) {
              firstOption.textContent = 'Ticket Purchase Link';
          }
          selectElement.style.width = '210px';
          selectElement.style.pointerEvents = 'none';
          var parentElement = selectElement.parentElement;
          if (parentElement) {
              parentElement.className = 'col-md-5';
              var siblingElement = parentElement.nextElementSibling;
              if (siblingElement) {
                  siblingElement.className = 'col-md-6';
              }
              else {
                  console.error('Previous sibling element not found.');
              }
          }
      }
  }
  function fixNumber() {
      if (!location.href.includes("listing-author/?dashboard=listings"))
          return;
      var firstSpan = document.querySelector("#select-plan-form > div:nth-child(1) > div.per_user_per_listing_price.per_user_per_listing_price-hv2 > span");
      var firstNum = firstSpan === null || firstSpan === void 0 ? void 0 : firstSpan.textContent;
      // $100.004
      if (firstNum) {
          var parsedFirstNum = parseFloat(firstNum.replace('$', ''));
          firstSpan.textContent = "$".concat(parsedFirstNum.toFixed(2));
      }
      var secondSpan = document.querySelector("#select-plan-form > div:nth-child(2) > div.per_user_per_listing_price.per_user_per_listing_price-hv2 > span");
      var secondNum = secondSpan === null || secondSpan === void 0 ? void 0 : secondSpan.textContent;
      // $199.9965
      if (secondNum) {
          var parsedSecondNum = parseFloat(secondNum.replace('$', ''));
          secondSpan.textContent = "$".concat(parsedSecondNum.toFixed(2));
      }
  }
  function changeDomText(oriStr, newStr) {
      var elems = findAllDeepestElementsWithText(oriStr);
      elems.forEach(function (e) {
          if (e === null || e === void 0 ? void 0 : e.textContent)
              e.textContent = newStr;
      });
  }
  function setupChangeDate() {
      if (location.href.includes("dashboard=events")) {
          var startInput = document.querySelector("#event-date-s");
          var endInput = document.querySelector("#event-date-e");
          // 为开始日期添加监听事件
          startInput === null || startInput === void 0 ? void 0 : startInput.addEventListener("blur", function (e) {
              formatAndSetDate(e.target);
          });
          // 为结束日期添加监听事件
          endInput === null || endInput === void 0 ? void 0 : endInput.addEventListener('blur', function (e) {
              formatAndSetDate(e.target);
          });
      }
  }
  // 用于格式化并设置日期的辅助函数
  function formatAndSetDate(inputElement) {
      if (inputElement.value) {
          console.log("formatAndSetDate", inputElement.value);
          var _a = inputElement.value.split('/'), month_1 = _a[0], day_1 = _a[1], year_1 = _a[2];
          if (day_1 && month_1 && year_1) { // 确保日期分割后三部分都存在
              setTimeout(function () {
                  inputElement.value = "".concat(day_1, "/").concat(month_1, "/").concat(year_1);
              }, 10);
          }
      }
  }

})();
