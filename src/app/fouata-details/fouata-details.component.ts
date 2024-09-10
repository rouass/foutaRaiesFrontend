// fouata-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoutaService } from '../services/fouta.service';
import { Fouta } from '../models/fouta.model';

@Component({
  selector: 'app-fouata-details',
  templateUrl: './fouata-details.component.html',
  styleUrls: ['./fouata-details.component.css']
})
export class FouataDetailsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // foutas: Fouta[] = [];
  // selectedFouta: Fouta | null = null;
  // images: string[] = [];
  // selectedIndex = 0;
  // showDescription = false;
  // showMaterials = false;
  // showShipping = false;

  // constructor(
  //   private route: ActivatedRoute,
  //   private foutaService: FoutaService
  // ) {}

  // ngOnInit(): void {
  //   // Use 'subcategoryName' as the parameter key
  //   const subcategoryName = this.route.snapshot.paramMap.get('subcategoryName');
  //   console.log('Subcategory name from route:', subcategoryName); // Debugging line

  //   if (subcategoryName) {
  //     this.fetchFoutasBySubcategory(subcategoryName);
  //   } else {
  //     console.error('No Subcategory name found in route parameters');
  //   }
  // }

  // fetchFoutasBySubcategory(subcategoryName: string): void {
  //   this.foutaService.getFoutasBySubcategoryName(subcategoryName).subscribe(
  //     (data: Fouta[]) => {
  //       this.foutas = data;
  //       if (this.foutas.length > 0) {
  //         this.selectFouta(this.foutas[0]); // Automatically select the first Fouta
  //       }
  //       console.log('Fetched Foutas:', this.foutas); // Debugging line
  //     },
  //     error => {
  //       console.error('Error fetching Foutas:', error);
  //     }
  //   );
  // }

  // selectFouta(fouta: Fouta): void {
  //   this.selectedFouta = fouta;
  //   this.images = fouta.colors.flatMap(color => color.images); // Extract images from colors
  //   this.selectedIndex = 0; // Reset the selected image index
  // }

  // selectImage(index: number): void {
  //   this.selectedIndex = index;
  // }

  // toggleDescription(): void {
  //   this.showDescription = !this.showDescription;
  // }

  // toggleMaterials(): void {
  //   this.showMaterials = !this.showMaterials;
  // }

  // toggleShipping(): void {
  //   this.showShipping = !this.showShipping;
  // }
}
