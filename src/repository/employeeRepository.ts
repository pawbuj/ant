import { DataSource, Repository } from 'typeorm';
import { Employee } from '../core/employee/employee';
import { EmployeeFilter, EmployeeRepositoryInterface } from '../core/employee/employeeRepositoryInterface';


export class EmployeeRepository extends Repository<Employee> implements EmployeeRepositoryInterface {
    constructor(private dataSource: DataSource) {
        const repo = dataSource.manager.getRepository(Employee);
        super(Employee, repo.manager, repo.queryRunner);
    }

    async findByFilter(filter: EmployeeFilter): Promise<Employee[]> {
        return this.find({
            take: filter.limit
        });
    }

} 