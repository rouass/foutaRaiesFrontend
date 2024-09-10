import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoutaService } from '../services/fouta.service';
import { SubmodelService } from '../services/submodel.service';
import { Fouta } from '../models/fouta.model';
import { SubModel } from '../models/submodel.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-submodel-fouta-details',
  templateUrl: './submodel-fouta-details.component.html',
  styleUrls: ['./submodel-fouta-details.component.css']
})
export class SubmodelFoutaDetailsComponent implements OnInit {
  submodels: SubModel[] = [];
  foutas: Fouta[] = [];
  uniqueFoutas: Fouta[] = [];
  selectedFouta: Fouta | null = null;
  selectedFoutaImages: string[] = [];
  isLoading = true;
  selectedIndex = 0;
  showDescription = false;
  showMaterials = false;
  showShipping = false;
  similarFoutas: Fouta[] = [];
  categoryName: string | null = null;
  showPopup = false;

  constructor(
    private foutaService: FoutaService,
    private subModelService: SubmodelService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const subcategoryName = this.route.snapshot.paramMap.get('subcategoryName');
    if (subcategoryName) {
      this.fetchSubmodelsAndFoutas(subcategoryName);
      this.fetchCategoryBySubcategory(subcategoryName);
    }
  }

  fetchCategoryBySubcategory(subcategoryName: string): void {
    this.categoryService.getCategoryBySubcategoryName(subcategoryName).subscribe(
      (category: any) => {
        this.categoryName = category.name;
        this.fetchSimilarFoutas(this.categoryName);
      },
      error => {
        console.error('Error fetching category by subcategory:', error);
      }
    );
  }

  fetchSubmodelsAndFoutas(subcategoryName: string): void {
    this.foutaService.getFoutasBySubcategoryName(subcategoryName).subscribe(
      (foutas: Fouta[]) => {
        this.foutas = foutas;
        this.uniqueFoutas = this.getUniqueFoutas(this.foutas);
        if (this.uniqueFoutas.length > 0) {
          this.selectFouta(this.uniqueFoutas[0]);
        }
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        console.error('Error fetching foutas:', error);
      }
    );

    this.subModelService.getSubmodelsBySubcategoryName(subcategoryName).subscribe(
      (submodels: SubModel[]) => {
        this.submodels = submodels;
      },
      error => {
        console.error('Error fetching submodels:', error);
      }
    );
  }

  fetchSimilarFoutas(categoryName: string | null): void {
    console.log(categoryName);

    if (categoryName && this.selectedFouta) {
      const excludeSubcategoryId = this.selectedFouta.subcategoryId;

      let excludeSubmodelId: string | undefined;

      this.subModelService.getSubmodelsBySubcategoryId(excludeSubcategoryId).subscribe(
        (submodels: SubModel[]) => {
          const submodel = submodels.find(sm => sm.parentSubcategoryId === excludeSubcategoryId);
          excludeSubmodelId = submodel ? submodel._id : undefined;

          const selectedFoutaId = this.selectedFouta?._id;
          if (selectedFoutaId) {
            this.foutaService.getSimilarFoutasByCategory(categoryName, selectedFoutaId, excludeSubcategoryId, excludeSubmodelId).subscribe(
              (foutas: Fouta[]) => {
                this.similarFoutas = foutas;
              },
              error => {
                console.error('Error fetching similar foutas:', error);
              }
            );
          }
        },
        error => {
          console.error('Error fetching submodels:', error);
        }
      );
    }
  }

  getUniqueFoutas(foutas: Fouta[]): Fouta[] {
    return foutas.reduce((acc, current) => {
      if (!acc.find(fouta => fouta.name === current.name)) {
        acc.push(current);
      }
      return acc;
    }, [] as Fouta[]);
  }

  selectFouta(fouta: Fouta): void {
    this.selectedFouta = fouta;
    this.selectedFoutaImages = this.getImagesFromFouta(fouta);
    this.selectedIndex = 0;
  }

  getImagesFromFouta(fouta: Fouta): string[] {
    return fouta.images;
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  toggleDescription(): void {
    this.showDescription = !this.showDescription;
  }

  toggleMaterials(): void {
    this.showMaterials = !this.showMaterials;
  }

  toggleShipping(): void {
    this.showShipping = !this.showShipping;
  }

  viewSubmodelDetails(submodelId: string): void {
    this.router.navigate([`/submodel/${submodelId}`]);
  }

  addToDevis(): void {
    if (this.selectedFouta) {
      const foutaId = this.selectedFouta._id;

      const existingDevis = JSON.parse(localStorage.getItem('devis') || '[]');

      existingDevis.push(foutaId);

      localStorage.setItem('devis', JSON.stringify(existingDevis));

      console.log('Fouta ID added to devis:', foutaId);

      this.showPopup = true;

      setTimeout(() => {
        this.showPopup = false;
      }, 3000);
    }
  }
  finalizeDevis(): void {
    this.router.navigate(['/finalize-devis']); 
  }
}
