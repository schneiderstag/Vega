import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private uploadProgress: Subject<any>;

  startTracking() {
    this.uploadProgress = new Subject();
    return this.uploadProgress;
  }

  notify(progress) {
    if (this.uploadProgress)
      this.uploadProgress.next(progress);
  }

  endTracking() {
    if (this.uploadProgress)
      this.uploadProgress.complete();
  }
}

@Injectable({
  providedIn: 'root'
})
export class BrowserXhrWithProgress {

  constructor(private progressService: ProgressService) { this.build(); }

  build(): XMLHttpRequest {
    var xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      this.progressService.notify(this.createProgress(event));
    };

    xhr.upload.onloadend = () => {
      this.progressService.endTracking(); // Unsubscribe from upload progress to avoid memory leaks
    }

    return xhr;
  }

  private createProgress(event) {
    return {
      total: event.total,
      percentage: Math.round(event.loaded / event.total * 100)
    };
  }
}
