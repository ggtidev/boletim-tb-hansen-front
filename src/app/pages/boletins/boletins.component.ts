import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-boletins',
  standalone: true,
  imports: [MatTableModule, MatPaginator, SidebarComponent],
  templateUrl: './boletins.component.html',
  styleUrls: ['./boletins.component.scss']
})
export class BoletinsComponent implements OnInit {
  tipo: string = '';
  distrito: string = '';
  unidade: string = '';
  columnsTitles: string[] = ['id', 'ciclo', 'inicio', 'fim', 'contador', 'boletim'];

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tipo = params['tipo'] === 'tuberculose' ? 'Tuberculose' : 'Hanseníase';
      this.distrito = params['distrito'];
      this.unidade = params['unidade'];
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
