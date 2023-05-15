import { NextFunction, Request, Response } from "express";
import { CreateEmployeeData, CreateEmployee } from "../core/employee/useCase/createEmployee";
import { UpdateEmployee, UpdateEmployeeData } from "../core/employee/useCase/updateEmployee";
import { DeleteEmployee } from "../core/employee/useCase/deleteEmployee";
import { ListEmployees } from "../core/employee/useCase/listEmployees";
import { GetEmployee } from "../core/employee/useCase/getEmployee";
import { createSingleView } from "../view/employee/single";
import { createListView } from "../view/employee/list";
import { BasseCotroller } from "./baseController";

export class EmployeeCotroller extends BasseCotroller {
    constructor(
        private readonly createEmployee: CreateEmployee,
        private readonly updateEmployee: UpdateEmployee,
        private readonly deleteEmployee: DeleteEmployee,
        private readonly listEmployees: ListEmployees,
        private readonly getEmployee: GetEmployee
    ) { super(); }

    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const employee = await this.getEmployee.execute(req.params.id)
            const view = createSingleView(employee);
            res.status(200).send(view);
        } catch (err) {
            next(this.exceptionToError(err));
        }
    }

    async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const employee = await this.listEmployees.execute({ limit: Number(req.query.limit) })
            const view = createListView(employee);
            res.status(200).send(view);
        } catch (err) {
            next(this.exceptionToError(err));
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const employee = await this.createEmployee.execute(req.body as CreateEmployeeData);
            const view = createSingleView(employee);
            res.status(201).send(view);
        } catch (err) {
            next(this.exceptionToError(err));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.deleteEmployee.execute(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(this.exceptionToError(err));
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const employee = await this.updateEmployee.execute(req.params.id, req.body as UpdateEmployeeData);
            const view = createSingleView(employee);
            res.status(200).send(view);
        } catch (err) {
            next(this.exceptionToError(err));
        }
    }
}