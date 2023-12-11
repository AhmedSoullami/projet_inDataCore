import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productId!: number;
  updateForm!: FormGroup;

  constructor(private productService: ProductServiceService, private formBuilder: FormBuilder,private router:Router) {}

  ngOnInit(): void {
    
    const storedProductId = localStorage.getItem('productId') ?? '';
    const productIdFromStorage = parseInt(storedProductId, 10);
    console.log(productIdFromStorage)

    if (!isNaN(productIdFromStorage)) {
      this.productId = productIdFromStorage;
    } else {
      console.error('erreur');
    }

    this.initForm();

    this.productService.getProductById(this.productId).subscribe(data => {
      this.updateForm.patchValue(data);
      console.log(data)
    });
  }

  initForm(): void {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required]
    });
  }

  updateProduct(): void {
    const storedProductId = localStorage.getItem('productId') ?? '';
    const productIdFromStorage = parseInt(storedProductId, 10);
  
    if (this.updateForm.valid) {
      const updatedProductData = this.updateForm.value;
      this.productId = productIdFromStorage;
      this.productService.updateProduct(this.productId, updatedProductData).subscribe(
        () => {
          console.log(this.productId);
          
  
          
          Swal.fire({
            icon: 'success',
            title: 'Mise à jour réussie',
            text: 'Votre produit a été mis à jour avec succès!'
          });
  
          this.router.navigateByUrl("/products");
        },
        error => {
          console.error('Error updating product:', error);
          console.log(this.productId);
  
          
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la mise à jour du produit.'
          });
        }
      );
    }
  }
  onBack(){
    this.router.navigateByUrl("/products")
  }
}
