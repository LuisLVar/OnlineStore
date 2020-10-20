import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductoComponent } from './new-producto.component';

describe('NewProductoComponent', () => {
  let component: NewProductoComponent;
  let fixture: ComponentFixture<NewProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
