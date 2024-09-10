// submodel-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoutaService } from '../services/fouta.service';
import { SubmodelService } from '../services/submodel.service';
import { Fouta } from '../models/fouta.model';
import { SubModel } from '../models/submodel.model';

@Component({
  selector: 'app-submodel-list',
  templateUrl: './submodel-list.component.html',
  styleUrls: ['./submodel-list.component.css']
})
export class SubmodelListComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

//   similarProducts: Fouta[] = [];
// submodels: SubModel[] = [];
//   foutas: Fouta[] = []; // List of foutas related to the subcategory
//   uniqueFoutas: Fouta[] = []; // Unique foutas for tabs
//   selectedFouta: Fouta | null = null;
//   selectedFoutaImages: string[] = [];
//   isLoading = true;
//   selectedIndex = 0;
//   showDescription = false;
//   showMaterials = false;
//   showShipping = false;

//   constructor(
//     private foutaService: FoutaService,
//     private subModelService: SubmodelService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const subcategoryName = this.route.snapshot.paramMap.get('subcategoryName');
//     if (subcategoryName) {
//       this.fetchSubmodelsAndFoutas(subcategoryName);
//     }
//   }

//   fetchSubmodelsAndFoutas(subcategoryName: string): void {
//     // Fetch Foutas and filter out duplicates
//     this.foutaService.getFoutasBySubcategoryName(subcategoryName).subscribe(
//       (foutas: Fouta[]) => {
//         console.log('Fetched Foutas:', foutas); // Debug line
//         this.foutas = foutas;
//         this.uniqueFoutas = this.getUniqueFoutas(this.foutas);
//         console.log('Unique Foutas:', this.uniqueFoutas); // Debug line
//         if (this.uniqueFoutas.length > 0) {
//           this.selectFouta(this.uniqueFoutas[0]); // Select the first unique Fouta by default
//         }
//         this.isLoading = false;
//       },
//       error => {
//         this.isLoading = false;
//         console.error('Error fetching foutas:', error);
//       }
//     );

//   }

//   // Function to remove duplicates based on the name of Foutas
//   getUniqueFoutas(foutas: Fouta[]): Fouta[] {
//     const unique = foutas.reduce((acc, current) => {
//       const x = acc.find(item => item.name === current.name);
//       if (!x) {
//         return acc.concat([current]);
//       } else {
//         return acc;
//       }
//     }, [] as Fouta[]);
//     return unique;
//   }

//   selectFouta(fouta: Fouta): void {
//     console.log('Selected Fouta:', fouta); // Debug line
//     this.selectedFouta = fouta;
//     this.selectedFoutaImages = this.getImagesFromFouta(fouta);
//   }

//   // getImagesFromFouta(fouta: Fouta): string[] {
//   //   return fouta.colors.flatMap(color => color.images);
//   // }

//   selectImage(index: number): void {
//     this.selectedIndex = index;
//   }

//   toggleDescription(): void {
//     this.showDescription = !this.showDescription;
//   }

//   toggleMaterials(): void {
//     this.showMaterials = !this.showMaterials;
//   }

//   toggleShipping(): void {
//     this.showShipping = !this.showShipping;
//   }

//   viewSubmodelDetails(submodelId: string): void {
//     this.router.navigate([`/submodel/${submodelId}`]);
//   }


}
