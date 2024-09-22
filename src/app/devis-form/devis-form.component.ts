import { Component, OnInit } from '@angular/core';
import { DevisService } from '../services/devis.service';
import { Devis } from '../models/devis.model';
import { FoutaService } from '../services/fouta.service';
import { Fouta } from '../models/fouta.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devis-form',
  templateUrl: './devis-form.component.html',
  styleUrls: ['./devis-form.component.css']
})
export class DevisFormComponent implements OnInit {
  name: string | undefined;
  prenom: string | undefined;
  numtel: string | undefined;
  email: string | undefined;
  comments: string | undefined;
  _id: string | undefined;

  foutas: Fouta[] = [];
  loading: boolean = true; // Track loading state

  constructor(
    public devisService: DevisService,
    private foutaService: FoutaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFoutasFromLocalStorage();
    console.log('Loaded devis items:', this.devisService.devisItems);
    if (this.devisService.devisItems.length === 0) {
      console.warn('No items in devis!');
    }
  }

  // Delete a fouta from the devis list
  deleteFouta(index: number): void {
    this.devisService.devisItems.splice(index, 1); // Remove the item from the array
    localStorage.setItem('devis', JSON.stringify(this.devisService.devisItems.map(item => item.foutaId))); // Update local storage

    // Show success toast
    Swal.fire({
      icon: 'success',
      title: 'Produit supprimé!',
      toast: true,
      position: 'top-end',
      timer: 2000,
      showConfirmButton: false,
    });
  }


  submitDevis() {
    // Validate user information fields
    if (!this._id || !this.name || !this.prenom || !this.numtel || !this.email) {
      Swal.fire({
        icon: 'error',
        title: 'Champs obligatoires manquants',
        text: 'Veuillez remplir tous les champs requis (Nom, Prénom, Téléphone, Email).',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
      });
      return; // Prevent submission if any required field is missing
    }

    // Validate fouta-specific fields
    for (let item of this.devisService.devisItems) {
      if (!item.selectedDimension || !item.quantity || item.quantity < 35) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de saisie',
          text: 'Veuillez choisir une dimension et une quantité (min. 35) pour chaque produit.',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
        });
        return; // Prevent submission if fouta details are missing or invalid
      }
    }

    // If validation passes, submit the form
    const devisData: Devis = {
      _id: this._id || '' ,
      name: this.name || '',
      prenom: this.prenom || '',
      numtel: this.numtel || '',
      email: this.email || '',
      comments: this.comments || '',
      selectedFoutas: this.devisService.devisItems.map(item => ({
        fouta: item.foutaId,
        dimension: item.selectedDimension,
        quantity: item.quantity || 1,
        comments: item.comments || '',
      }))
    };

    console.log('Submitting Devis Data:', devisData);

    this.devisService.submitDevis(devisData).subscribe({
      next: (response) => {
        // Reset form fields and clear devis items
        this.resetForm();

        // Show success toast
        Swal.fire({
          icon: 'success',
          title: 'Devis soumis avec succès!',
          text: 'Nous vous contacterons bientôt.',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
        });

        // Redirect to home page
        this.router.navigate(['/']); // Adjust the path to your home route
      },
      error: (error) => {
        console.error('Error submitting devis', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur de soumission',
          text: 'Une erreur est survenue lors de la soumission du devis. Veuillez réessayer.',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
        });
      }
    });
  }

  // Reset form fields and state
  private resetForm() {
    this.name = undefined;
    this.prenom = undefined;
    this.numtel = undefined;
    this.email = undefined;
    this.comments = undefined;
    this.devisService.devisItems = []; // Clear devis items
    localStorage.removeItem('devis'); // Clear local storage
    this.loading = true; // Optionally reset loading state
    this.loadFoutasFromLocalStorage(); // Reload foutas if needed
  }

  loadFoutasFromLocalStorage(): void {
    const foutaIds = JSON.parse(localStorage.getItem('devis') || '[]');

    if (foutaIds.length > 0) {
      this.foutaService.getFoutasByIds(foutaIds).subscribe({
        next: (foutas: Fouta[]) => {
          this.foutas = foutas;
          this.devisService.devisItems = foutas.map(fouta => ({
            foutaId: fouta._id,
            name: fouta.name,
            description: fouta.description,
            image: fouta.images[0],
            dimensions: fouta.dimensions,
            selectedDimension: fouta.dimensions[0],
            quantity: 1,
            comments: ''
          }));
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching fouta details:', error);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
}
