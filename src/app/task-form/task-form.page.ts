import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TaskFormPage implements OnInit {
  tasks: { id: number, title: string, description: string }[] = [];
  newTask = {
    title: '',
    description: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  addTask() {
    if (this.newTask.title && this.newTask.description) {
      const newTask = { ...this.newTask, id: this.tasks.length + 1 };
      this.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.newTask = { title: '', description: '' };
    }
  }

  addAnotherTask() {
    this.addTask();
  }


  trackBy(index: number, task: any): number {
    return task.id;
  }
}