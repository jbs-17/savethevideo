import { spawn } from 'node:child_process';
import EventEmitter from 'node:events';

export class Download extends EventEmitter {
  constructor({ url, formatVideo = null, formatAudio = null }) {
    super();
    this.url = url;
    this.formatVideo = formatVideo;
    this.formatAudio = formatAudio;
    this.format = this.buildFormat();
    this.status = 'idle';
    this.proc = null;
    this.stdout = '';
    this.stderr = '';
    this.start();
  }

  buildFormat() {
    if (this.formatVideo && this.formatAudio) {
      return `${this.formatVideo}+${this.formatAudio}`;
    } else if (this.formatVideo) {
      return this.formatVideo;
    } else if (this.formatAudio) {
      return this.formatAudio;
    } else {
      throw new Error('Setidaknya format video atau audio harus ada.');
    }
  }

  start() {
    this.status = 'downloading';
    const args = ['-f', this.format, this.url];
    this.proc = spawn('yt-dlp', args);

    this.proc.stdout.on('data', (data) => {
      const text = data.toString();
      this.stdout += text;
      this.emit('data', text);
    });

    this.proc.stderr.on('data', (data) => {
      const text = data.toString();
      this.stderr += text;
      this.emit('stderr', text);
    });

    this.proc.on('close', (code) => {
      this.status = code === 0 ? 'done' : 'error';
      this.emit('done', {
        code,
        stdout: this.stdout,
        stderr: this.stderr,
        format: this.format,
        url: this.url,
      });
    });

    this.proc.on('error', (err) => {
      this.status = 'error';
      err.stderr = this.stderr;
      this.emit('error', err);
    });

  }

  stop() {
    if (this.proc && this.status === 'downloading') {
      this.proc.kill('SIGINT');
      this.status = 'stopped';
      this.emit('stopped');
    }
  }

  getInfo() {
    return {
      url: this.url,
      format: this.format,
      formatVideo: this.formatVideo,
      formatAudio: this.formatAudio,
      status: this.status,
    };
  }
}



const d1 = new Download({
  url: "https://www.youtube.com/watch?v=fvhy3gzpBI8",
  formatVideo: 18
});
d1.on('data', (data)=>{
  console.log(data);
});
d1.on('done', (done)=>{
  console.log(done);
})
d1.on('error', (error)=>{
  console.log({error});
})