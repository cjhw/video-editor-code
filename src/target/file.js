import dayjs from "dayjs";
export default class ResourceFile {
  constructor(file) {
    this.file = file;
    this.key = dayjs().unix() + "_" + file.name;
    this.name = file.name;
    this.size = file.size;
    this.sizeStr = file.size;
    this.type = file.type;
    this.lastModified = file.lastModified;
    this.lastModifiedDate = file.lastModifiedDate;
    this.lastModifiedDateStr = file.lastModifiedDate;
    this.webkitRelativePath = file.webkitRelativePath;
    // 外加
    // 扩展名
    this.ext = "";
    // this.baseName = dayjs().format('YYYYMMDDHHmmss') + '_' + file.name
    this.baseName = this.key;
    this.fileType = "";
    this.mime = "";
    this.cover = "";
    this.url = "";
    this.durationStr = "";
    this.duration = "";
    this.bitRate = "";
    this.majorBrand = "";
    this.encoder = "";
    this.resolution = "";
    this.fps = "";
    this.videoInfo = "";
    this.audioType = "";
    this.audioRate = "";
    this.audioInfo = "";
    this.setDate();
  }

  setUrl(url) {
    this.url = url;
  }
  setCover(url) {
    this.cover = url;
  }
  isVideo() {
    return this.mime.indexOf("video") !== -1;
  }
  isAudio() {
    return this.mime.indexOf("audio") !== -1;
  }
  setMedia() {
    this.fileType = "media";
    this.mime = this.file.type.split(",")[0];
    this.ext = this.name.split(".")[this.name.split(".").length - 1];
  }
  setFont() {
    this.fileType = "font";
    this.mime = "font";
    this.ext = this.name.split(".")[this.name.split(".").length - 1];
  }
  getFile() {
    return this.file;
  }
  getFSName() {
    return this.baseName;
  }
  setDate() {
    this.lastModifiedDateStr = dayjs(this.lastModifiedDate).format(
      "YYYY-MM-DD HH:mm:ss"
    );
  }
  setInfo(info) {
    this.durationStr = info.durationStr;
    this.duration = info.duration;
    this.bitRate = info.bitRate;
    this.majorBrand = info.majorBrand;
    this.encoder = info.encoder;
    this.resolution = info.resolution;
    this.fps = info.fps;
    this.videoInfo = info.videoInfo;
    this.audioType = info.audioType;
    this.audioRate = info.audioRate;
    this.audioInfo = info.audioInfo;
  }
  setSize(type = "") {
    let str = "";
    console.log("size", type, this.size, this.size / 1024);
    switch (type) {
      case "AUTO":
        let G = this.size / 1024 / 1024 / 1024;
        let M = this.size / 1024 / 1024;
        let K = this.size / 1024;
        console.log(G, M, K);
        if (G > 1) {
          str = G.toFixed(2) + "GB";
        } else if (M > 1) {
          str = M.toFixed(2) + "MB";
        } else if (K > 1) {
          str = K.toFixed(2) + "KB";
        } else {
          str = this.size + "B";
        }
        break;
      case "B":
        str = this.size + "B";
        break;
      case "KB":
        str = (this.size / 1024).toFixed(2) + "KB";
        break;
      case "MB":
        str = (this.size / 1024 / 1024).toFixed(2) + "MB";
        break;
      case "GB":
        str = (this.size / 1024 / 1024 / 1024).toFixed(2) + "GB";
        break;
      default:
        str = this.size + "B";
    }
    this.sizeStr = str;
  }

  toString() {
    let str = "";
    str += "文件名:" + this.name + "\r\n";
    str += "时长:" + this.durationStr + "\r\n";
    str += "时长:" + this.duration + "\r\n";
    str += "比特率:" + this.bitRate + "\r\n";
    str += "格式:" + this.majorBrand + "\r\n";
    str += "编码器:" + this.encoder + "\r\n";
    str += "分辨率:" + this.resolution + "\r\n";
    str += "帧率:" + this.fps + "\r\n";
    str += "视频信息:" + this.videoInfo + "\r\n";
    str += "音频类型:" + this.audioType + "\r\n";
    str += "采样率:" + this.audioRate + "\r\n";
    str += "音频信息:" + this.audioInfo + "\r\n";
    str += "文件唯一标识:" + this.key + "\r\n";
    str += "文件大小:" + this.size + "\r\n";
    str += "文件大小:" + this.sizeStr + "\r\n";
    str += "文件类型:" + this.type + "\r\n";
    str += "最后修改:" + this.lastModified + "\r\n";
    str += "最后修改时间:" + this.lastModifiedDate + "\r\n";
    str += "最后修改时间:" + this.lastModifiedDateStr + "\r\n";
    str += "webkit路径:" + this.webkitRelativePath + "\r\n";
    // 外加
    str += "基本名:" + this.baseName + "\r\n";
    str += "文件类型:" + this.fileType + "\r\n";
    str += "mime信息:" + this.mime + "\r\n";
    str += "扩展名:" + this.ext + "\r\n";
    str += "封面:" + this.cover + "\r\n";
    return str;
  }
}
