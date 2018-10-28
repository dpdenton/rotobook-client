// been a while since using typescript. Not really 100% best way to organise type / enums / interfaces

import {Entities} from "./enums";

export interface Employee {
    id: number
    name: string
    email: string
    message: string
}

export interface Entity {
    [Entities.Employee]: Employee
}

export interface Validator {
    isValid: (value: string) => boolean,
    message: string
}