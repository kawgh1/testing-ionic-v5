import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  todos = [];
  dataForm: FormGroup;
  dark = false;

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.dataForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      priority: ['', [Validators.required, Validators.pattern("^[0-9]")]]
    });
    this.loadStorageTodos();
  }

  loadTodos() {
    this.todos = this.dataService.getTodos();    
  }

  async loadStorageTodos() {
    this.todos = await this.dataService.getStoredTodos();
  }

  async addTodo() {
    await this.dataService.addTodo(this.dataForm.value.name);
    this.dataForm.patchValue({name: ''});
    this.loadStorageTodos();
  }

  async deleteTodo(index) {
    await this.dataService.removeTodo(index);
    this.loadStorageTodos();
  }

  toggleDarkMode() {
    this.dark = !this.dark;
    document.body.classList.toggle('dark', this.dark);
  }
}
