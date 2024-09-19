import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubmodelComponent } from './add-submodel.component';

describe('AddSubmodelComponent', () => {
  let component: AddSubmodelComponent;
  let fixture: ComponentFixture<AddSubmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubmodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
