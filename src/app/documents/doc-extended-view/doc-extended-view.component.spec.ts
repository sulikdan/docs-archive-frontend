import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocExtendedViewComponent } from './doc-extended-view.component';

describe('DocExtendedViewComponent', () => {
  let component: DocExtendedViewComponent;
  let fixture: ComponentFixture<DocExtendedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocExtendedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocExtendedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
