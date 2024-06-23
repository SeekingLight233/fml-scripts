export function findAllDeepestElementsWithText(text: string): Element[] {
  const allElements = document.querySelectorAll('body *');
  let deepestElements: Element[] = [];

  function findDeepest(element: Element): boolean {
      let isDeepest = true;

      element.childNodes.forEach(child => {
          if (child.nodeType === Node.ELEMENT_NODE) {
              if (findDeepest(child as Element)) {
                  isDeepest = false;
              }
          }
      });

      if (element.textContent && element.textContent.includes(text) && isDeepest) {
          deepestElements.push(element);
      }

      return element.textContent && element.textContent.includes(text);
  }

  allElements.forEach(element => findDeepest(element));

  return deepestElements;
}