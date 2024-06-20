(function () {
  'use strict';

  function findAllDeepestElementsWithText(text) {
      var allElements = document.querySelectorAll('body *');
      var deepestElements = [];
      // 递归函数，用于找到所有最深元素
      function findDeepest(element) {
          // 假设当前元素是最深的
          var isDeepest = true;
          // 遍历子元素查看是否有也包含该文本的子元素
          element.childNodes.forEach(function (child) {
              if (child.nodeType === Node.ELEMENT_NODE) {
                  // 如果子元素也包含该文本，那当前元素就不是最深的
                  if (findDeepest(child)) {
                      isDeepest = false;
                  }
              }
          });
          // 如果当前元素包含文本，且没有更深层的子元素包含文本，记录当前元素
          if (element.textContent && element.textContent.includes(text) && isDeepest) {
              deepestElements.push(element);
          }
          // 返回当前元素是否包含文本，供父级判断使用
          return element.textContent && element.textContent.includes(text);
      }
      // 对所有元素执行深度优先搜索
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
                  changeDomText("Get Tickets Facebook", "Purchase Tickets");
              }
          }
      });
      if (targetNode) {
          observer.observe(targetNode, config);
      }
      else {
          console.error('Target node not found');
      }
  });
  function updateSelectElement() {
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
      else {
          console.error('The select element with the specified class names was not found.');
      }
  }
  function fixNumber() {
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

})();
