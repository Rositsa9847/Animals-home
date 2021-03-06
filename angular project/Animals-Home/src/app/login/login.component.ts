import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service'
import { NavbarService } from '../navigation/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title: string = "Login";

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    shelterCode: new FormControl('')
  });

  isInvalidLogin = false;
  constructor(private authService: AuthenticationService, private route: Router, private navigation: NavbarService) { }

  ngOnInit() {
    this.navigation.hide();
  }

  login() {
    var result = this.authService.login(this.loginForm.get("username").value,
      this.loginForm.get("password").value).then(redirectUrl => {
        if (redirectUrl === "/login" || redirectUrl === "" || redirectUrl === null) {
          this.isInvalidLogin = true;
        }
        this.route.navigateByUrl(redirectUrl);
      });
  }

}
