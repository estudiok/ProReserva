import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Libro } from '../models/libro';
import { Usuario } from '../models/usuario';
import { PrestamoLibro } from '../models/prestamolibro';
import { UsuarioLibPres } from '../models/usuariolibpres';
import { Categoria } from '../models/categoria';
import { Rol } from '../models/Rol';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {



  apiUrl: string = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const authToken = (JSON.parse(localStorage.getItem('usuario')) as Usuario).token;
    return new HttpHeaders({
      'Authorization': `${authToken}`,
      'Content-Type': 'application/json',
    });
  }


  obtenerLibrosDisponibles():Observable<Libro[]> {
    const headers = this.getHeaders();
    return this.http.get<Libro[]>(`${this.apiUrl}/api/reservacion`, {headers});
  }

  busquedaLibro(dataSearch: string):Observable<Libro[]> {
    return this.http.post<Libro[]>(`${this.apiUrl}/api/libro`, {dato: dataSearch});
  }

  obtenerCredencial(data):Observable<Usuario> {
    // const headers = this.getHeaders();
    return this.http.post<Usuario>(`${this.apiUrl}/api/getuser`, data);
  }

  setPrestamoParcial(data) {
    return this.http.post(`${this.apiUrl}/api/setpartial`, data);
  }

  setDisponible(idLibro, disponible) {
    return this.http.post(`${this.apiUrl}/api/disponiblebook`, {idLibro:idLibro, disponible:disponible});
  }

  listPrestamosEstudiante (idEstudiante):Observable<PrestamoLibro[]> {
    return this.http.post<PrestamoLibro[]>(`${this.apiUrl}/api/listprestamo`, {idEstudiante:idEstudiante});
  }

  cancelarPrestamo(idEstudiante, idLibro) {
    return this.http.post(`${this.apiUrl}/api/cancelarprestamo`, {idEstudiante:idEstudiante, idLibro:idLibro});
  }

  listarReservacionPendiente(): Observable<UsuarioLibPres[]> {
    return this.http.get<UsuarioLibPres[]>(`${this.apiUrl}/api/reservacionpendiente`);
  }

  
  aceptarReservacion(data) {
    return this.http.post(`${this.apiUrl}/api/aceptarreservacion`, data);
  }

  
  rechazarReservacion(data) {
    return this.http.post(`${this.apiUrl}/api/rechazarreservacion`, data);
  }

  
  listarLibrosDevueltosYNo(idBibliotecario):Observable<UsuarioLibPres[]> {
    return this.http.post<UsuarioLibPres[]>(`${this.apiUrl}/api/listarlibrosdevueltos`, {idBibliotecario:idBibliotecario});
  }

  
  devolverLibro(data) {
    return this.http.post(`${this.apiUrl}/api/devolverlibros`, data);
  }

  
  obtenerTodosLibros():Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/api/obtenertodoslibros`);
  }
  
  obtenerCategorias():Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/api/obtenercategorialibro`);
  }

  crearLibro(data) {
    return this.http.post(`${this.apiUrl}/api/crearlibro`, data);
  }

  obtenerLibroActualizar(idLibro):Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/api/actulizarlibro/${idLibro}`);
  }

  obtenerUsuarios():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/api/getusers`);
  }

  guardarUsuario(data) {
    return this.http.post(`${this.apiUrl}/api/adduser`, data);
  }

  obtenerRoles():Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.apiUrl}/api/getroles`);
  }

  obtenerCantidaReporte():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/getcantidadreport`);
  }

  obtenerCantidaCategoria():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/getcantcategoria`);
  }
  
  filterDataReserva(data):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/filterreserva`, data)
  }

}
