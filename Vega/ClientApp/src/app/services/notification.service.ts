import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: ToastrService) { }

  showToastr(type, title, message, duration = 5000) {
    if(type === 'success')
      this.toastrService.success(title, message, { timeOut: duration, enableHtml: true, closeButton: true, positionClass: 'toast-bottom-right' });

    if(type === 'info')
      this.toastrService.info(title, message, { timeOut: duration, enableHtml: true, closeButton: true, positionClass: 'toast-bottom-right' });

    if(type === 'warning')
      this.toastrService.warning(title, message, { timeOut: duration, enableHtml: true, closeButton: true, positionClass: 'toast-bottom-right' });

    if(type === 'error')
      this.toastrService.error(title, message, { timeOut: duration, enableHtml: true, closeButton: true, positionClass: 'toast-bottom-right' });
  }
}
