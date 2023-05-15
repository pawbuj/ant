import { Employee } from "../employee";
import { EmployeeFilter, EmployeeRepositoryInterface } from "../employeeRepositoryInterface";


export interface ListEmployeesData {
    limit: number;
}

export class ListEmployees {
    constructor(private readonly employeeRepo: EmployeeRepositoryInterface) { }

    async execute(data: ListEmployeesData): Promise<Employee[]> {
        return this.employeeRepo.findByFilter(data as EmployeeFilter);
    }
}