import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {UserModel} from "../../../models/user.model";
import { Router} from "@angular/router";
import {getColor} from "../../../reducers/color/color.selector";
import {Store} from "@ngrx/store";
import {getUsers} from "../../../reducers/user/user.selectors";
import { addUser } from 'src/app/reducers/user/user.actions';
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  message = ''
  selectedColor = JSON.parse(localStorage.getItem('selectedColor'))

  formRegister = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              private ref: ChangeDetectorRef,
              private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(getColor).subscribe(color=>{
      this.selectedColor = color
    })
  }
newUser():UserModel{
    return {
    "name": this.formRegister.controls['login'].value,
    "email": this.formRegister.controls['email'].value,
    "password": this.formRegister.controls['password'].value
  }
}
  onSubmit(): void {
    const user = this.newUser()
      // this.authService.getUsers()
       this.store.select(getUsers)
      .subscribe((elm: UserModel[]) => {
        if (elm !== undefined) {
          // check if already is exist name
          const checkLogin = elm.filter((user: UserModel) => user.name === this.formRegister.controls['login'].value)
          if (checkLogin.length) {
            this.ref.markForCheck()
            this.message = "The name is already registered"
            setTimeout(() => {
              this.message = null
              this.ref.markForCheck()
            }, 1000)
            return
          } else {
            const cryptPassword = bcrypt.hashSync(this.formRegister.controls['password'].value, 10);

            this.authService.addUser({...user,password:cryptPassword}).subscribe((user: UserModel) => {

              this.store.dispatch(addUser({...user,password:user.password}))
              localStorage.setItem('login', user.id.toString())
              this.router.navigate(['/dashboard'])
            })
          }
        }
      })
  }
}
