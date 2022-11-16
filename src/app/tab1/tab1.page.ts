import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

// import Swiper core and required modules
import SwiperCore, { SwiperOptions, FreeMode } from 'swiper';

SwiperCore.use([FreeMode]);




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];


  constructor( private moviesService: MoviesService ) {}
  
  ngOnInit(): void {
    this.moviesService.getFeature()
      .subscribe( resp => {
        this.peliculasRecientes = resp.results;
      })
  
    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    console.log('getPop')
    this.moviesService.getPopulares()
      .subscribe( resp => {
        const arrTemp = [...this.populares, ...resp.results];
        
        this.populares = arrTemp;
      })
  }
}
