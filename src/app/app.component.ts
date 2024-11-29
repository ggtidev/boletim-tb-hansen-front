import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boletim';
  isLoading = false;
  loadingDelay = 100; // Tempo antes de mostrar o spinner
  minLoadingTime = 500; // Tempo mínimo que o spinner deve ficar visível
  private loadingTimeout: any; // Armazena o timeout
  private loadingVisibleTime: number = 0; // Inicializa o tempo de visibilidade do spinner

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart: Spinner ON');
        this.loadingVisibleTime = Date.now(); // Marca o tempo de início do spinner
        this.loadingTimeout = setTimeout(() => {
          this.isLoading = true; // Exibe o spinner após o delay
        }, this.loadingDelay);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        console.log('NavigationEnd: Spinner OFF');
        const elapsed = Date.now() - this.loadingVisibleTime; // Calcula o tempo decorrido
        const remainingTime = this.minLoadingTime - elapsed; // Tempo restante para atingir o mínimo
        clearTimeout(this.loadingTimeout); // Limpa o timeout pendente

        if (this.isLoading && remainingTime > 0) {
          setTimeout(() => {
            this.isLoading = false; // Oculta o spinner após o tempo restante
          }, remainingTime);
        } else {
          this.isLoading = false; // Oculta o spinner imediatamente
        }
      }
    });
  }
}
