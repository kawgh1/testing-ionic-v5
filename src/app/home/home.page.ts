import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todos = [];

  constructor(private dataService: DataService) {}

  loadTodos() {
    this.todos = this.dataService.getTodos();    
  }
}
