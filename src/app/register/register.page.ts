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
  recontrasena: string = '';
  fechaNacimiento: string = '';
  correo: string = '';

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}

  enviarRegistro() {
    const fechaNacimientoDate = new Date(this.fechaNacimiento);
    const hoy = new Date();
    hoy.setDate(hoy.getDate() - 1);

    // Expresión regular para validar el correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Variables para almacenar mensajes de error
    let mensajeError = '';

    // Validar campos del formulario y almacenar mensajes de error
    if (this.usuario.length < 3) {
      mensajeError = 'El nombre de usuario debe tener al menos 3 caracteres.';
    } else if (this.contrasena.length < 8) {
      mensajeError = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (!emailPattern.test(this.correo)) {
      mensajeError = 'El correo electrónico no es válido.';
    } else if (this.fechaNacimiento === '' || fechaNacimientoDate > hoy) {
      mensajeError = 'La fecha de nacimiento no es válida.';
    } else if (this.contrasena !== this.recontrasena) {
      mensajeError = 'Las contraseñas no coinciden.';
    }

    if (mensajeError === '') {
      // Todos los campos son válidos, procede con el registro
      // Aquí debes implementar la lógica para guardar el usuario y la contraseña

      // Mostrar un mensaje de éxito
      this.mostrarToast('Registro exitoso');

      // Redirigir a la página de inicio de sesión u otra página necesaria
      this.navCtrl.navigateForward(['/login']);
    } else {
      // Mostrar un mensaje de error si los campos no cumplen con los requisitos
      this.mostrarToast(mensajeError);
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

