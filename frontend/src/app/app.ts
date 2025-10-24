import { Component, signal } from '@angular/core';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { DocumentosComponent } from './componentes/documentos/documentos.component';

@Component({
  selector: 'app-root',
  imports: [UsuariosComponent, DocumentosComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
