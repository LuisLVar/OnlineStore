import { Component, OnInit } from '@angular/core';
import { PortadasService } from 'src/app/services/portadas.service';
import { Router } from '@angular/router';
import { Portada } from 'src/app/models/Portada';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  portada: Portada = {
    nombre: '',
    slogan: '',
    imagen: '',
    mision: '',
    vision: '',
    about: '',
    video: ''
};

  constructor(private portadaService: PortadasService , private router: Router) { }

  ngOnInit() {
    this.portadaService.getPortada().subscribe(
      res => {
        console.log(res);
        console.log('Si toma el dato');
        const objeto: any = res[0];
        this.portada = {
          nombre: objeto.NOMBRE,
          slogan: objeto.SLOGAN,
          imagen: objeto.IMAGEN,
          mision: objeto.MISION,
          vision: objeto.VISION,
          about: objeto.ABOUT,
          video: objeto.VIDEO
        }
        console.log(this.portada);
      },
      err=> console.log(err)
    );
  }

}
