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

  // enviarRegistro() {
  //   const fechaNacimientoDate = new Date(this.fechaNacimiento);
  //   const hoy = new Date();
  //   hoy.setDate(hoy.getDate() - 1);
  //   // Validar campos del formulario (agrega tu lógica de validación aquí)
  //   console.log(this.correo);

  //   if (this.usuario.length >= 3 && this.contrasena.length >= 8 && fechaNacimientoDate <= hoy && this.contrasena === this.recontrasena) {
  //     // Aquí debes implementar la lógica para guardar el usuario y la contraseña
  //     // Puedes utilizar un servicio, almacenamiento local o enviar los datos a tu servidor.

  //     // Mostrar un mensaje de éxito
  //     this.mostrarToast('Registro exitoso');

  //     // Redirigir a la página de inicio de sesión u otra página necesaria
  //     this.navCtrl.navigateForward(['/login']);
  //   } else {
  //     // Mostrar un mensaje de error si los campos no cumplen con los requisitos
  //     this.mostrarToast('Verifica tus datos e intenta nuevamente');
  //   }
  // }

  enviarRegistro() {
    const fechaNacimientoDate = new Date(this.fechaNacimiento);
    const hoy = new Date();
    hoy.setDate(hoy.getDate() - 1);

    // Variables para almacenar mensajes de error
    let mensajeError = '';

    // Expresión regular para validar la contraseña
    const passwordPattern = /^(?=.*\d{4})(?=.*[a-zA-Z]{3})(?=.*[A-Z]).{8,}$/;

    // Validar campos del formulario y almacenar mensajes de error
    if (this.usuario.length < 3) {
      mensajeError = 'El nombre de usuario debe tener al menos 3 caracteres.';
    } else if (!passwordPattern.test(this.contrasena)) {
      mensajeError = 'La contraseña debe tener al menos 4 números, 3 caracteres y 1 mayúscula.';
    } else if (fechaNacimientoDate > hoy) {
      mensajeError = 'La fecha de nacimiento debe ser anterior o igual a la fecha de hoy.';
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
      // Mostrar un mensaje de error con el detalle del problema
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
