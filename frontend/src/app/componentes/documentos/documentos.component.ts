import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../../services/documentoService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
	selector: 'app-documentos',
	templateUrl: './documentos.component.html',
	standalone: true,
	imports: [CommonModule, FormsModule]
})
export class DocumentosComponent implements OnInit {

	documentos: any[] = [];
	nuevoDocumento = { tipo: '', estado: true };
	editando = false;
	documentoEditandoId: number | null = null;

	constructor(private api: DocumentoService) { }

	ngOnInit(): void {
		this.obtenerDocumentos();
	}

	obtenerDocumentos(): void {
		this.api.getDocumentos().subscribe({
			next: (data) => {this.documentos = data; console.log(data);},
			error: (err) => console.error('Error al obtener documentos:', err)
		});
	}

	agregarDocumento(): void {
		if (!this.nuevoDocumento.tipo) return;

		this.api.addDocumento(this.nuevoDocumento).subscribe({
			next: () => {
				this.nuevoDocumento = { tipo: '', estado: true };
				this.obtenerDocumentos();
			},
			error: (err) => console.error('Error al agregar documento:', err)
		});
	}

	editarDocumento(doc: any): void {
		this.editando = true;
		this.documentoEditandoId = doc.id;
		this.nuevoDocumento = { tipo: doc.tipo, estado: doc.estado };
	}

	actualizarDocumento(): void {
		if (!this.documentoEditandoId) return;

		this.api.editDocumento(this.nuevoDocumento, this.documentoEditandoId).subscribe({
			next: () => {
				this.cancelarEdicion();
				this.obtenerDocumentos();
			},
			error: (err) => console.error('Error al actualizar documento:', err)
		});
	}

	eliminarDocumento(id: number): void {
		if (confirm('¿Deseas eliminar este documento?')) {
			this.api.deleteDocumento(id).subscribe({
				next: () => this.obtenerDocumentos(),
				error: (err) => console.error('Error al eliminar documento:', err)
			});
		}
	}

	cancelarEdicion(): void {
		this.editando = false;
		this.documentoEditandoId = null;
		this.nuevoDocumento = { tipo: '', estado: true };
	}
}
