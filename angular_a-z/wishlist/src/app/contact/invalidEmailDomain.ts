// Custom validator
// Custom validators are at a high level just functions that check criteria you are trying to validate. Function name does not matter.
//      - They accept the control that what you are validating is bound to of type `AbstractControl`
//      - When finished, they return one of 2 values
//          1. An object of type `ValidationErrors` (if the value of the control is not valid, this is what you return) which specifies the type of error that occured
//          2. null (if value of the control passes validation, this is what gets returned) - A little strange, but if the value is considered valid, you return null

// As an illustrative exercise, we are going to create a custom validator that prevents email addresses coming from certain domains

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


// Refactored to use a function that returns a VALIDATOR FUNCTION instead of just validating and returning either an error or null
// This is useful because it it is dynamic and allows for the creation of a validator function programatically
export function createInvalidDomainValidator(hosts: string[]) : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        const value = control.value?.toLowerCase();

        if(!value) {
            return null;
        }

        const matches = hosts.some(host => value.indexOf(`@${host}`) > -1);

        return matches ? { invalidEmailDomain : true } : null;
    }
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Original code to create a specific validator. This had hard coded hosts within it, exercise wants to show how to programatically create a validator
// based upon an input using a function in the component.
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// export function invalidEmailDomain(control: AbstractControl) : ValidationErrors | null {
//     // Remember the ?. notation here - if it has a value, it will convert it to lower case, otherwise it will assign `null` to `value`
//     const value = control.value?.toLowerCase();

//     const hosts = ['gmail.com', 'yahoo.com'];

//     // Note- this may seem strange, that if we don't have a value we return null indicating that the control passess validation,
//     //       however, this is true- it does pass validation, because it does not contain the hostnames we are trying to validate for WITH THIS SPECIFIC VALIDATOR
//     if(!value) {
//         return null;
//     }

//     // use the .some method on the `hosts` array to check if the value is found within any of the elements contained in the array
//     const matches = hosts.some(host => value.indexOf(`@${host}`) > -1);

//     // If there are any matches, return an object that has a property called `invalidEmailDomain`, else return `null`
//     // NOTE: the `invalidEmailDomain` can to a degree be arbitrary, however it is the error name itself and has implications
//     //       in the .hasError checks in the tempalte as this is the name that must be provided
//     return matches ? { invalidEmailDomain : true } : null;
// }
