import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  categories: any[] = [];
  activeCategory: string | null = null; 

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchCategoriesWithSubcategories();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  fetchCategoriesWithSubcategories() {
    this.categoryService.getCategoriesWithSubcategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories with subcategories:', error);
      }
    );
  }

  showSubcategories(categoryId: string) {
    this.activeCategory = categoryId;
  }

  hideSubcategories() {
    this.activeCategory = null;
  }
}
