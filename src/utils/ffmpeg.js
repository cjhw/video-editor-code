import { clearEmpty } from "@/utils/index.js";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import dayjs from "dayjs";

export default class Ffmpeg {
  static ffmpeg = "";
  // 进度输出
  static progress = {
    // radio 在 0 - 1之间
    ratio: 0,
    time: 0,
  };
  // 日志输出
  static message = [];
  // 资源目录
  static resourceDir = "resource";
  // 缓存目录
  static tmpDir = "mediaTmp";
  // 序列帧目录
  static frameDir = "frame";
  // 渲染完的文件名
  static renderFileName = "render.mp4";
  static async instance() {
    this.ffmpeg = createFFmpeg({
      log: true,
    });
    await this.ffmpeg.load();
    this.ffmpeg.FS("mkdir", this.resourceDir);
    this.ffmpeg.FS("mkdir", this.tmpDir);
    // 设置日志
    this.ffmpeg.setLogger(({ type, message }) => {
      // console.log('日志',type, message);
      // info: internal workflow debug messages
      // fferr: ffmpeg native stderr output
      // ffout: ffmpeg native stdout output

      if (type === "fferr") {
        this.message.push(clearEmpty(message));
      }
    });
    // 设置进度
    this.ffmpeg.setProgress((progress) => {
      this.progress.ratio = progress.ratio * 100;
      this.progress.time = progress.time;
      console.log("进度", progress);
      console.log("进度", this.progress);
      this.updateProgress(this.progress);
    });
  }
  static updateProgress(progress) {
    console.log("进度更新了", progress);
  }
  static clearMessage() {
    this.message = [];
  }
  static loadFile(file) {
    // console.log('加载的文件',file)
    return new Promise(async (resolve) => {
      const filePath = "/" + this.resourceDir + "/" + file.getFSName();
      file.setResourcePath(filePath);
      const fileData = await fetchFile(file.getFile());
      console.log("fileData", fileData);
      this.ffmpeg.FS("writeFile", filePath, fileData);
      if (file.mime) {
        let url = URL.createObjectURL(
          new Blob([fileData.buffer], { type: file.mime })
        );
        file.setUrl(url);
        if (file.isImage()) {
          file.setCover(url);
        }
      }
      if (file.isVideo()) {
        this.readCover(filePath).then(async (url) => {
          file.setCover(url);
          // console.log('file',file)
          console.log("全部日志", this.message);
          file.setInfo(this.fileInfoFilter(this.message));
          this.clearMessage();
          // const track = await this.generateFrame(filePath);
          // file.setTrack(track);
          resolve();
        });
      } else if (file.isAudio()) {
        this.readInfo(filePath).then(() => {
          console.log("全部日志", this.message);
          file.setInfo(this.fileInfoFilter(this.message));
          this.clearMessage();
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  static readFile(filePath) {
    return new Promise(async (resolve) => {
      const data = this.ffmpeg.FS("readFile", filePath);
      let url = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );
      resolve(url);
    });
  }

  static readFileAsBuffer(filePath) {
    return new Promise(async (resolve) => {
      const data = this.ffmpeg.FS("readFile", filePath);
      resolve(data);
    });
  }

  static async generateFrame(filePath, frameDir) {
    console.log("生成序列帧");
    const track = [];
    this.ffmpeg.FS("mkdir", frameDir);
    let cmd = `-i ${filePath} -r 1 -q:v 2 -f image2 /${frameDir}/%3d.jpeg`;
    let args = cmd.split(" ");
    console.log("args", args);
    await this.ffmpeg.run(...args);
    const fileList = this.ffmpeg.FS("readdir", "/" + frameDir);
    console.log("文件列表", fileList);
    fileList.forEach((v) => {
      if (v !== "." && v !== "..") {
        const path = frameDir + "/" + v;
        const img = this.ffmpeg.FS("readFile", path);
        let imgData = URL.createObjectURL(
          new Blob([img.buffer], { type: "image/jpeg" })
        );
        track.push(imgData);
        console.log("序列帧", imgData);
      }
    });
    return track;
  }

  static async readCover(path) {
    return new Promise(async (resolve, reject) => {
      const fileName = dayjs().valueOf() + ".jpg";
      const tmpPath = "/" + this.tmpDir + "/" + fileName;
      let cmd = "-i " + path + " -ss 1 -f image2 " + tmpPath;
      let args = cmd.split(" ");
      console.log("args", args);
      this.ffmpeg.run(...args).then(() => {
        // console.log(this.readDir(this.tmpDir))
        const data = this.ffmpeg.FS("readFile", tmpPath);
        // console.log("文件数据",data)
        const fileUrl = URL.createObjectURL(
          new Blob([data.buffer], { type: "image/jpeg" })
        );
        // console.log('文件url',fileUrl)
        resolve(fileUrl);
      });
    });
  }
  static async readInfo(path) {
    return new Promise(async (resolve, reject) => {
      const fileName = dayjs().valueOf() + ".jpg";
      let cmd = "-i " + path;
      let args = cmd.split(" ");
      console.log("args", args);
      this.ffmpeg.run(...args).then(() => {
        resolve();
      });
    });
  }
  static readDir(path = "") {
    let list = this.ffmpeg.FS("readdir", "/" + path);
    console.log("list", list);
    return list;
  }
  static messageGetDataCutLastR(message, key) {
    let str = message.substring(message.indexOf(key) + key.length);
    return str.replace(":", "");
  }
  static fileInfoFilter(messageList) {
    const data = {
      durationStr: "",
      duration: "",
      bitRate: "",
      majorBrand: "",
      encoder: "",
      resolution: "",
      fps: "",
      videoInfo: "",
      audioType: "",
      audioRate: "",
      audioInfo: "",
    };
    messageList.forEach((message) => {
      if (message.indexOf("Duration") !== -1) {
        let duration = message.substring(
          message.indexOf("Duration:") + "Duration:".length,
          message.indexOf("Duration:") +
            "Duration:".length +
            "00:00:20.48".length
        );
        console.log("时长", duration);
        let time = duration.split(":");
        console.log("time", time);
        data.durationStr = duration;
        data.duration =
          parseInt(time[0]) * 120 +
          parseInt(time[1]) * 60 +
          parseFloat(time[2]);
      }
      if (
        message.indexOf("Duration") !== -1 &&
        message.indexOf("bitrate") !== -1
      ) {
        let bitRate = this.messageGetDataCutLastR(message, "bitrate");
        console.log("比特率", bitRate);
        data.bitRate = bitRate;
      }
      if (message.indexOf("major_brand") !== -1) {
        let majorBrand = this.messageGetDataCutLastR(message, "major_brand");
        console.log("格式", majorBrand);
        data.majorBrand = majorBrand;
      }
      if (message.indexOf("encoder") !== -1) {
        let encoder = this.messageGetDataCutLastR(message, "encoder");
        console.log("编码器", encoder);
        data.encoder = encoder;
      }
      if (message.indexOf("Video:") !== -1) {
        let key = "Video:";
        let arr = message.substring(message.indexOf(key) + key.length);
        let arrList = arr.split(",");
        console.log("视频信息", arr);
        console.log("分辨率", arrList[2].substring(0, arrList[2].indexOf("[")));
        data.resolution = arrList[2].substring(0, arrList[2].indexOf("["));
        arrList.forEach((v) => {
          if (v.indexOf("fps") !== -1) {
            console.log("帧率", v);
            data.fps = v;
          }
        });
        data.videoInfo = arr;
      }
      if (message.indexOf("Audio:") !== -1) {
        let key = "Audio:";
        let arr = message.substring(message.indexOf(key) + key.length);
        let arrList = arr.split(",");
        console.log("音频信息", arr);
        console.log("音频格式", arrList[0]);
        console.log("音频采样率", arrList[1]);
        data.audioType = arrList[0];
        data.audioRate = arrList[1];
        data.audioInfo = arr;
      }
    });
    console.log("信息", data);
    return data;
  }
  static generateArgs(timelineList) {
    const cmd = [];
    console.log("时间轴数据", timelineList);
    console.log("文件1", this.readDir());
    console.log("文件2", this.readDir(this.resourceDir));
    let textCmdList = [];
    timelineList.sort((a, b) => {
      return b.type.indexOf("media");
    });
    timelineList.forEach((time) => {
      console.log("time", time, time.getLeftSecond());
      if (time.type === "media") {
        cmd.push("-i /" + this.resourceDir + time.getFile());
      }
      if (time.type === "text") {
        // 阶段切换
        // cmd.push('-vf drawtext=fontsize=60:fontfile=\'/' + this.resourceDir +'/' +time.getFont() + '\':text=' + time.name + ':fontcolor=green:enable=lt(mod(t\\,3)\\,1):box=1:boxcolor=yellow')
        // 显示
        cmd.push(
          "-vf drawtext=fontsize=60:fontfile='/" +
            this.resourceDir +
            "/" +
            time.getFont() +
            "':text=" +
            time.name +
            ":fontcolor=skyblue:enable='between(t," +
            time.getLeftSecond() +
            "," +
            time.duration +
            ")':box=1:boxcolor=yellow "
        );
        // 多条
        // textCmdList.push('drawtext=fontsize=60:fontfile=\'/' + this.resourceDir +'/' +time.getFont() + '\':text=' + time.name + ':fontcolor=green:enable=\'between(t,' + time.getLeftSecond() +','+(time.getLeftSecond() + 6)+')\':box=1:boxcolor=yellow')
      }
      if (time.type === "picture") {
        cmd.push(
          "-vf movie=/" +
            this.resourceDir +
            "/" +
            time.getFile() +
            "," +
            "colorkey=white:0.01:1.0[wm];[in][wm]overlay=30:10[out]"
        );
      }
    });
    // const textCmd = '-vf "' + textCmdList.join(',') + '"'
    // console.log('文字命令',textCmd)
    // cmd.push(textCmd)
    // 添加最后输出文明
    cmd.push(this.renderFileName);
    // 命令生成
    let args = cmd.join(" ");
    args = args.split(" ");
    console.log("命令", args);
    // const cmd = '-i infile -vf movie=watermark.png,colorkey=white:0.01:1.0[wm];[in][wm]overlay=30:10[out] outfile.mp4'
    // const cmd = '-re -i infile -vf drawtext=fontsize=60:fontfile=\'font\':text=\'%{localtime\\:%Y\\-%m\\-%d%H-%M-%S}\':fontcolor=green:box=1:boxcolor=yellow outfile.mp4'
    // let args = cmd.split(' ')
    // console.log('args',args)
    return args;
  }

  static async run(args) {
    console.log("运行命令", args);
    await this.ffmpeg.run(...args);
  }
}
