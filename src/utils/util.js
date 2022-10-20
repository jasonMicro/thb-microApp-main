import enquireJs from 'enquire.js';
import { info } from 'china-region';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';

export function isDef(v) {
  return v !== undefined && v !== null;
}

/**
 * Remove an item from an array.
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

export function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

export function enquireScreen(call) {
  const handler = {
    match: function () {
      call && call(true);
    },
    unmatch: function () {
      call && call(false);
    }
  };
  enquireJs.register('only screen and (max-width: 767.99px)', handler);
}

const _toString = Object.prototype.toString;

/**
 * 菜单树结构生成
 */
export function handleTree(data, id, parentId, children) {
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };

  const childrenListMap = {};
  const nodeIds = {};
  const tree = [];

  for (const d of data) {
    const parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    const parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }

  return tree;
}

export const areaAllName = (code) => {
  if (!code) return null;
  const province = info(code).province;
  const prefecture = info(code).prefecture;
  const name = info(code).name;
  return (province + prefecture + name).replace('null', '');
};

/**
 * 手机号脱敏
 * @param {Boolean} isEnabled 是否启用脱敏，否则 返回 源数据
 */
export const phoneDesense = (str, isEnabled = true) => {
  if (isEnabled) {
    if (!str) return null;
    return str.replace(/(\d{3})\d*(\d{3})/, '$1****$2');
  } else {
    return str;
  }
};

/**
 * 身份证号脱敏
 * @param {Boolean} isEnabled 是否启用脱敏，否则 返回 源数据
 */
export const IdCardDesense = (str, isEnabled = true) => {
  if (isEnabled) {
    if (!str) return null;
    return str.replace(/^(.{6})(?:\d+)(.{3})$/, '$1****$2');
  } else {
    return str;
  }
};

/**
 * 姓名脱敏
 * @param {Boolean} isEnabled 是否启用脱敏，否则 返回 源数据
 * */
export const nameDesense = (str, isEnabled = true) => {
  if (isEnabled) {
    if (!str) return null;
    if (str.length === 2) {
      return str.replace(/^(.).+$/, '$1*');
    } else if (str.length === 3) {
      return str.replace(/^(.).+(.)$/, '$1*$2');
    } else if (str.length > 3) {
      return str.replace(/^(.{2}).+(.)/, '$1**$2');
    }
  } else {
    return str;
  }

  // return str.replace(/^(.)(.*)$/, '$1**');
};

/**
 * 手机号码校验
 */
export const checkMobile = (str) => {
  const re = /^1\d{10}$/;
  return re.test(str);
};

/**
 * 身份证校验
 */
export const checkIdCard = (val) => {
  const re =
    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
  return re.test(val);
};

export const cloneData = (source) => {
  if (!source) return source;
  const isArray = source instanceof Array;
  const data = isArray ? [] : {};
  for (const key in source) {
    let item = null;
    if (typeof source[key] == 'object') {
      item = cloneData(source[key]);
    } else {
      item = source[key];
    }
    if (isArray) {
      data.push(item);
    } else {
      data[key] = item;
    }
  }
  return data;
};

export const checkIsHaveData = (val, name, arr) => {
  return arr.find((item) => {
    return item[name] === val;
  })
    ? val
    : null;
};

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const xlsxExport = (id, fileName) => {
  const xlsxParam = { raw: true };
  /** 从表生成工作簿对象 */
  const wb = XLSX.utils.table_to_book(document.querySelector(id), xlsxParam);
  /** 获取二进制字符串作为输出 */
  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  });
  try {
    FileSaver.saveAs(
      //Blob 对象表示一个不可变、原始数据的类文件对象。
      //Blob 表示的不一定是JavaScript原生格式的数据。
      //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
      //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
      new Blob([wbout], { type: 'application/octet-stream' }),
      //设置导出文件名称
      `${fileName}-${new Date().getTime()}.xlsx`
    );
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout);
  }
  return wbout;
};
