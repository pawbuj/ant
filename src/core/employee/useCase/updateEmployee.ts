import { Employee } from "../employee";
import { EmployeeRepositoryInterface } from "../employeeRepositoryInterface";


export interface UpdateEmployeeData {
    firstName?: string;
    lastName?: string;
}

export class UpdateEmployee {
    constructor(private readonly employeeRepo: EmployeeRepositoryInterface) { }

    async execute(id: string, data: UpdateEmployeeData): Promise<Employee> {

        const employee = await this.employeeRepo.findOneById(id);
        if (!employee) {
            throw new Error(id);
        }

        if (data.firstName) {
            employee.firstName = data.firstName;
        }

        return await this.employeeRepo.save(employee);
    }
}