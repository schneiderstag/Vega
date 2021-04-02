import { ErrorHandler, Inject, Injector, Injectable, NgZone } from "@angular/core";
import { NotificationService } from "./services/notification.service";

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {

  //constructor(@Inject(NotificationService) private notificationService: NotificationService) { }
  constructor(private ngZone: NgZone, @Inject(Injector) private injector: Injector) { }

  private get notificationService(): NotificationService {
    return this.injector.get(NotificationService);
  }

  handleError(error: Error): void {
    this.ngZone.run(() => { // Runs the toastr notification inside js zone to avoid delays when showing the messages.
      console.log("Error: " + error.name + " " + error.message + " " + error.stack);
      this.notificationService.showToastr('error', 'Error', 'An unexpected error happened:</br>' + error.name + '</br>' + error.message + '</br>' + error.stack);
    });
  }
}
