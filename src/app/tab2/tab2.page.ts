import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar: string = '';

  ideas: string[] = ['Spiderman', 'Avenger', ' El señor de los anillos', 'La vida es bella'];

  constructor() {}

  buscar( event ) {
    console.log(event.detail.value)
    const valor = event.detail.value;

  }


}
