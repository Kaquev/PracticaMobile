import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaskListPage implements OnInit {
  
  tasks: { id: number, title: string, description: string }[] = [];
  showNewTaskForm = false;
  newTask = { title: '', description: '' };

  ngOnInit() {
    this.loadTasks();
  }

  openNewTaskForm() {
    this.showNewTaskForm = true;
  }

  closeNewTaskForm() {
    this.showNewTaskForm = false;
  }

  loadTasks() {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  addTask() {
    if (this.newTask.title && this.newTask.description) {
      const newTaskWithId = { ...this.newTask, id: Date.now() }; // Agregar un identificador único
      this.tasks.push(newTaskWithId);
      localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Guardar en localStorage
      this.newTask = { title: '', description: '' };
      this.closeNewTaskForm();
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTask(task: { id: number, title: string, description: string }) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  trackBy(index: number, task: any): number {
    return task.id;
  }
}