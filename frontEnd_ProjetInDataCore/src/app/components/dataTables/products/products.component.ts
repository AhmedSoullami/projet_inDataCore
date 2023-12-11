import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  
  constructor(private productService: ProductServiceService,private router:Router) {}
  ngOnInit(): void {
    this.getProducts();
   
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products)
    });

  }
  OnAjoute(){
  this.router.navigateByUrl("/ajouterProduit")
  }
  supprimerProduit(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer ce produit!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.supprimerProduit(id).subscribe({
          next: () => {
            this.getProducts();
            Swal.fire('Supprimé!', 'Votre produit a été supprimé.', 'success');
          },
          error: (error) => {
            console.error('Erreur lors de la suppression:', error);
            Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression.', 'error');
          }
        });
      }
    });
  }
  modifierProduit(id:number){
         localStorage.setItem('productId',id.toString());
         this.router.navigateByUrl("/modifierProduit")
  }
  onBack(){
    this.router.navigateByUrl("/acceuil")
  }
 
  
}
