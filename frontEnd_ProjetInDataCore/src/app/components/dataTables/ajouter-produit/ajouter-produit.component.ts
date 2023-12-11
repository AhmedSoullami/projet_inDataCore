import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductServiceService,private router:Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      this.productService.ajouterProduit(formData).subscribe(
        response => {
          console.log('Votre produit a été ajouté avec succès:', response);
  
      
          Swal.fire({
            icon: 'success',
            title: 'Ajout réussi',
            text: 'Votre produit a été ajouté avec succès!'
          });
  
          this.router.navigateByUrl("/products");
        },
        error => {
          console.error('Erreur de l\'ajout:', error);
  
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout du produit.'
          });
        }
      );
    }
  }
  Annuler(){
      this.router.navigateByUrl("/products")
  }
}
