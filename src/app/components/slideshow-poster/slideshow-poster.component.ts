import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';


@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  @Input() peliculas: Pelicula[] | PeliculaDetalle [] = [];
  @Output() load =  new EventEmitter();

    slideOpts = {
    slidesPerView: 3.4,
    spaceBetween: 0,
    freeMode: true,
  }

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  async verDetalle( id:number ) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.onWillDismiss().then( data => {
      this.load.emit();
    })
    
    modal.present();
  }


}
