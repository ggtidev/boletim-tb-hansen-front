import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  colunsTitles:string[] = ['DISTRITOS', 'UNIDADES', 'BOLETIM', 'STATUS'];

  data = [
    {
      district: 3,
      name: "US 106 CS PROF JOAQUIM CAVALCANTE"
    },
  ];
}
