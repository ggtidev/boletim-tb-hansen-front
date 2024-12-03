import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../config/config';

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
  private usersUrl = `${environment.baseUrl}${environment.endpoints.users}`;
  private permissionsUrl =
    `${environment.baseUrl}${environment.endpoints.checkpermissions}`;
  private updatePermissionsUrl =
    `${environment.baseUrl}${environment.endpoints.uppermissions}`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserPermissions(userId: number): Observable<Permission[]> {
    const params = new HttpParams().set('user_id', userId.toString());
    return this.http.get<Permission[]>(this.permissionsUrl, { params });
  }

  updateUserPermissions(userId: number, permissions: number[]): Observable<void> {
    const body = {
      user_id: userId,
      grupo_ids: permissions, //byebyecors fdp
    };
    return this.http.put<void>(this.updatePermissionsUrl, body);
  }
  
}
