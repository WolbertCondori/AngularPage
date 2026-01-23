import {Component, signal} from '@angular/core';
import {Moneda} from "../moneda/moneda";
import {Login} from "../login/login";

@Component({
  selector: 'app-header',
    imports: [
        Moneda,
        Login
    ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
    openMoneda = signal<boolean>(false);
    openLogin = signal<boolean>(false);
    toggleMoneda (){
        this.openMoneda.update(state=>!state)
    }
    toggleLogin(){
        this.openLogin.update(state=>!state);
        //this.openLogin.set(!this.openLogin())
    }
}
