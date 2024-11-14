import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

export interface Permission {
  user_id?: string;
  user_name?: string;
  permission_id: string;
  permission_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersWebhookService {
  private usersUrl = 'http://192.168.0.18:5678/webhook/users';
  private permissionsUrl =
    'http://192.168.0.18:5678/webhook/check-permissions';
  private updatePermissionsUrl =
    'http://192.168.0.18:5678/webhook/u-permissions';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserPermissions(userId: number): Observable<Permission[]> {
    const params = new HttpParams().set('user_id', userId.toString());
    return this.http.get<Permission[]>(this.permissionsUrl, { params });
  }

  updateUserPermissions(
    userId: number,
    permissions: number[]
  ): Observable<void> {
    const body = {
      user_id: userId,
      grupo_id: permissions,
    };
    return this.http.post<void>(this.updatePermissionsUrl, body);
  }
}
