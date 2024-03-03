import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWalrusComponent } from './project-walrus.component';

describe('ProjectWalrusComponent', () => {
  let component: ProjectWalrusComponent;
  let fixture: ComponentFixture<ProjectWalrusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectWalrusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectWalrusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
