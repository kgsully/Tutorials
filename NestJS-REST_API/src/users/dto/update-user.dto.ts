/* eslint-disable prettier/prettier */
import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";

// NOTE: No class validators are required here, as this is extended from the CreateUserDto class which already has the validator decorators implemeneted!

// Data Transfer Object Schema for creating users is defined here
// NestJS documentation suggests the use of classes instead of interfaces for this as
// classes are preserved during transpilation since they are part of the ES6 standard
// whereas interfaces are removed and NestJS won't have access to them at runtime

// NestJS documentation suggests building separate create and update variations of the same type
// as the create variant may require all fields, where the update may make all fields optional.

// NestJS provides the PartialType() utility function to make the task of creating a DTO variant
// where all fields may be optional easier and minimize boilerplate code.
// The PartialType() function returns a type (class) with all properties of the input type set to optional.

// Update variant of DTO with all fields optional
// NOTE: Disabled no-unsafe-call as this line DIRECTLY references the syntax in the NestJS documentation for using PartialType()
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateUserDto extends PartialType(CreateUserDto) {}
