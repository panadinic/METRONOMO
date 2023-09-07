import { Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  sliderValue: number = 20;
  tempoVariation: number = 50;
  volume: number = 50;
  metric: string = '4/4';
  metronomeOn: boolean = false;
  isMuted: boolean = false;

  username: string = '';
  @ViewChild('clickSound') clickSound: any;

  private interval: any;
  private isPlaying: boolean = false;

    // Declaración de las opciones de sonido y el sonido seleccionado
    soundOptions: any[] = [
      { name: 'Clasic', path: 'assets/CLASIC_BEAT.mp3' },
      { name: 'Cubase_High', path: 'assets/CUBASE_HIGH2.mp3' },
      { name: 'Cubase_Low', path: 'assets/CUBASE_LOW2.mp3' },
      // Agrega más opciones de sonido según sea necesario
    ];

    selectedSound: any = this.soundOptions[0];

    constructor(private platform: Platform, private router: Router, private route: ActivatedRoute, private navCtrl: NavController ){

    this.route.params.subscribe(params => {
      this.username = params['username'];
    });

    this.sliderValue = 40;

  }

  toggleMute() {
    this.isMuted = !this.isMuted;
  
    if (this.isMuted) {
      this.muteSound();
    } else {
      this.unmuteSound();
    }
  }
  
  private muteSound() {
    // Pausar o silenciar el sonido según tu lógica específica
    // Ejemplo para un elemento de audio HTML:
    this.clickSound.nativeElement.muted = true;
  }
  
  private unmuteSound() {
    // Reanudar o restablecer el sonido según tu lógica específica
    // Ejemplo para un elemento de audio HTML:
    this.clickSound.nativeElement.muted = false;
  }



  increaseBPM() {
    // Implementa la lógica para aumentar el valor del ritmo (bpm)
    if (this.sliderValue < 300) { // Por ejemplo, puedes definir un valor máximo (300 en este caso)
      this.sliderValue += 10; // Aumenta el valor del ritmo en 10 unidades
    }
  }

  decreaseBPM() {
    // Implementa la lógica para disminuir el valor del ritmo (bpm)
    if (this.sliderValue > 10) { // Por ejemplo, puedes definir un valor mínimo (10 en este caso)
      this.sliderValue -= 10; // Disminuye el valor del ritmo en 10 unidades
    }
  }

  // onSliderChange(event: any) {
  //   const newValue = event.detail.value;
  //   this.sliderValue = newValue;
  //   // Puedes agregar lógica adicional aquí según sea necesario
  // }

  onSliderChange(event: any) {
    const newValue = event.detail.value;

    if (newValue < 40) {
      this.sliderValue = 40;
    } else if (newValue > 300) {
      this.sliderValue = 300;
    } else {
      this.sliderValue = newValue;
    }

    // Luego, aquí puedes agregar cualquier lógica adicional que necesites en función del valor actual del slider.
  }

  toggleMetronome() {
    this.metronomeOn = !this.metronomeOn;

    if (this.metronomeOn) {
      this.startMetronome();
    } else {
      this.stopMetronome();
    }
  }
  startMetronome() {
     if (this.isPlaying) return;

    this.stopMetronome();

    const bpm = this.sliderValue;
    const intervalMs = (60 / bpm) * 1000;

    this.interval = setInterval(() => {
      if (this.metronomeOn) {
        this.playClickSound();
      }
    }, intervalMs);

    this.isPlaying = true;
  }

  stopMetronome() {
    if (this.interval) {
      clearInterval(this.interval);
      this.isPlaying = false;
    }
  }

  // playClickSound() {
  //   console.log('Reproduciendo sonido...'); // Agrega un mensaje de depuración
  //   if (this.platform.is('cordova')) {
  //     const clickSound = new Audio('assets/BEAT.mp3'); // Asegúrate de que la ruta sea correcta
  //     clickSound.volume = this.volume / 100;
  //     clickSound.play();
  //   } else {
  //     this.clickSound.nativeElement.volume = this.volume / 100;
  //     this.clickSound.nativeElement.play();
  //   }
  // }

  playClickSound() {
    console.log('Reproduciendo sonido...');

    if (this.platform.is('cordova')) {
      const clickSound = new Audio(this.selectedSound.path); // Utiliza el sonido seleccionado
      clickSound.volume = this.volume / 100;
      clickSound.play();
    } else {
      this.clickSound.nativeElement.src = this.selectedSound.path; // Utiliza el sonido seleccionado
      this.clickSound.nativeElement.volume = this.volume / 100;
      this.clickSound.nativeElement.play();
    }
  }

  volver() {
    this.router.navigate(['/login']);
  }
}
