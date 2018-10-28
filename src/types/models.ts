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