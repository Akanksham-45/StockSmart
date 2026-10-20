
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

interface ProductForm {
  name: string;
  price: number | null;
  quantity: number | null;
  category: string;
  sku: string;
  barcode: string;
}

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private readonly apiUrl = 'https://stocksmart-b93f.onrender.com/products';

  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchText = '';
  searchBy = 'name';

  editingProduct: Product | null = null;
  showProductForm = false;

  loading = true;
  errorMessage = '';
  successMessage = '';

  productForm: ProductForm = this.emptyForm();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private emptyForm(): ProductForm {
    return {
      name: '',
      price: null,
      quantity: null,
      category: '',
      sku: '',
      barcode: '',
    };
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;
        this.searchProducts();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.errorMessage =
          'Unable to load products. Please check that the backend is running.';
        this.loading = false;
      },
    });
  }

  searchProducts(): void {
    const term = this.searchText.trim().toLowerCase();

    if (!term) {
      this.filteredProducts = [...this.products];
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

  openAddForm(): void {
    this.editingProduct = null;
    this.productForm = this.emptyForm();
    this.showProductForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };

    this.productForm = {
      name: product.name ?? '',
      price: product.price,
      quantity: product.quantity,
      category: product.category ?? '',
      sku: product.sku ?? '',
      barcode: product.barcode ?? '',
    };

    this.showProductForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  saveProduct(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const name = this.productForm.name.trim();

    if (!name) {
      this.errorMessage = 'Please enter the product name.';
      return;
    }

    if (
      this.productForm.price === null ||
      !Number.isFinite(Number(this.productForm.price)) ||
      Number(this.productForm.price) < 0
    ) {
      this.errorMessage = 'Please enter a valid price (0 or greater).';
      return;
    }

    if (
      this.productForm.quantity === null ||
      !Number.isInteger(Number(this.productForm.quantity)) ||
      Number(this.productForm.quantity) < 0
    ) {
      this.errorMessage = 'Please enter a valid quantity (whole number, 0 or greater).';
      return;
    }

    const payload = {
      name,
      price: Number(this.productForm.price),
      quantity: Number(this.productForm.quantity),
      category: this.productForm.category.trim(),
      sku: this.productForm.sku.trim(),
      barcode: this.productForm.barcode.trim(),
    };

    if (this.editingProduct) {
      const id = this.editingProduct.id;

      this.http.put<Product>(`${this.apiUrl}/${id}`, payload).subscribe({
        next: () => {
          this.successMessage = 'Product updated successfully.';
          this.cancelEdit();
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.errorMessage = 'Unable to update product. Please try again.';
        },
      });
    } else {
      this.http.post<Product>(this.apiUrl, payload).subscribe({
        next: () => {
          this.successMessage = 'Product added successfully.';
          this.cancelEdit();
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error adding product:', error);
          this.errorMessage = 'Unable to add product. Please try again.';
        },
      });
    }
  }

  deleteProduct(id: number): void {
    const confirmed = window.confirm(
      `Are you sure you want to delete product ID ${id}?`
    );

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage = 'Product deleted successfully.';
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.errorMessage = 'Unable to delete product. Please try again.';
      },
    });
  }

  cancelEdit(): void {
    this.editingProduct = null;
    this.productForm = this.emptyForm();
    this.showProductForm = false;
  }
}
