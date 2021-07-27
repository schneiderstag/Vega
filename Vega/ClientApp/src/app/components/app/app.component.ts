import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  //Clears local storage when browser is closed
  //You can store your information in session storage which is practically the same as local storage except the data gets cleared when the tab is closed.
  //localStorage for sharing same data of a domain among tabs of same browser.
  //sessionStorage for keeping state of the same tab while reloading.
  //onbeforeunload event to perform actions on tab close.
  //onload event to perform actions on loading data of a tab.
  //@HostListener('window:unload', ['$event'])
  //async unloadHandler(event) {
  //  if (event.currentTarget.performance.navigation.type !== PerformanceNavigation.TYPE_RELOAD) {
  //    localStorage.clear();
  //  }
  //}
}
