import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { SubcategoryService } from '../services/subcategory.service';
import { SubmodelService } from '../services/submodel.service';
import { FoutaService } from '../services/fouta.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  categoryName: string = '';
  categoryDetails: any;
  subcategories: any[] = [];
  page = 1;
  limit = 50;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private submodelService: SubmodelService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('name')!;
      this.fetchCategoryDetails(this.categoryName);
      this.getSubcategories();
    });
  }

  fetchCategoryDetails(name: string): void {
    this.categoryService.getCategoryByName(name).subscribe(
      response => {
        console.log(response);
        this.categoryDetails = response;
      },
      error => {
        console.error('Error fetching category details:', error);
      }
    );
  }

  getSubcategories(): void {
    this.subcategoryService.getSubcategoriesByCategoryName(this.categoryName)
      .subscribe(
        (data) => {
          this.subcategories = data;
        },
        (error) => {
          console.error('Error fetching subcategories:', error);
        }
      );
  }

  onSubcategoryClick(subcategoryName: string): void {
    this.submodelService.getSubmodelsBySubcategoryName(subcategoryName)
      .subscribe(
        (submodels) => {
          if (submodels.length > 0) {
            this.router.navigate(['/submodels', subcategoryName]);
          } else {
            this.router.navigate(['/fouta', subcategoryName]);
          }
        },
        (error) => {
          console.error('Error fetching sub-models:', error);
          this.router.navigate(['/fouta', subcategoryName]);
        }
      );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.getSubcategories();
    }
  }
}
