/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // this controller handles the parent /users route
export class UsersController {

    // Dependency injection handled through the constructor
    // Don't need to use the 'new UsersService()' syntax, NestJS will create a new instance,
    // although if there has already been one instantiated, it will use that one
    constructor (private readonly usersService: UsersService) {}

    // REMEMBER - ROUTE ORDERING HERE MATTERS!
    // If another route (e.g. the interns route) was added after GET /users/:id (even if a staic routes),
    // it would never resolve because /users/:id would accept the param first...

    @Get() // GET /users or /users?role=value&age=value (query parameter handling)
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') // Note: Query parameter(s) on this route are OPTIONAL, with specified allowable values -
    {                                                              //       as defined by the ? operator on 'role'
        return this.usersService.findAll(role);  // call the injected service findAll method
    }

    // This would need to go ABOVE the /users/:id route for it to work
    // @Get('interns') // GET /users/interns
    // findAllInterns() {
    //     return ['interns'];
    // }


    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {  // Using the ParseIntPipe middleware provided by NestJS. Originally, id was string type (all params start as string)
        // NOTE: findeOne expects a number as an argument, could use Number constructor or parseInt,
        //       HOWEVER, going to use a Unary operator (as indicated by the '+' - e.g. +id).
        //       NOTE: The unary operator has been removed as now using the ParseIntPipe middleware from NestJS
        return this.usersService.findOne(id);
    }

    // Original syntax explicitly specifying user data type in the parameter for the function
    // @Post() // POST /users
    // create(@Body() user: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    //     return this.usersService.create(user);
    // }

    // Syntax using the CreateUserDto DTO schema
    @Post() // POST /users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    // Original syntax explicitly specifying user data type with optional parameters for the function
    // @Patch(':id') // PATCH /users/:id
    // update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: {name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    //     return this.usersService.update(id, userUpdate);  // Unary operator no longer used - instead, using the NestJS built-in ParseIntPipe middleware
    // }

    // Syntax using the UpdateUserDto DTO schema
    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);  // Unary operator no longer used - instead, using the NestJS built-in ParseIntPipe middleware
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }

}
