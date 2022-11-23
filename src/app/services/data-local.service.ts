
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';
 
 
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
 
  constructor(
    private storage: Storage,
    private toastCtrl: ToastController    
  ) {
    this.initDB();
    this.cargarFavoritos();
  }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });

    toast.present();
  }
  
  private _storage: Storage | null = null;
  movies: PeliculaDetalle[] = [];
 
  async initDB(){
    // If using, define drivers here: await this.storage.defineDriver(/.../);
    const storage = await this.storage.create();
    this._storage = storage;
  }
 
  saveMovie(movie: PeliculaDetalle){

    let existe = false;
    let mensaje = '';

    for (const peli of this.movies) {
      if (peli.id === movie.id) {
        existe = true
        break;
      }
    }

    if (existe) {
      this.movies = this.movies.filter( peli => peli.id !== movie.id );
      mensaje = 'Removido de favoritos'
    }else {
      this.movies.push(movie);
      mensaje = 'Agregada a favoritos'
    }
    this.presentToast(mensaje);
    this.storage.set('movies', this.movies);

    return !existe;
  }

  async cargarFavoritos () {
    const peliculas = await this.storage.get('movies');
    this.movies = peliculas || [];
    return this.movies;
  }

  async existePelicula( id ) { 

    await this.cargarFavoritos();
    const existe = this.movies.find( peli => peli.id === id );

    return (existe) ? true : false;
  }
}