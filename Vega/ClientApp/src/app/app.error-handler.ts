import { ErrorHandler, Inject, Injector, Injectable } from "@angular/core";
import { NotificationService } from "./services/notification.service";

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {

  //constructor(@Inject(NotificationService) private notificationService: NotificationService) { }
  constructor(@Inject(Injector) private injector: Injector) { }

  private get notificationService(): NotificationService {
    return this.injector.get(NotificationService);
  }

  handleError(error: any): void {
    console.log("Error!");
    this.notificationService.showToastr('error', 'Error', 'An unexpected error happened.');
  }
}
