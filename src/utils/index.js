const filterType = ["audio", "video", "image"];
const fontExt = ["ttc", "ttf", "fon"];

// 生成uuid
export function uuid() {
  return (
    +new Date() +
    Math.random() * 10 +
    Math.random() * 10 +
    Math.random() * 10 +
    Math.random() * 10 +
    "a"
  );
}

// 清除空格
export function clearEmpty(val) {
  val = val.replace(" ", "");
  if (val.indexOf(" ") !== -1) {
    return clearEmpty(val);
  } else {
    return val;
  }
}

// 检验文件格式
export function checkMediaFile(file) {
  let status = false;
  filterType.forEach((type) => {
    if (file.type.toLowerCase().indexOf(type) !== -1) {
      status = true;
    }
  });
  return status;
}
export function checkFontFile(file) {
  if (file.type) {
    return false;
  }
  let status = false;
  let nameSplit = file.name.split(".");
  let fileExt = nameSplit[nameSplit.length - 1].toLowerCase();
  fontExt.forEach((type) => {
    if (fileExt.indexOf(type) !== -1) {
      status = true;
    }
  });
  return status;
}

// 随机颜色
export function randColor() {
  const r = parseInt(Math.random() * 255);
  const g = parseInt(Math.random() * 255);
  const b = parseInt(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}
