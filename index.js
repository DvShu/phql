const QL_REGEXP = /^\{(.+)\}$/;
const KEY_REGEXP = /^\w+$/;
const OBJ_REGEXP = /(\w+)\{(\w+)(\}+)/;
const OBJ_START_REGEXP = /^(\w+)\{(\w+)$/;
const OBJ_END_REGEXP = /^(\w+)(\}+)$/;

/**
 * 转换查询语言为 JSON 对象, { a: 1 }
 * @param ql    查询语言内容
 * @return {*}
 */
function qlToJSON (ql) {
  let ctxs = [{}], ctxsL = 0;
  ql = ql.split(',');
  for (let q of ql) {
    if (KEY_REGEXP.test(q)) { // key
      ctxs[ctxsL][q] = 1;
      continue;
    }
    let m = q.match(OBJ_REGEXP); // test{id}
    if (m) {
      let s = {};
      s[m[2]] = 1;
      ctxs[ctxsL][m[1]] = s;
      for (let l = 0; l < m[3].length - 1; l++) {
        s = ctxs.pop();
        ctxsL--;
        let key = s['BIND_KEY'];
        delete s['BIND_KEY'];
        ctxs[ctxsL][key] = s;
      }
      continue;
    }
    m = q.match(OBJ_START_REGEXP); // a{b
    if (m) {
      let s = {};
      s[m[2]] = 1;
      s['BIND_KEY'] = m[1];
      ctxs.push(s);
      ctxsL++;
      continue;
    }
    m = q.match(OBJ_END_REGEXP); // c}
    if (m) {
      for (let l = 0; l < m[2].length; l++) {
        let s = ctxs.pop();
        ctxsL--;
        s[m[1]] = 1;
        let ctx = ctxs[ctxsL], key = s['BIND_KEY'];
        delete s['BIND_KEY'];
        ctx[key] = s;
      }
    }
  }
  return ctxs.pop();
}

/**
 * 解析查询语言, 并返回为 mongodb 筛选需要的 JSON 格式
 * @param ql    查询语言, {a,b,c}
 * @return {*}
 */
function parseQl (ql) {
  ql = ql.replace(/\s+/g, '');
  let m = ql.match(QL_REGEXP);
  if (m) {
    return qlToJSON(m[1]);
  } else {
    return '';
  }
}

module.exports = parseQl;
