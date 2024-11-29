import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="access-denied-container">
      <h1>Acesso Negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <a routerLink="/">Voltar para a página inicial</a>
    </div>
  `,
  styles: [`
    .access-denied-container {
      text-align: center;
      margin-top: 50px;
    }
    .access-denied-container h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }
    .access-denied-container p {
      font-size: 18px;
      margin-bottom: 30px;
    }
    .access-denied-container a {
      font-size: 16px;
      color: #007bff;
      text-decoration: none;
    }
    .access-denied-container a:hover {
      text-decoration: underline;
    }
  `]
})
export class AccessDeniedComponent {}
