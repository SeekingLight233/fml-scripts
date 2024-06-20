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
        changeDomText("Get Tickets Facebook", "Purchase Tickets");
      }
    }
  });

  if (targetNode) {
    observer.observe(targetNode, config);
  } else {
    console.error('Target node not found');
  }
});

function updateSelectElement() {
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
    console.error('The select element with the specified class names was not found.');
  }
}

function fixNumber() {
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