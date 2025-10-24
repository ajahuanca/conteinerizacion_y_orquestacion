import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuarioService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentoService } from '../../../services/documentoService';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	standalone: true,
	imports: [CommonModule, FormsModule]
})
export class UsuariosComponent implements OnInit {

	usuarios: any[] = [];
	dataDocumento = [{ id: null, tipo: '', estado: true }];
	nuevoUsuario = {
		id: null,
		numero_ci: '',
		tipo_documento_id: 0,
		nombre_completo: '',
		correo_electronico: '',
		estado: true
	};
	editando = false;
	usuarioEditandoId: number | null = null;

	constructor(
		private api: UsuarioService,
		private apiDoc: DocumentoService
	) { }

	ngOnInit(): void {
		this.obtenerUsuarios();
		this.obtenerDocumentos();
	}

	obtenerDocumentos(){
		this.apiDoc.getDocumentos().subscribe({
			next: (data) => this.dataDocumento = data,
			error: (err) => console.error('Error al obtener documentos:', err)
		});
	}

	obtenerUsuarios(): void {
		this.api.getUsuarios().subscribe({
			next: (data) => this.usuarios = data,
			error: (err) => console.error('Error al obtener usuarios:', err)
		});
	}

	agregarUsuario(): void {
		if (!this.nuevoUsuario.nombre_completo || !this.nuevoUsuario.correo_electronico) return;

		this.api.addUsuario(this.nuevoUsuario).subscribe({
			next: () => {
				this.nuevoUsuario = {
					id: null,
					numero_ci: '',
					tipo_documento_id: 0,
					nombre_completo: '',
					correo_electronico: '',
					estado: true
				};
				this.obtenerUsuarios();
			},
			error: (err) => console.error('Error al agregar usuario:', err)
		});
	}

	editarUsuario(usuario: any): void {
		this.editando = true;
		this.usuarioEditandoId = usuario.id;
		this.nuevoUsuario = {
			id: usuario.id,
			numero_ci: usuario.numero_ci,
			tipo_documento_id: usuario.tipo_documento_id,
			nombre_completo: usuario.nombre_completo,
			correo_electronico: usuario.correo_electronico,
			estado: usuario.estado
		};
	}

	actualizarUsuario(): void {
		if (!this.usuarioEditandoId) return;

		this.api.editUsuario(this.nuevoUsuario, this.usuarioEditandoId).subscribe({
			next: () => {
				this.cancelarEdicion();
				this.obtenerUsuarios();
			},
			error: (err) => console.error('Error al actualizar usuario:', err)
		});
	}

	eliminarUsuario(id: number): void {
		if (confirm('¿Deseas eliminar este usuario?')) {
			this.api.deleteUsuario(id).subscribe({
				next: () => this.obtenerUsuarios(),
				error: (err) => console.error('Error al eliminar usuario:', err)
			});
		}
	}

	cancelarEdicion(): void {
		this.editando = false;
		this.usuarioEditandoId = null;
		this.nuevoUsuario = {
			id: null,
			numero_ci: '',
			tipo_documento_id: 0,
			nombre_completo: '',
			correo_electronico: '',
			estado: true
		};
	}
}
