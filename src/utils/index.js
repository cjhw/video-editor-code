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
