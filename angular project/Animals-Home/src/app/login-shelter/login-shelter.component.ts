import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { NavbarService } from '../navigation/navbar.service';

@Component({
  selector: 'app-login-shelter',
  templateUrl: './login-shelter.component.html',
  styleUrls: ['./login-shelter.component.scss']
})
export class LoginShelterComponent implements OnInit {


  title: string = "Login";

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    shelterCode: new FormControl('')
  });

  isInvalidLogin = false;
  constructor(private authService: AuthenticationService, private navigation: NavbarService, private route: Router) { }

  ngOnInit() {
    this.navigation.hide();
  }

  loginShelter() {
    var result = this.authService.loginShelter(this.loginForm.get("username").value,
      this.loginForm.get("password").value, this.loginForm.get("shelterCode").value).then(redirectUrl => {
        if (redirectUrl === "/loginShelter" || redirectUrl === "" || redirectUrl === null) {
          this.isInvalidLogin = true;
        }
        this.route.navigateByUrl(redirectUrl);
      });
  }


}
