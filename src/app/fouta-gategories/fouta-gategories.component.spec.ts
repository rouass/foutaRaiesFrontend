import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoutaGategoriesComponent } from './fouta-gategories.component';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('FoutaGategoriesComponent', () => {
  let component: FoutaGategoriesComponent;
  let fixture: ComponentFixture<FoutaGategoriesComponent>;
  let mockCategoryService: any;
  let mockRouter: any;

  beforeEach(() => {
    // Create mocks for services
    mockCategoryService = jasmine.createSpyObj(['getCategories']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [FoutaGategoriesComponent],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FoutaGategoriesComponent);
    component = fixture.componentInstance;
  });

  // Test to check component creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test to check if categories are fetched on init
  it('should call fetchCategories on ngOnInit', () => {
    mockCategoryService.getCategories.and.returnValue(of([]));
    fixture.detectChanges(); // Trigger ngOnInit
    expect(mockCategoryService.getCategories).toHaveBeenCalled();
  });

  // Test navigation method
  it('should navigate to category details when goToCategoryDetails is called', () => {
    const categoryName = 'testCategory';
    component.goToCategoryDetails(categoryName);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/category-details', categoryName]);
  });


});
