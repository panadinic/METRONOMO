import { Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import {  NavController } from '@ionic/angular';


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

  constructor(private platform: Platform, private navCtrl: NavController ) {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
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
    // Implementa la lógica para aumentar el volumen
    if (this.volume < 100) {
      this.volume += 10;
    }
  }

  decreaseBPM() {
    // Implementa la lógica para disminuir el volumen
    if (this.volume > 0) {
      this.volume -= 10;
    }
  }

  onSliderChange(event: any) {
    const newValue = event.detail.value;
    this.sliderValue = newValue;
    // Puedes agregar lógica adicional aquí según sea necesario
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

  playClickSound() {
    console.log('Reproduciendo sonido...'); // Agrega un mensaje de depuración
    if (this.platform.is('cordova')) {
      const clickSound = new Audio('assets/BEAT.mp3'); // Asegúrate de que la ruta sea correcta
      clickSound.volume = this.volume / 100;
      clickSound.play();
    } else {
      this.clickSound.nativeElement.volume = this.volume / 100;
      this.clickSound.nativeElement.play();
    }
  }
  volver() {
    this.navCtrl.navigateBack(['/login']);
  }
}