import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private toastCtrl: ToastController
  ) {}



  login() {
    // Expresión regular para validar la contraseña
    const passwordPattern = /^(?=.*\d{4})(?=.*[a-zA-Z]{3})(?=.*[A-Z]).{8,}$/;

    if (this.username.length >= 3 && this.username.length <= 8) {
      if (passwordPattern.test(this.password)) {

        this.router.navigate(['/home', { username: this.username }]);
      } else {
        this.showToast('La contraseña debe cumplir con los requisitos.');
      }
    } else {
      this.showToast('El nombre de usuario debe tener entre 3 y 8 caracteres.');
    }
  }


  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  crearCuenta() {
    // Mostrar un mensaje cuando se hace clic en el botón "Crea tu cuenta gratis"
    this.showToast('Crea tu cuenta gratis ahora');

    // Redirigir a la página de registro
    this.router.navigate(['/register']); // Asegúrate de que '/registro' sea la ruta correcta
  }

  olvidasteContrasena() {
    // Implementa la lógica para el restablecimiento de contraseña aquí
    // Por ejemplo, puedes abrir un modal o navegar a una página de restablecimiento de contraseña.
    // Ejemplo:
    this.navCtrl.navigateForward(['/resetpass']); // Asegúrate de que '/reset-password' sea la ruta correcta
  }
}
