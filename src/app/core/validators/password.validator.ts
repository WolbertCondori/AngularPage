import {AbstractControl,ValidationErrors} from "@angular/forms";

export function checkPasswordValidator(control:AbstractControl):ValidationErrors|null {
    const value:string = control.value;
    if(!value){
        return null;
    }

    /*
    *
    */
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-z\d]$/i.test(value);
    return regex?null:{customPassword:true}


}



