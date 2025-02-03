/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from "@nestjs/common";   // Built-in NestJS Exception - 404 not found

@Injectable()   // The Injectable decorator attaches metadata to indicate that this class can be managed by Nest
export class UsersService {

    private users = [   // Dummy data for use with the API
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "role": "ENGINEER",
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "email": "Julianne.Oconner@kory.org",
            "role": "ENGINEER",
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "email": "Lucio_Hettinger@annie.ca",
            "role": "ADMIN",
        }
    ];

    // Typically the methods are named after the routes in the controller

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role);
            if (rolesArray.length === 0) {
                throw new NotFoundException("User Role Not Found");
            }
            return rolesArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    // Original syntax explicitly specifying user parameters
    // create(user: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    // Updated syntax using DTO schema
    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id) // this should yield an array of users sorted by highest id
        const newUser = {
            id: usersByHighestId[0].id + 1,
            // ...user
            ...createUserDto
        }
        this.users.push(newUser);
        return newUser;
    }

    // This corresponds to a PATCH route for updating a user. As such, all parameters are optional and defined as such with the ? operator
    // Original syntax
    // update(id: number, updatedUser: {name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    // Updated syntax using DTO
    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                // return {...user, ...updatedUser};
                return {...user, ...updateUserDto}; // this will spread in the user, then overwrite ONLY the updated property contained by updatedUser
            }
            return user;
        });

        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id != id);

        return removedUser;
    }

}
