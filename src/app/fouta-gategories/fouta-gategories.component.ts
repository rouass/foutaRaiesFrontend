import { Component, HostListener, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fouta-gategories',
  templateUrl: './fouta-gategories.component.html',
  styleUrls: ['./fouta-gategories.component.css']
})
export class FoutaGategoriesComponent implements OnInit {
  products: any[] = [];
  responsiveOptions: any[];
  isSmallScreen: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.checkScreenSize();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 640; 
  }

  goToCategoryDetails(categoryName: string): void {
    this.router.navigate(['/category-details', categoryName]);
  }

}
