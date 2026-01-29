import {AbstractControl, ValidationErrors} from "@angular/forms";

export function EdadValidator(min:number=18,max:number=65){
    return(control:AbstractControl):ValidationErrors|null => {
        const value= Number(control.value);
        if(!value){
            return null;
        }
        if(isNaN(value)){
            return {valueError:true}
        }
        if(value<min||value>max){
            return {edadError:true}
        }
        return null;
    }
}


export function validarEdad(edad:AbstractControl):ValidationErrors|null {
    const value= Number(edad.value);
    if(!value){
        return null;
    }
    if(isNaN(value)){
        return {valueError:true}
    }
    if(value<18||value>65){
        return {edadError:true}
    }
    return null;
}