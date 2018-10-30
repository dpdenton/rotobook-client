// been a while since using typescript. Not really 100% best way to organise type / enums / interfaces

import {EmployeeAttribute, Entity} from "./enums";

export interface Employee {
    id: number
    name: string
    email: string
    message: string
}

export interface Entity {
    [Entity.Employee]: Employee
}

export interface Validator {
    isValid: (value: string) => boolean,
    message: string
}

export interface EntityAttributeValue<E,A,V> {
    entity: E
    attribute: A
    value: V
}

export interface FormPayload extends EntityAttributeValue<Entity, any, string>{}
export interface EmployeeFormPayload extends EntityAttributeValue<Entity.Employee, EmployeeAttribute, string>{}

export interface ActionWithPayload<P> {
    type: string,
    payload: P
}
