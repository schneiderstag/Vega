import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  uploadProgress: Subject<any> = new Subject();
  downloadProgress: Subject<any> = new Subject();

  constructor() { }

}

@Injectable({
  providedIn: 'root'
})
export class BrowserXhrWithProgress {

  constructor(private progressService: ProgressService) { }

  build(): XMLHttpRequest {
    var xhr = new XMLHttpRequest();

    xhr.onprogress = (event) => {
      this.progressService.downloadProgress.next(this.createProgress(event));
    };

    xhr.upload.onprogress = (event) => {
      this.progressService.uploadProgress.next(this.createProgress(event));
    };

    return xhr;
  }

  private createProgress(event) {
    return {
      total: event.total,
      percentage: Math.round(event.loaded / event.total * 100)
    };
  }
}
