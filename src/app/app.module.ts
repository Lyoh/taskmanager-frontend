import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

// Components imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent  } from './navbar/navbar.component';
import { TaskSearchComponent } from './navbar/task-search/task-search.component';

// Modules imports
import { AppRoutingModule } from './app.routing.module';
import { TasksModule } from './tasks/tasks.module';

// In memory web API
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTaskDataService } from './in-memory-task-data.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    TaskSearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryTaskDataService),
    TasksModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
