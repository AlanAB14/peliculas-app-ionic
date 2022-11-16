import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Cast, PeliculaDetalle, RespuestaVideos } from '../../interfaces/interfaces';
import { Data } from '../../interfaces/providers.interface';
import { ModalController } from '@ionic/angular';

import { YoutubeVideoPlayer } from '@awesome-cordova-plugins/youtube-video-player/ngx';




@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  providers: Data[];
  videos: RespuestaVideos;
  oculto = 150;

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController,
               private youtube: YoutubeVideoPlayer
 ) { }

  ngOnInit() {
    // console.log('ID', this.id)
    this.moviesService.getPeliculaDetalle( this.id )
      .subscribe(resp => {
        console.log(resp)
        this.pelicula = resp;
      })

      this.moviesService.getActoresPelicula( this.id )
      .subscribe(resp => {
        console.log(resp);
        this.actores = resp.cast;
      })

      this.moviesService.getProviders( this.id )
        .subscribe( resp => {
          this.providers = resp.results?.AR?.flatrate;
          console.log(this.providers)
      })

      this.moviesService.getVideos( this.id )
        .subscribe( resp => {
          this.videos = resp;
          console.log(this.videos)
      })

      // this.youtube.openVideo('myvideoid');
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  goToVideo( key: string ) {
    this.youtube.openVideo(key)
  }

}
