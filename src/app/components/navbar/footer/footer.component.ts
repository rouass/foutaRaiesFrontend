import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categories: any[] = []; // Holds the fetched categories

  isDropdownOpen: string | null = null; // For managing dropdown visibility

  constructor(private categoryService: CategoryService, private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.fetchCategories();
  }

  // Fetch categories from the API
  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data; // Assuming the API returns an array of categories
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  // Navigate to the category details page
  navigateToCategory(name: string): void {
    this.router.navigate(['/category-details', name]);
  }

  // Toggles dropdown visibility for mobile view
  toggleDropdown(section: string): void {
    this.isDropdownOpen = this.isDropdownOpen === section ? null : section;
  }

  navigateHome() {
    this.router.navigate(['/']); // Navigate to the home page
  }
  openEmail(): void {
    window.location.href = 'mailto:fouta.raies@gmail.com';
  }

  openMap(): void {
    window.open('https://maps.google.com/?q=Frères+RAIES+Fouta', '_blank');
  }
  callPhone(): void {
    window.location.href = 'tel:+21699521058';
  }
}
