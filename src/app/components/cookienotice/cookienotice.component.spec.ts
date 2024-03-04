import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookienoticeComponent } from './cookienotice.component';

describe('CookienoticeComponent', () => {
  let component: CookienoticeComponent;
  let fixture: ComponentFixture<CookienoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookienoticeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CookienoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
