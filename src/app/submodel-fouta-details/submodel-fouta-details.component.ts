import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoutaService } from '../services/fouta.service';
import { SubmodelService } from '../services/submodel.service';
import { CategoryService } from '../services/category.service';
import { Fouta } from '../models/fouta.model';
import { SubModel } from '../models/submodel.model';
import { Subcategory } from '../models/subcategory.model';
import { debounceTime, forkJoin, Subscription } from 'rxjs';
import { SubcategoryService } from '../services/subcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submodel-fouta-details',
  templateUrl: './submodel-fouta-details.component.html',
  styleUrls: ['./submodel-fouta-details.component.css']
})
export class SubmodelFoutaDetailsComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
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
  similarCategories: any[] = []; // Renamed from similarFoutas
  categoryName: string | null = null;
  subcategoryName: string | null = null;
  showPopup = false;
  subcategory: Subcategory | null = null;
  isLoadingSimilarCategories = true;

  constructor(
    private foutaService: FoutaService,
    private subModelService: SubmodelService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private subCatgoryService : SubcategoryService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.pipe(debounceTime(300)).subscribe(params => {
      // Reset the state before loading new data
      this.resetComponentState();

      this.categoryName = params.get('categoryName');
      this.subcategoryName = params.get('subcategoryName');

      if (this.categoryName && this.subcategoryName) {
        this.fetchSubcategoryDetails(this.categoryName, this.subcategoryName);
        this.fetchSubmodelsAndFoutas(this.categoryName, this.subcategoryName);
        window.scrollTo(0, 0);  // Scroll to the top after navigation

      }
    });
  }

  // Reset method to clear previous selections
  resetComponentState(): void {
    this.selectedFouta = null;
    this.selectedFoutaImages = [];
    this.selectedIndex = 0;
    this.isLoading = true;
  }



  fetchSubmodelsAndFoutas(categoryName: string, subcategoryName: string): void {
    this.isLoading = true;

    forkJoin({
      // Now expecting the object { foutas, submodels } from the service
      result: this.foutaService.getFoutasByCategoryAndSubcategoryName(categoryName, subcategoryName)
    }).subscribe(({ result }) => {
      // Properly accessing foutas and submodels from the result object
      this.foutas = result.foutas;
      this.submodels = result.submodels;

      this.uniqueFoutas = this.getUniqueFoutas(this.foutas);

      if (this.uniqueFoutas.length > 0) {
        this.selectFouta(this.uniqueFoutas[0]);  // Select first fouta only if available
      }

      this.fetchSimilarSubcategories(this.categoryName);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.error('Error fetching data:', error);
    });
  }





  fetchSimilarSubcategories(categoryName: string | null): void {
    this.isLoadingSimilarCategories = true; // Start loading skeleton
    if (categoryName && this.selectedFouta) {
      const excludeSubcategoryId = this.selectedFouta.subcategoryId;
      let excludeSubmodelId: string | undefined;

      this.subModelService.getSubmodelsBySubcategoryId(excludeSubcategoryId).subscribe(
        (submodels: SubModel[]) => {
          const submodel = submodels.find(sm => sm.parentSubcategoryId === excludeSubcategoryId);
          excludeSubmodelId = submodel ? submodel._id : undefined;

          const selectedFoutaId = this.selectedFouta?._id;
          if (selectedFoutaId) {
            this.foutaService.getSimilarSubcategoriesByCategory(categoryName, selectedFoutaId, excludeSubmodelId).subscribe(
              (subcategories: Subcategory[]) => {
                this.similarCategories = subcategories.map(subcategory => ({
                  _id: subcategory._id,
                  name: subcategory.name,
                  description: subcategory.description,
                  image: subcategory.image,
                  parentCategoryId: subcategory.parentCategoryId,
                }));
                this.isLoadingSimilarCategories = false; // Stop loading skeleton
              },
              (error: any) => {
                this.isLoadingSimilarCategories = false; // Stop loading even on error
                console.error('Error fetching similar subcategories:', error);
              }
            );
          }
        },
        (error: any) => {
          this.isLoadingSimilarCategories = false; // Stop loading even on error
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

      // Display SweetAlert2 toast with the fouta image
      Swal.fire({
        text: 'Product added to devis!',
        title: `${this.selectedFouta.title}`,
        imageUrl: this.selectedFoutaImages[this.selectedIndex],
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Product image',
        toast: true,
        position: 'top-end',
        showConfirmButton: true,
        confirmButtonText: 'Finalize Devis',
        timer: 2000,
      }).then((result) => {
        if (result.isConfirmed) {
          this.finalizeDevis(); // Call the finalizeDevis method to navigate
        }
      });
    }}


  finalizeDevis(): void {
    this.router.navigate(['/finalize-devis']);
  }
  viewCategory(category: Subcategory): void {
    const parentCategoryId = category.parentCategoryId;

    // Fetch the parent category by its ID
    this.categoryService.getCategoryById(parentCategoryId).subscribe(
      (parentCategory: any) => {
        const parentCategoryName = (parentCategory.name);  // Use slugify if needed
        const subcategoryName = (category.name);  // Use slugify if needed

        // Navigate to the correct URL
        this.router.navigate([`/products/${parentCategoryName}/${subcategoryName}`]);
      },
      (error: any) => {
        console.error('Error fetching parent category:', error);
      }
    );
  }


  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();  // Unsubscribe when the component is destroyed
    }
  }

  fetchSubcategoryDetails(categoryName: string, subcategoryName: string): void {
    this.subCatgoryService.getSubcategoryByCategoryAndSubcategoryName(categoryName, subcategoryName).subscribe(
      (subcategory: Subcategory) => {
        // Assign the fetched subcategory data to the component's subcategory property
        this.subcategory = subcategory;
        console.log('Subcategory Details:', this.subcategory);
      },
      (error) => {
        console.error('Error fetching subcategory details:', error);
      }
    );
  }


}
