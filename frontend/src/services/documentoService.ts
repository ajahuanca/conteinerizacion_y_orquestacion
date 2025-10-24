import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class DocumentoService {
	private baseUrl = environment.apiUrl;

	constructor(private http: HttpClient) { }

	getOneDocumento(id: number): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}usuario/documentos/${id}/`)
			.pipe(catchError(this.handleError));
	}

	getDocumentos(): Observable<any[]> {
		return this.http.get<any[]>(`${this.baseUrl}usuario/documentos/`)
			.pipe(catchError(this.handleError));
	}

	addDocumento(data: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}usuario/documentos/`, data)
			.pipe(catchError(this.handleError));
	}

	editDocumento(data: any, id: number): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}usuario/documentos/${id}/`, data)
			.pipe(catchError(this.handleError));
	}

	deleteDocumento(id: number): Observable<void> {
		return this.http.delete<void>(`${this.baseUrl}usuario/documentos/${id}/`)
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
