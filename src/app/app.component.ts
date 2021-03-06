import { Angular2TokenService } from 'angular2-token';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gerenciador de Tarefas';

  constructor(private taskService: Angular2TokenService) {
    this.taskService.init({
      apiBase: 'http://api.task-manager.dev:3000',
      globalOptions: {
        headers: {
          'Content-type': 'application/json',
          'accept': 'application/vnd.taskmanager.v2'
        }
      }
    });
  }
}
