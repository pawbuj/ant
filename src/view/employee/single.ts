import { Employee } from "../../core/employee/employee";

export function createSingleView(employee: Employee): singleEmployee {
    return {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName
    } as singleEmployee
}

interface singleEmployee {
    id: string;
    firstName: string;
    lastName: string;
}