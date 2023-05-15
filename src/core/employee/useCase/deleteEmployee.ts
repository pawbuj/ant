import { Employee } from "../employee";
import { EmployeeRepositoryInterface } from "../employeeRepositoryInterface";

export class DeleteEmployee {
    constructor(private readonly employeeRepo: EmployeeRepositoryInterface) { }

    async execute(id: string): Promise<Employee> {

        const employee = await this.employeeRepo.findOneById(id);
        if (!employee) {
            throw new Error(id);
        }

        return this.employeeRepo.remove(employee);
    }
}