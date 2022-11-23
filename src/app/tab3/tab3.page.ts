import { Component } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  peliculasPorGenero: any[] = [];

  constructor( private dataLocal: DataLocalService,
               private moviesService: MoviesService ) {}

  
  // CADA VEZ QUE SE INGRESA
  ionViewWillEnter() {
    this.cargarDatos();
  }
  
  async cargarDatos() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();
  
    this.pelisPorGenero( this.generos, this.peliculas );
  }

  loadFavoritosBack() {
    this.peliculasPorGenero = []
    this.cargarDatos()
  }

  pelisPorGenero( generos: Genre[], peliculas: PeliculaDetalle[] ) {
    console.log(generos, peliculas);

    generos.forEach( (genero) => {
      this.peliculasPorGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres.find( genre => genre.id === genero.id );
        })
      });
    });

    console.log(this.peliculasPorGenero);

   
  //   SOLUCION MIA
  //   generos.forEach( (genero) => {
  //     let peliculasAAgregar = [];

  //     peliculas.forEach( (pelicula) =>  {
  //       pelicula.genres.forEach( (generoDePelicula)  => {
  //         if (generoDePelicula.id === genero.id) {
  //           peliculasAAgregar = [...peliculasAAgregar, pelicula];          
  //         }
  //       })
  //       console.log(peliculasAAgregar);
  //     })
  //     this.peliculasPorGenero.push({genero, peliculasAAgregar});
  //   })
  //   console.log(this.peliculasPorGenero)
  // }
  }
}
