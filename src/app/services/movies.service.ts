import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Genre, PeliculaDetalle, RespuestaCredits, RespuestaMDB, RespuestaVideos } from '../interfaces/interfaces';
import { Providers } from '../interfaces/providers.interface';

const URL    = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;

  generos: Genre[] = [];

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>( query: string, language: string = 'language=es' ) {


    query = URL + query;
    query += `&api_key=${ apiKey }&${ language }&include_image_language=es`;

    return this.http.get<T>( query );
  }

  getFeature() {

    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;
    
    if (mes < 10) {
      mesString = '0' + mes;
    }else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin    = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  getPopulares() {

    this.popularesPage ++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;

    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getPeliculaDetalle( id: number ) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula( id: number ) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  getProviders( id: number ) {
    return this.ejecutarQuery<Providers>(`/movie/${id}/watch/providers?a=1`)
  }

  getVideos( id: number ) {
    return this.ejecutarQuery<RespuestaVideos>(`/movie/${id}/videos?a=1`, 'language=en-US')
  }

  buscarPeliculas( query: string ) {
    return this.ejecutarQuery(`/search/movie?query=${ query }`)
  }

  cargarGeneros(): Promise<Genre[]> {

    return new Promise( resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`)
        .subscribe( resp => {
          this.generos = resp['genres'];
          console.log(this.generos);
          resolve(this.generos);
        })
    })

  }
}
