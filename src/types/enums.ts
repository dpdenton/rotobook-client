export enum ApiEndpoint {
    baseUrl = 'https://rotobook.herokuapp.com/api/v1',
    employee = '/employees'
}

export enum PagePaths {
    EmployeeList = '/',
    EmployeeCreate = '/add',
    EmployeeDetail = '/:id',
}

export enum Entity {
    Employee = 'employee',
}

export enum EmployeeAttribute {
    Id = 'id',
    Name = 'name',
    Email = 'email',
    Message = 'message'
}