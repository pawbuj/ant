import { Employee } from "./employee";

export interface EmployeeFilter {
    limit: number;
}

export interface EmployeeRepositoryInterface {
    findOneById(id: string): Promise<Employee | null>;
    findByFilter(filter: EmployeeFilter): Promise<Employee[]>
    save(employee: Employee): Promise<Employee>
    remove(employee: Employee): Promise<Employee>
}