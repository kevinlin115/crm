import { Injectable } from '@angular/core';
import { AuthService } from '@core/services';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  get supabase() { return this.authService.supabase; }

  constructor(
    private authService: AuthService
  ) { }

  getProducts() {
    return from(this.supabase
      .from('Product')
      .select('*'));
  }

  addProduct() {
    return from(this.supabase
      .from('Product')
      .insert([
        {
          label: 'abc',
          value: 789
        },
      ]));
  }

  updateProduct() {
    return from(this.supabase
      .from('Product')
      .update(
        {
          label: 'update lable'
        })
      .eq('id', '18'))
  }

  deleteProduct() {
    return from(this.supabase
      .from('Product')
      .delete()
      .eq('id', '18'))
  }

}
