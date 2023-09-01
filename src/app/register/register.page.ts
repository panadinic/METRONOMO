import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  usuario: string = '';
  contrasena: string = '';
  correo: string = '';

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}

  enviarRegistro() {
    // Validar campos del formulario (agrega tu lógica de validación aquí)
    console.log(this.correo);

    if (this.usuario.length >= 3 && this.contrasena.length >= 8) {
      // Aquí debes implementar la lógica para guardar el usuario y la contraseña
      // Puedes utilizar un servicio, almacenamiento local o enviar los datos a tu servidor.

      // Mostrar un mensaje de éxito
      this.mostrarToast('Registro exitoso');

      // Redirigir a la página de inicio de sesión u otra página necesaria
      this.navCtrl.navigateForward(['/login']);
    } else {
      // Mostrar un mensaje de error si los campos no cumplen con los requisitos
      this.mostrarToast('Verifica tus datos e intenta nuevamente');
    }
  }

  async mostrarToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}
