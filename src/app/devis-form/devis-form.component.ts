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
  isSubmitting: boolean = false;

  name: string | undefined;
  prenom: string | undefined;
  numtel: string | undefined;
  email: string | undefined;
  comments: string | undefined;
  _id: string | undefined;

  foutas: Fouta[] = [];
  loading: boolean = true;

  constructor(
    public devisService: DevisService,
    private foutaService: FoutaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFoutasFromLocalStorage();
    if (this.devisService.devisItems.length === 0) {
      console.warn('No items in devis!');
    }
  }

  // Delete a fouta from the devis list
  deleteFouta(index: number): void {
    this.devisService.devisItems.splice(index, 1);
    localStorage.setItem('devis', JSON.stringify(this.devisService.devisItems.map(item => item.foutaId)));

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
    // Vérification si aucun produit dans le devis
    if (this.devisService.devisItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Aucun produit dans le devis',
        text: 'Veuillez ajouter des produits avant de soumettre le devis.',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
      });
      return; // Arrêter l'exécution si aucun produit
    }

    // Validation des informations de l'utilisateur
    const missingFields: string[] = [];

    if (!this.name || this.name.trim() === '') missingFields.push('Nom');
    if (!this.prenom || this.prenom.trim() === '') missingFields.push('Prénom');
    if (!this.numtel || this.numtel.trim().length < 8) missingFields.push('Téléphone (min 8 caractères)');
    if (!this.email || this.email.trim() === '') missingFields.push('Email');

    // Si des champs sont manquants, afficher une alerte
    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Champs obligatoires manquants',
        text: `Veuillez remplir les champs suivants : ${missingFields.join(', ')}`,
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
      });
      return; // Arrêter l'exécution s'il manque des informations utilisateur
    }

    // Validation des champs des produits (foutas)
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
        return; // Arrêter l'exécution s'il manque des informations produit
      }
    }

    // Prévenir la soumission multiple
    if (this.isSubmitting) {
      return;
    }

    // Maintenant, on peut soumettre
    this.isSubmitting = true;

    const devisData: Devis = {
      _id: this._id || '',
      name: this.name || '',
      prenom: this.prenom || '',
      numtel: this.numtel || '',
      email: this.email || '',
      comments: this.comments || '',
      selectedFoutas: this.devisService.devisItems.map(item => ({
        fouta: item.foutaId,
        dimension: item.selectedDimension,
        quantity: item.quantity || 35,
        comments: item.comments || '',
      }))
    };

    this.devisService.submitDevis(devisData).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Devis soumis avec succès!',
          text: 'Nous vous contacterons bientôt.',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
        });

        // Vider le localStorage et réinitialiser les données du formulaire
        localStorage.removeItem('devis');
        this.devisService.devisItems = [];
        this.name = '';
        this.prenom = '';
        this.numtel = '';
        this.email = '';
        this.comments = '';

        // Optionnel : navigation vers une autre page
        this.router.navigate(['/']);
        this.isSubmitting = false; // Débloquer le formulaire après soumission
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de soumission',
          text: 'Une erreur est survenue lors de la soumission du devis. Veuillez réessayer.',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
        });
        this.isSubmitting = false; // Débloquer le formulaire en cas d'erreur
      }
    });
  }




  // Load foutas from local storage
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

  buildDevisPayload() {
    return {
      name: this.name,
      prenom: this.prenom,
      numtel: this.numtel,
      email: this.email,
      comments: this.comments,
      devisItems: this.devisService.devisItems
    };
  }

}
