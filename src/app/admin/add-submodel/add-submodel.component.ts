import { Component } from '@angular/core';
import { SubmodelService } from 'src/app/services/submodel.service';

@Component({
  selector: 'app-add-submodel',
  templateUrl: './add-submodel.component.html',
  styleUrls: ['./add-submodel.component.css']
})
export class AddSubmodelComponent {
  submodel = {
    name: '',
    description: '',
    image: '',
    parentSubcategoryId: ''
  };

  constructor(private submodelService: SubmodelService) {}

  onSubmit(): void {
    this.submodelService.addSubmodel(this.submodel).subscribe(
      response => {
        console.log('Submodel added successfully:', response);
        // Reset form or redirect as needed
      },
      error => {
        console.error('Error adding submodel:', error);
      }
    );
  }
}
