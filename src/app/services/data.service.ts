import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor() { }

  // Basic Testing
  getTodos(): any[] {
    return JSON.parse(localStorage.getItem('todos'));
  }

  // Async Testing
  async getStoredTodos(): Promise<any[]> {
    const data = await Storage.get({ key: 'mytodos' });
    
    if (data.value && data.value != '') {
      return JSON.parse(data.value) 
    } else {
      return [];
    }
  }

  async addTodo(todo) {
    let todos = await this.getStoredTodos();    
    todos.push(todo);
    return await Storage.set({ key: 'mytodos', value: JSON.stringify(todos) });
  }

  async removeTodo(index) {
    let todos = await this.getStoredTodos();
    todos.splice(index, 1);
    return await Storage.set({ key: 'mytodos', value: JSON.stringify(todos) });
  }
}
