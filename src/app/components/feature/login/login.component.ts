import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {UserModel} from "../../../models/user.model";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {getColor} from "../../../reducers/color/color.selector";
import {getUsers} from "../../../reducers/user/user.selectors";
import * as bcrypt from "bcryptjs";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  selectedColor:string[] = JSON.parse(localStorage.getItem('selectedColor'))

  showMessage:string = ''
  formLogin = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              private ref: ChangeDetectorRef,
              private store:Store) {

  }

  ngOnInit(): void {
    this.store.select(getColor).subscribe(color=>{
      this.selectedColor = color
    })
  }

    onSubmit() {
      // this.authService.getUsers()
        this.store.select(getUsers)
        .subscribe(  async (elm:UserModel[]) => {
            const checkUser = elm.find(item=>{
              return  item.name=== this.formLogin.controls['login'].value
            })
            if (!checkUser) {
              this.showMessage =  'Login or password isn\'t correct'
              this.ref.markForCheck()
              setTimeout(()=>{
                this.showMessage=''
                this.ref.markForCheck()
              },1000)
              return
            } else {
              const checkBCRT =  await bcrypt.compare(String(this.formLogin.controls['password'].value), String(checkUser.password))
              if (!checkBCRT) {
                this.showMessage = 'Password isn\'t correct'
                this.ref.markForCheck()
                setTimeout(() => {
                  this.showMessage = ''
                  this.ref.markForCheck()
                }, 1000)
                return
              } else {
                localStorage.setItem('login', checkUser.id.toString())
                this.router.navigate(['/dashboard'])
              }
            }
          }
        )

  }
}
