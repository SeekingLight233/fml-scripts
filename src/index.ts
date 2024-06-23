// @ts-nocheck
import { findAllDeepestElementsWithText } from "./tools";

document.addEventListener('DOMContentLoaded', () => {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        updateSelectElement();
        fixNumber();
        if (location.href.includes("/events/")) changeDomText("Get Tickets Facebook", "Purchase Tickets");
        setupChangeDate()
      }
    }
  });

  if (targetNode) {
    observer.observe(targetNode, config);
  } else {
    // console.error('Target node not found');
  }
});

function updateSelectElement() {
  if (!location.href.includes("listing-author/?dashboard=events")) return
  const selectElement = document.querySelector('#lp-events-form > div:nth-child(6) > div > div.row > div.col-md-4 > select') as HTMLSelectElement;

  if (selectElement) {
    const firstOption = selectElement.options[0];
    if (firstOption) {
      firstOption.textContent = 'Ticket Purchase Link';
    }

    selectElement.style.width = '210px';
    selectElement.style.pointerEvents = 'none';

    const parentElement = selectElement.parentElement;
    if (parentElement) {
      parentElement.className = 'col-md-5';
      const siblingElement = parentElement.nextElementSibling;
      if (siblingElement) {
        siblingElement.className = 'col-md-6';
      } else {
        console.error('Previous sibling element not found.');
      }
    }
  } else {
    // console.error('The select element with the specified class names was not found.');
  }
}

function fixNumber() {
  if (!location.href.includes("listing-author/?dashboard=listings")) return
  const firstSpan = document.querySelector("#select-plan-form > div:nth-child(1) > div.per_user_per_listing_price.per_user_per_listing_price-hv2 > span");
  const firstNum = firstSpan?.textContent;
  // $100.004
  if (firstNum) {
    const parsedFirstNum = parseFloat(firstNum.replace('$', ''));
    firstSpan.textContent = `$${parsedFirstNum.toFixed(2)}`;
  }

  const secondSpan = document.querySelector("#select-plan-form > div:nth-child(2) > div.per_user_per_listing_price.per_user_per_listing_price-hv2 > span");
  const secondNum = secondSpan?.textContent;
  // $199.9965
  if (secondNum) {
    const parsedSecondNum = parseFloat(secondNum.replace('$', ''));
    secondSpan.textContent = `$${parsedSecondNum.toFixed(2)}`;
  }
}

function changeDomText(oriStr: string, newStr: string) {
  const elems = findAllDeepestElementsWithText(oriStr)
  elems.forEach(e => {
    if (e?.textContent) e.textContent = newStr;
  })
}
function setupChangeDate() {
  if (location.href.includes("dashboard=events")) {
    const startInput = document.querySelector("#event-date-s");
    const endInput = document.querySelector("#event-date-e");

    // 为开始日期添加监听事件
    startInput?.addEventListener("change", (e) => {
      console.log("change");
      
      formatAndSetDate(e.target);
    });

    // 为结束日期添加监听事件
    endInput?.addEventListener('change', (e) => {
      formatAndSetDate(e.target);
    });
  }
}

// 用于格式化并设置日期的辅助函数
function formatAndSetDate(inputElement) {
  if (inputElement.value) {
    const [month, day, year] = inputElement.value.split('/');
    if (day && month && year) { // 确保日期分割后三部分都存在
      inputElement.value = `${day}/${month}/${year}`;
    }
  }
}
