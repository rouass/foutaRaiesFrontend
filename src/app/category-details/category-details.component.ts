import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { SubcategoryService } from '../services/subcategory.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  categoryName = '';
  categoryDetails: any;
  subcategories: any[] = [];
  isLoading = false;
  page = 1;
  limit = 10;  // Start with a smaller batch
  totalSubcategories = 0;
  private scrollTimeout: any;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to paramMap to detect route changes
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('name') || '';

      // Reset page-related data when the category changes
      this.resetData();

      // Fetch the category details and subcategories for the new category
      this.fetchCategoryDetails(this.categoryName);
      this.getSubcategories();
    });
  }

  resetData(): void {
    this.subcategories = [];
    this.page = 1;
    this.totalSubcategories = 0;
  }

  fetchCategoryDetails(name: string): void {
    this.categoryService.getCategoryByName(name).subscribe(
      response => this.categoryDetails = response,
      error => console.error('Error fetching category details:', error)
    );
  }

  getSubcategories(): void {
    if (this.isLoading || (this.subcategories.length >= this.totalSubcategories && this.totalSubcategories !== 0)) {
      return;
    }

    this.isLoading = true;
    this.subcategoryService.getSubcategoriesByCategoryName(this.categoryName, this.page, this.limit).subscribe(
      data => {
        this.subcategories = [...this.subcategories, ...data.subcategories];
        this.totalSubcategories = data.total;
        this.isLoading = false;

        if (this.subcategories.length < this.totalSubcategories) {
          this.page++;
        }
      },
      error => {
        console.error('Error fetching subcategories:', error);
        this.isLoading = false;
      }
    );
  }

  onSubcategoryClick(subcategoryName: string): void {
    this.router.navigate(['/products', this.categoryName, subcategoryName]);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      const nearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;

      if (nearBottom) {
        this.getSubcategories();
      }
    }, 300);  // Slightly increased debounce
  }

  trackBySubcategory(index: number, subcategory: any): string {
    return subcategory._id;
  }
}
