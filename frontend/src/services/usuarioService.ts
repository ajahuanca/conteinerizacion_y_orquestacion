import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class UsuarioService {
	private baseUrl = environment.apiUrl;

	constructor(private http: HttpClient) { }

	getOneUsuario(id: number): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}usuario/usuarios/${id}/`)
			.pipe(catchError(this.handleError));
	}

	getUsuarios(): Observable<any[]> {
		return this.http.get<any[]>(`${this.baseUrl}usuario/usuarios/`)
			.pipe(catchError(this.handleError));
	}

	addUsuario(data: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}usuario/usuarios/`, data)
			.pipe(catchError(this.handleError));
	}

	editUsuario(data: any, id: number): Observable<any> {
		return this.http.put<any>(`${this.baseUrl}usuario/usuarios/${id}/`, data)
			.pipe(catchError(this.handleError));
	}

	deleteUsuario(id: number): Observable<void> {
		return this.http.delete<void>(`${this.baseUrl}usuario/usuarios/${id}/`)
			.pipe(catchError(this.handleError));
	}


	private handleError(error: HttpErrorResponse) {
		let errorMsg = 'Error desconocido';
		if (error.error instanceof ErrorEvent) {
			errorMsg = `Error: ${error.error.message}`;
		} else {
			errorMsg = `Error ${error.status}: ${error.message}`;
		}
		console.error(errorMsg);
		return throwError(() => new Error(errorMsg));
	}

}
