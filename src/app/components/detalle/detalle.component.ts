import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Cast, PeliculaDetalle, RespuestaVideos } from '../../interfaces/interfaces';
import { Data } from '../../interfaces/providers.interface';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataLocalService } from 'src/app/services/data-local.service';







@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  videoUrls: SafeResourceUrl [] = [];
  data: SafeResourceUrl[] = [];

  topLimit: number = 2;

  @ViewChild( IonInfiniteScroll ) infiniteScroll: IonInfiniteScroll;



  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  providers: Data[];
  videos: RespuestaVideos;
  oculto = 150;
  estrella = 'star-outline';

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController,
               private _sanitizer: DomSanitizer,
               private dataLocal: DataLocalService
 ) { }

  async ngOnInit() {
    // console.log('ID', this.id)

    this.dataLocal.existePelicula( this.id )
      .then( existe => this.estrella = ( existe ) ? 'star' : 'star-outline' );

    this.moviesService.getPeliculaDetalle( this.id )
      .subscribe(resp => {
        this.pelicula = resp;
      })

      this.moviesService.getActoresPelicula( this.id )
      .subscribe(resp => {
        this.actores = resp.cast;
      })

      this.moviesService.getProviders( this.id )
        .subscribe( resp => {
          this.providers = resp.results?.AR?.flatrate;
      })

      this.moviesService.getVideos( this.id )
        .subscribe( resp => {
          this.videos = resp;
          this.videos.results.forEach((video) => {
            const newVideo = this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.key}`)
            this.videoUrls.push(newVideo);
          })

          this.data = this.videoUrls.slice(0, this.topLimit);
      })


  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    const existe = this.dataLocal.saveMovie(this.pelicula);
    this.estrella = ( existe ) ? 'star' : 'star-outline';

  }

  loadData(e) {
    setTimeout(() => {
      this.topLimit += 2;
      this.data = this.videoUrls.slice(0, this.topLimit)

      this.infiniteScroll.complete();

      if (this.data.length === this.videoUrls.length) {
        this.infiniteScroll.disabled = true;
      }
    }, 1500);
  }



}
