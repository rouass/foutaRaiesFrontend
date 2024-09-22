import { Component, OnInit } from '@angular/core';
import { DevisService } from '../../services/devis.service';
import { Devis } from '../../models/devis.model';  // Adjust according to your model

@Component({
  selector: 'app-list-devis',
  templateUrl: './list-devis.component.html',
  styleUrls: ['./list-devis.component.css']
})
export class ListDevisComponent implements OnInit {

  devisList: Devis[] = [];

  constructor(private devisService: DevisService) { }

  ngOnInit(): void {
    this.fetchDevis();
  }

  fetchDevis() {
    this.devisService.getAllDevis().subscribe(response => {
      this.devisList = response.devis;
    }, error => {
      console.log('Error fetching devis:', error);
    });
  }

  // Method to download PDF
  downloadPDF(devisId: string) {
    this.devisService.downloadPDF(devisId).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Devis-${devisId}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url); // Clean up URL object after download
    }, error => {
      console.log('Error downloading PDF:', error);
    });
  }

  deleteDevis(devisId: string) {
    if (confirm("Are you sure you want to delete this devis?")) {
      this.devisService.deleteDevis(devisId).subscribe(
        response => {
          console.log(response.message);
          this.fetchDevis(); // Refresh the list after deletion
        },
        error => {
          console.log('Error deleting devis:', error);
        }
      );
    }
  }

}
