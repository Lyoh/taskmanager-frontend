import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

// Angular imports plugins
import { Angular2TokenService } from 'angular2-token';

// Components imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent  } from './navbar/navbar.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { TaskSearchComponent } from './navbar/task-search/task-search.component';

// Modules imports
import { AppRoutingModule } from './app.routing.module';
import { TasksModule } from './tasks/tasks.module';

// In memory web API
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTaskDataService } from './in-memory-task-data.service';

// rxjs operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

// rxjs extensions
import 'rxjs/add/Observable/of';
import 'rxjs/add/Observable/throw';

// JQuery Plugins
import * as $ from 'jquery';
import * as datetimepicker from 'eonasdan-bootstrap-datetimepicker';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SignInFormComponent,
    SignUpFormComponent,
    TaskSearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryTaskDataService),
    ReactiveFormsModule,
    TasksModule
  ],
  providers: [
    Angular2TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
