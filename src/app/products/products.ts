import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  sku?: string;
  barcode?: string;
}

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchText = '';
  searchBy = 'name';
  editingProduct: Product | null = null;

  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Product[]>('http://localhost:8083/products').subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.errorMessage = 'Unable to load products. Please check the backend.';
        this.loading = false;
      },
    });
  }

  searchProducts(): void {
    const term = this.searchText.trim().toLowerCase();

    if (!term) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter((product) => {
      let value = '';

      switch (this.searchBy) {
        case 'sku':
          value = product.sku ?? '';
          break;
        case 'category':
          value = product.category ?? '';
          break;
        case 'barcode':
          value = product.barcode ?? '';
          break;
        default:
          value = product.name ?? '';
      }

      return value.toLowerCase().includes(term);
    });
  }
  editProduct(product: Product): void {
    this.editingProduct = { ...product };
  }
}
