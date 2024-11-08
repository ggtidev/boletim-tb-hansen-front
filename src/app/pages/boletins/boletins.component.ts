import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-boletins',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, RouterLink],
  templateUrl: './boletins.component.html',
  styleUrl: './boletins.component.scss'
})
export class BoletinsComponent{
  router:Router = new Router();
  columnsTitles:string[] = ['id', 'ciclo', 'inicio', 'fim', 'contador', 'boletim'];

  dataSource = new MatTableDataSource([
    {
      id: 1,
      ciclo: 'dez/2024',
      inicio: '01/12/2024',
      fim: '31/12/2024',
      contador: 1,
    }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getRouterName(){
    if(this.router.url.match(/home\/\d+\/tuberculose$/)) return 'Tuberculose';
    
    return 'Hanseniase';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
