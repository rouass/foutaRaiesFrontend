import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoutaService } from 'src/app/services/fouta.service';

@Component({
  selector: 'app-add-fouta',
  templateUrl: './add-fouta.component.html',
  styleUrls: ['./add-fouta.component.css']
})
export class AddFoutaComponent {
  fouta = {
    name: '',
    description: '',
    title: '',
    ref: '',
    dimensions: '' as string | string[], // Explicitly declare as string or string[]
    images: '' as string | string[], // Explicitly declare as string or string[]
    subcategoryId: ''
  };

  constructor(private foutaService: FoutaService, private router: Router) {}

  onSubmit(): void {
    // Convert comma-separated strings to arrays if input is in string format
    if (typeof this.fouta.dimensions === 'string') {
      this.fouta.dimensions = this.fouta.dimensions.trim() ? this.fouta.dimensions.split(',').map((d: string) => d.trim()) : [];
    }

    if (typeof this.fouta.images === 'string') {
      this.fouta.images = this.fouta.images.trim() ? this.fouta.images.split(',').map((i: string) => i.trim()) : [];
    }

    // Send the fouta object to the service
    this.foutaService.addFouta(this.fouta).subscribe(
      response => {
        console.log('Fouta added successfully:', response);
        this.router.navigate(['/foutas']); // Redirect to another page if needed
      },
      error => {
        console.error('Error adding fouta:', error);
      }
    );
  }
}
