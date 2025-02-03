/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

// Data Transfer Object Schema for creating users is defined here
// NestJS documentation suggests the use of classes instead of interfaces for this as
// classes are preserved during transpilation since they are part of the ES6 standard
// whereas interfaces are removed and NestJS won't have access to them at runtime

// NestJS documentation suggests building separate create and update variations of the same type
// as the create variant may require all fields, where the update may make all fields optional.

// Create variant of DTO requiring all fields
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
        message: 'Valid role required'
    })
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
