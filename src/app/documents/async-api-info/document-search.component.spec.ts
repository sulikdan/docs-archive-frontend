import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncApiInfoComponent } from './async-api-info.component';

describe('AsyncApiInfoComponent', () => {
  let component: AsyncApiInfoComponent;
  let fixture: ComponentFixture<AsyncApiInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsyncApiInfoComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncApiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
