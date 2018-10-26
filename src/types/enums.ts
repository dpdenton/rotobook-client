export enum ApiEndpoints {
    baseUrl = 'http://127.0.0.1:8000/api/v1',
    applicants = '/applicants'
}

export enum PagePaths {
    EmployeeList = '/',
    EmployeeCreate = '/employee',
    EmployeeDetail = '/employee/:id',
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