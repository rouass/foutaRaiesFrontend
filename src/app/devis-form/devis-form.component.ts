import { Component, OnInit } from '@angular/core';
import { DevisService } from '../services/devis.service';
import { Devis } from '../models/devis.model';
import { FoutaService } from '../services/fouta.service';
import { Fouta } from '../models/fouta.model';

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
  foutas: Fouta[] = [];

  constructor(
    public devisService: DevisService,
    private foutaService: FoutaService
  ) {}

  ngOnInit(): void {
    this.loadFoutasFromLocalStorage();
    console.log('Loaded devis items:', this.devisService.devisItems);
    if (this.devisService.devisItems.length === 0) {
      console.warn('No items in devis!');
    }
  }

  submitDevis() {
    const devisData: Devis = {
      name: this.name || '',
      prenom: this.prenom || '',
      numtel: this.numtel || '',
      email: this.email || '',
      comments: this.comments || '',
      selectedFoutas: this.devisService.devisItems.map(item => ({
        fouta: item.foutaId,
        color: item.color || 'defaultColor',
        quantity: item.quantity || 1,
        comments: item.comments || '',
      }))
    };

    console.log('Submitting Devis Data:', devisData);

    this.devisService.submitDevis(devisData).subscribe({
      next: (response) => {
        console.log('Devis submitted successfully', response);
        localStorage.removeItem('devis');
        this.devisService.devisItems = [];
        this.foutas = [];
        this.name = '';
        this.prenom = '';
        this.numtel = '';
        this.email = '';
        this.comments = '';
        alert('Devis confirmed and saved successfully!');
      },
      error: (error) => {
        console.error('Error submitting devis', error);
        alert('An error occurred while submitting the devis. Please try again.');
      }
    });
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
            quantity: 1,
            comments: ''  
          }));
        },
        error: (error) => {
          console.error('Error fetching fouta details:', error);
        }
      });
    } else {
      console.warn('No items in devis!');
    }
  }
}
