import {Component, OnInit, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {CiudadesService} from "../../../../core/services/ciudades/ciudades.service";
import {AuthService} from "../../../../core/services/usuarios/auth.service";
import {AuthCookieService} from "../../../../core/services/cookies/auth-cookie.service";
import {SessionStorageService} from "../../../../core/services/sessions/session-storage.service";

type DatosDeEnvio={
    email?: string,
    telefono?: string,
    password: string,
}

@Component({
  selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        NgClass
    ],
  templateUrl: './login.html',
  styleUrl: './login.scss',standalone:true
})
export class Login implements OnInit{
    closeLoginDesdeHeader=output();
    formLogin:FormGroup;
    formRegister:FormGroup;
    esCorreo:Boolean=true;
    esLogin:Boolean=true;

    constructor(
        private formBuilder :FormBuilder,
        private ciudadesService:CiudadesService,
        private authService:AuthService,
        private authCookieService : AuthCookieService,
        private sessionStorageService:SessionStorageService,
        ) {
        this.formLogin=this.formBuilder.group({
            "email":["",[Validators.email,Validators.minLength(5)]],
            "telefono":["",[Validators.maxLength(11)]],
            "password":["",[Validators.required,Validators.minLength(6)]],
        })
        this.formRegister=this.formBuilder.group({
            "email":["",[Validators.required]],
            "telefono":["",[Validators.required]],
            "password1":["",[Validators.required]],
            "password2":["",[Validators.required]],
            "nombre":["",[Validators.required]],
            "apellidos":["",[Validators.required]],
            "edad":["",[Validators.required]],
            "ciudad":["",[Validators.required]],
            "pais":["",[Validators.required]],
            "direccion":["",[Validators.required]],
        })
    }
    ciudades:{nombre:string,slug:string}[]=[]
    ngOnInit(): void {
        this.ciudadesService.getCiudades().subscribe({
            next:(data)=>{
                this.ciudades = data.data;
            },
            error:(err) => {
                console.log(err);
            },
            complete:()=>{
            }
        })
    }

    iniciarSesion(){
        if (this.formLogin.invalid) {
            alert("Formulario no válido");
            return;
        }
        if(this.formLogin.value.email === "" && this.formLogin.value.telefono===""){
            alert("Falta ingresar un usuario")
            return;
        }

        const datosParaEnviar:DatosDeEnvio ={
            email:this.formLogin.value.email,
            telefono:this.formLogin.value.telefono,
            password:this.formLogin.value.password
        }
        this.authService.login(datosParaEnviar).subscribe({
            next:(data)=>{
                console.log(data)
                this.authCookieService.set("tienda_online_token", data.data.token)
                this.authCookieService.set("tienda_online_refresh_token", data.data.refresh_token)

                const datos:any={
                    email:data.data.email,
                    nombre:data.data.nombre,
                    telefono:data.data.telefono,
                    role:data.data.rol
                }
                this.sessionStorageService.set("tienda_online_datos",datos)
            },
            error:(err) => {
                console.log(err)
            }
        })
    }
    registrar(){
        if(this.formRegister.invalid){
            alert("formulario no valido r")
            return;
        }
        this.authService.registro(this.formRegister.value).subscribe({
            next:(data)=>{
                console.log(data);
            },
            error:(err) => {
                console.log(err)
            }
        })
    }

    cambiarSesion(value:Boolean){
        this.esCorreo=value;
        if (!this.esCorreo) {
            this.formRegister.patchValue({"email": ""})
        }else {
            this.formRegister.patchValue({"telefono": ""})
        }
    }
    cambiarLogin(value:Boolean){
        this.esLogin=value;
    }
}
