import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UsersWebhookService, User, Permission } from '../../shared/services/webhook/users/users-webhook.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, SidebarComponent, HttpClientModule, MatPaginatorModule, MatIconModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  columnsTitles: string[] = ['nome', 'email', 'cpf', 'acoes'];
  dataSource = new MatTableDataSource<User>();
  viewModalOpen = false;
  editModalOpen = false;
  selectedUser: User | null = null;
  userPermissions: Permission[] = [];
  allPermissions: Permission[] = [
    { permission_id: '1', permission_name: 'Distrito' },
    { permission_id: '2', permission_name: 'Unidade' },
    { permission_id: '3', permission_name: 'Admin' },
    { permission_id: '4', permission_name: 'Usuario' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private usersWebhookService: UsersWebhookService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-redirect']);
      return;
    }

    this.usersWebhookService.getUsers().subscribe({
      next: (data: User[]) => {
        this.dataSource.data = data;
      },
      error: (err: any) => console.error('Erro ao buscar os usuários do webhook', err),
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewPermissions(user: User) {
    this.selectedUser = user;
    this.usersWebhookService.getUserPermissions(user.id).subscribe({
      next: (permissions: Permission[]) => {
        this.userPermissions = permissions;
        this.viewModalOpen = true;
      },
      error: (err: any) => console.error('Erro ao buscar permissões do usuário', err),
    });
  }

  isPermissionSelected(permissionId: string): boolean {
    return this.userPermissions.some(p => p.permission_id === permissionId);
  }

  editPermissions(user: User) {
    this.selectedUser = user;
    this.usersWebhookService.getUserPermissions(user.id).subscribe({
      next: (permissions: Permission[]) => {
        this.userPermissions = permissions;
        this.editModalOpen = true;
      },
      error: (err: any) => console.error('Erro ao buscar permissões do usuário', err),
    });
  }

  closeViewModal() {
    this.viewModalOpen = false;
    this.selectedUser = null;
    this.userPermissions = [];
  }

  closeEditModal() {
    this.editModalOpen = false;
    this.selectedUser = null;
    this.userPermissions = [];
  }

  togglePermission(permissionId: string) {
    const index = this.userPermissions.findIndex((perm) => perm.permission_id === permissionId);
    if (index === -1) {
      this.userPermissions.push({ permission_id: permissionId, permission_name: '' });
    } else {
      this.userPermissions.splice(index, 1);
    }
  }

  updatePermissions() {
    if (this.selectedUser) {
      const permissionsIds = this.userPermissions.map((perm) => +perm.permission_id);
      this.usersWebhookService.updateUserPermissions(this.selectedUser.id, permissionsIds).subscribe({
        next: () => {
          console.log('Permissões atualizadas com sucesso');
          this.closeEditModal();
        },
        error: (err: any) => console.error('Erro ao atualizar permissões do usuário', err),
      });
    }
  }
}
