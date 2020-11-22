import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocConfigComponent } from './doc-config.component';

describe('DocConfigComponent', () => {
  let component: DocConfigComponent;
  let fixture: ComponentFixture<DocConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocConfigComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
