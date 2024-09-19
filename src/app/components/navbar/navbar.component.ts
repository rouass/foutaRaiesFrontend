import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
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
  isHoveringSubcategories = false; // Track if the mouse is over subcategories
  topInfoVisible = true;
  isScrolled = false; // New flag to track scroll position

  constructor(private categoryService: CategoryService, private renderer: Renderer2,
    private router: Router

  ) {}
  navigateHome() {
    this.router.navigate(['/']); // Navigate to the home page
  }

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

  hideSubcategoriesTimeout: any; // Variable to store timeout reference

  showSubcategories(categoryId: string) {
    if (this.hideSubcategoriesTimeout) {
      clearTimeout(this.hideSubcategoriesTimeout); // Clear any pending timeout when entering a new category
    }
    this.activeCategory = categoryId;
  }
  hideSubcategories() {
    // Add a delay before hiding the subcategories
    this.hideSubcategoriesTimeout = setTimeout(() => {
      this.activeCategory = null;
    }, 100); // 200ms delay before hiding
  }

  onSubcategoryMouseEnter() {
    this.isHoveringSubcategories = true; // Set flag when hovering subcategories
  }

  onSubcategoryMouseLeave() {
    this.isHoveringSubcategories = false; // Reset flag when mouse leaves subcategories
    this.activeCategory = null; // Hide subcategories when mouse leaves
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Hide top-info and adjust navbar position when scrolling down
    if (scrollPosition > 50) {
      this.topInfoVisible = false; // Hide the top-info
      this.isScrolled = true;      // Apply the scrolled class to the navbar
    } else {
      this.topInfoVisible = true;  // Show the top-info
      this.isScrolled = false;     // Remove the scrolled class from the navbar
    }
  }

  navigateToCategory(categoryName: string) {
    // Navigate to the category-details page
    this.router.navigate(['/category-details', categoryName]);
  }

  navigateToSubcategory(categoryName: string, subcategoryName: string) {
    // Navigate to the products page for the specific category and subcategory
    this.router.navigate(['/products', categoryName, subcategoryName]);
  }
}
