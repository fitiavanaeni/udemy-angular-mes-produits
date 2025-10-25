import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  user = new User();
  //erreur: boolean = false;
  err: number = 0;
  message: string = 'login ou mot de passe erronés..';

  constructor(private authService: AuthService, private router: Router) {}

  /* onLoggedin() {
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser)
      this.router.navigate(['/']);
    else this.erreur = true;
  }

  */

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
        if (err.error.errorCause == 'disabled')
          this.message =
            'Utilisateur désactivé, Veuillez contacter votre Administrateur';
      },
    });
  }
}
