import { Employee } from "../../core/employee/employee";


export function createListView(employees: Employee[]): EmployeeListItem[] {
    const views = [];
    for (const employee of employees) {
        views.push({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName
        } as EmployeeListItem);
    }

    return views
}

export interface EmployeeListItem {
    id: string;
    firstName: string;
    lastName: string;
}