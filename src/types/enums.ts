export enum ApiEndpoints {
    baseUrl = 'https://rotobook.herokuapp.com/api/v1',
    applicants = '/employees'
}

export enum PagePaths {
    EmployeeList = '/',
    EmployeeCreate = '/add',
    EmployeeDetail = '/:id',
}

export enum Entities {
    Employee = 'employee',
}

export enum EmployeeAttributes {
    Id = 'id',
    Name = 'name',
    Email = 'email',
    Message = 'message'
}