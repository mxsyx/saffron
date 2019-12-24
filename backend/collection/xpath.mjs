/**
 * XPath 解析器
 */

import jsdom from 'jsdom'

class XPath {
  constructor() {
    const window = (new jsdom.JSDOM('')).window
    this.evaluator = new window.XPathEvaluator();
    this.XPathResult = window.XPathResult;
  }

  /**
   * 从文档中选择字符串
   * @param {string} xpathStr XPath 字符串 
   * @param {object} document 文档对象
   * @returns 选取到的结果
   */
  select(xpathStr, document) {
    const expression = this.evaluator.createExpression(xpathStr);
    const result = expression.evaluate(document, this.XPathResult.STRING_TYPE);
    return result.stringValue.trim();
  }

  /**
   * 从文档中选择字符串（全部）
   * @param {string} xpathStr XPath 字符串
   * @param {object} document 文档对象
   * @returns 选取到的结果
   */
  selectAll(xpathStr, document) {
    const expression = this.evaluator.createExpression(xpathStr);
    const results = expression.evaluate(document, this.XPathResult.ANY_TYPE);
    
    // 将结果转换为数组
    let res = null;
    const array = [];
    while (res = results.iterateNext()) {
      // 压入数组的时候注意处理字符串两边空格
      array.push(res.textContent.trim());
    }
    
    return array;
  }
}

export default XPath
