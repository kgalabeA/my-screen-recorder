import { Component } from '@angular/core';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-screen-recorder',
  templateUrl: './screen-recorder.component.html',
  styleUrls: ['./screen-recorder.component.css']
})
export class ScreenRecorderComponent {
  isRecording = false;
  recordRTC: any;

  startRecording() {
    navigator.mediaDevices.getDisplayMedia().then((stream) => {
      this.recordRTC = new RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        timeSlice: 1000, // Record in 1-second chunks
      });
      this.recordRTC.startRecording();
      this.isRecording = true;
    });
  }

  stopRecording() {
    this.recordRTC.stopRecording(() => {
      const blob = this.recordRTC.getBlob();
      this.saveRecording(blob);
      this.isRecording = false;
    });
  }

  saveRecording(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'screen-recording.gif';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
