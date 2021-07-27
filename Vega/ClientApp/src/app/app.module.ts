import { AuthModule } from '@auth0/auth0-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AdminComponent } from './components/admin/admin.component';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';

import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './app.error-handler';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PaginationComponent,
    VehicleFormComponent,
    VehicleListComponent,
    ViewVehicleComponent,
    AdminComponent
  ],
  imports: [
    AuthModule.forRoot({
      domain: 'vega-cars.eu.auth0.com',
      clientId: 'JRVpuq11X6HcK77MttV6868fS0DYUTt9'
    }),
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],//["vega-cars.eu.auth0.com", "localhost:44345"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      //preventDuplicates: true,
      }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuard] },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuard] },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard] },
      { path: 'home', component: HomeComponent},
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
