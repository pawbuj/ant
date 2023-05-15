import { Employee, EmployeeRole } from "../employee";
import { EmployeeRepositoryInterface } from "../employeeRepositoryInterface";

export interface CreateEmployeeData {
    firstName: string;
    lastName: string;
    firstDayAtWork: Date;
    role: EmployeeRole
}

export class CreateEmployee {
    constructor(private readonly employeeRepo: EmployeeRepositoryInterface) { }

    async execute(data: CreateEmployeeData): Promise<Employee> {
        const employee = new Employee();
        employee.firstName = data.firstName;
        employee.lastName = data.lastName;
        employee.firstDayAtWork = data.firstDayAtWork;
        employee.role = data.role;

        return this.employeeRepo.save(employee);
    }
}