import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { SubcategoryService } from '../services/subcategory.service';
import { CategoryDetailsComponent } from './category-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CategoryDetailsComponent', () => {
  let component: CategoryDetailsComponent;
  let fixture: ComponentFixture<CategoryDetailsComponent>;
  let categoryServiceMock: any;
  let subcategoryServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    // Create mocks for services
    categoryServiceMock = jasmine.createSpyObj('CategoryService', ['getCategoryByName']);
    subcategoryServiceMock = jasmine.createSpyObj('SubcategoryService', ['getSubcategoriesByCategoryName']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteMock = { paramMap: of({ get: (key: string) => 'test-category' }) };

    await TestBed.configureTestingModule({
      declarations: [CategoryDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: SubcategoryService, useValue: subcategoryServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch category details on init', () => {
    const mockCategoryDetails = { name: 'test-category', description: 'A test category' };
    categoryServiceMock.getCategoryByName.and.returnValue(of(mockCategoryDetails));

    component.ngOnInit();

    expect(component.categoryName).toBe('test-category');
    expect(categoryServiceMock.getCategoryByName).toHaveBeenCalledWith('test-category');
    expect(component.categoryDetails).toEqual(mockCategoryDetails);
  });

  it('should fetch subcategories on init and scroll', () => {
    const mockSubcategories = { subcategories: [{ _id: '1', name: 'subcategory1' }], total: 1 };
    subcategoryServiceMock.getSubcategoriesByCategoryName.and.returnValue(of(mockSubcategories));

    component.ngOnInit();
    component.getSubcategories();

    expect(subcategoryServiceMock.getSubcategoriesByCategoryName).toHaveBeenCalledWith('test-category', 1, 10);
    expect(component.subcategories.length).toBe(1);
    expect(component.subcategories[0].name).toBe('subcategory1');
  });

  it('should navigate to the correct subcategory when clicked', () => {
    component.categoryName = 'test-category';
    component.onSubcategoryClick('subcategory1');

    expect(routerMock.navigate).toHaveBeenCalledWith(['/products', 'test-category', 'subcategory1']);
  });

  it('should handle scroll and load more subcategories', () => {
    const mockSubcategories = { subcategories: [{ _id: '1', name: 'subcategory1' }], total: 20 };
    subcategoryServiceMock.getSubcategoriesByCategoryName.and.returnValue(of(mockSubcategories));

    component.subcategories = [];
    component.page = 1;
    component.isLoading = false;

    component.onScroll();
    expect(component.isLoading).toBeTrue();
  });

  it('should handle errors when fetching category details', () => {
    categoryServiceMock.getCategoryByName.and.returnValue(throwError('Error fetching category details'));

    component.fetchCategoryDetails('test-category');

    expect(component.categoryDetails).toBeUndefined();
    expect(categoryServiceMock.getCategoryByName).toHaveBeenCalled();
  });

  it('should handle errors when fetching subcategories', () => {
    subcategoryServiceMock.getSubcategoriesByCategoryName.and.returnValue(throwError('Error fetching subcategories'));

    component.getSubcategories();

    expect(subcategoryServiceMock.getSubcategoriesByCategoryName).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
  });
});
