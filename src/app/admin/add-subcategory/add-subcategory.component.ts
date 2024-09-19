import { Component } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent {
  subcategory = {
    name: '',
    description: '',
    image: '',
    parentCategoryId: ''
  };

  constructor(private subcategoryService: SubcategoryService) {}

  onSubmit(): void {
    this.subcategoryService.addSubcategory(this.subcategory).subscribe(
      response => {
        console.log('Subcategory added successfully:', response);
        // Reset form or redirect as needed
      },
      error => {
        console.error('Error adding subcategory:', error);
      }
    );
  }
}
