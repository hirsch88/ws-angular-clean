import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { RouterPort } from 'src/app/core/ports/RouterPort'

@Injectable({
  providedIn: 'root',
})
export class RouterAdapter implements RouterPort {
  constructor(private readonly router: Router) {}

  async goToHome() {
    await this.router.navigateByUrl('/')
  }

  async goToCheckout() {
    await this.router.navigateByUrl('/checkout')
  }
}
