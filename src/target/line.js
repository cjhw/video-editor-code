import { randColor } from "@/utils/index.js";
import { uuid } from "@/utils/index.js";
/**
 * 时间揍单个数据
 */
export default class Line {
  leftTime = 160;
  constructor(file) {
    // 时间轴唯一
    this.key = uuid();
    this.name = file.name;
    this.type = "";
    this.duration = file.duration;
    this.left = 0;
    this.width = file.duration * this.leftTime;
    this.color = randColor();
    // 原始资源文件名
    this.fileKey = file.key;
    // 额外属性
    this.font = "";
    this.fontColor = "";
    this.fontSize = "";
    this.fontX = "";
    this.fontY = "";
    this.picX = "";
    this.picY = "";
    this.isMarquee = false;
  }

  setMedia() {
    this.type = "media";
  }
  setText() {
    this.type = "text";
  }
  setPicture(picX = "0", picY = "0", isMarquee = false) {
    this.type = "picture";
    this.width = 100;
    this.picX = picX;
    this.picY = picY;
    this.isMarquee = isMarquee;
  }
  setFont(
    path,
    fontSize = "20",
    fontColor = "black",
    fontX = "0",
    fontY = "0"
  ) {
    this.font = path;
    this.fontSize = fontSize;
    this.fontColor = fontColor;
    this.fontX = fontX;
    this.fontY = fontY;
  }
  getFont() {
    return this.font;
  }
  getLeftSecond() {
    return parseInt(this.left / this.leftTime);
  }
  getFile() {
    return "/" + this.fileKey;
  }
}
