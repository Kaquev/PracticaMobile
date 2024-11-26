import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListPage } from './productos.page';

describe('TaskListPage', () => {
  let component: TaskListPage;
  let fixture: ComponentFixture<TaskListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
