import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInicioComponent } from './edit-inicio.component';

describe('EditInicioComponent', () => {
  let component: EditInicioComponent;
  let fixture: ComponentFixture<EditInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
