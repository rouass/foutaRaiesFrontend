// footer.component.ts
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categories: any[] = []; // Holds the fetched categories

  isDropdownOpen: string | null = null; // For managing dropdown visibility

  constructor(private categoryService: CategoryService) {}

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

  // Toggles dropdown visibility for mobile view
  toggleDropdown(section: string): void {
    this.isDropdownOpen = this.isDropdownOpen === section ? null : section;
  }
}
