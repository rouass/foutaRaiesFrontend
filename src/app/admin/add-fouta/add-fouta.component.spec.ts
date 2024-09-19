import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoutaComponent } from './add-fouta.component';

describe('AddFoutaComponent', () => {
  let component: AddFoutaComponent;
  let fixture: ComponentFixture<AddFoutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFoutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFoutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
