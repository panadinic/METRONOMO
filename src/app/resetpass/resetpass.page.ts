import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage {
  email: string = '';

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}

  enviarCorreo() {
    // Aquí debes implementar la lógica para enviar un correo de restablecimiento de contraseña.
    // Puedes utilizar un servicio de envío de correo o cualquier otro método de tu backend.

    // Ejemplo de una notificación de éxito
    this.mostrarToast('Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.');
  }

  async mostrarToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000, // Duración del mensaje en milisegundos (5 segundos en este caso)
      position: 'top',
    });
    await toast.present();
  }
}
