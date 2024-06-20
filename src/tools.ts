export function findAllDeepestElementsWithText(text: string): Element[] {
  const allElements = document.querySelectorAll('body *');
  let deepestElements: Element[] = [];

  // 递归函数，用于找到所有最深元素
  function findDeepest(element: Element): boolean {
      // 假设当前元素是最深的
      let isDeepest = true;

      // 遍历子元素查看是否有也包含该文本的子元素
      element.childNodes.forEach(child => {
          if (child.nodeType === Node.ELEMENT_NODE) {
              // 如果子元素也包含该文本，那当前元素就不是最深的
              if (findDeepest(child as Element)) {
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
  allElements.forEach(element => findDeepest(element));

  return deepestElements;
}