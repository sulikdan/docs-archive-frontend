import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentExtendedViewComponent } from './document-extended-view.component';

describe('DocExtendedViewComponent', () => {
  let component: DocumentExtendedViewComponent;
  let fixture: ComponentFixture<DocumentExtendedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentExtendedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentExtendedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
