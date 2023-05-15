import express, { NextFunction, Request, Response } from "express";
import { CreateTeam } from "./core/team/useCase/createTeam";
import { TeamRepository } from "./repository/teamRepository";
import { TeamCotroller } from "./controller/teamController";
import typeorm from "./config/typeorm";
import openAPIValidator from "./config/openAPIValidator";
import bodyParser from "body-parser";
import { UpdateTeam } from "./core/team/useCase/updateTeam";
import { ListTeams } from "./core/team/useCase/listTeams";
import { DeleteTeam } from "./core/team/useCase/deleteTeam";
import { GetTeam } from "./core/team/useCase/getTeam";
import { EmployeeRepository } from "./repository/employeeRepository";
import { CreateEmployee } from "./core/employee/useCase/createEmployee";
import { EmployeeCotroller } from "./controller/employeeController";
import { UpdateEmployee } from "./core/employee/useCase/updateEmployee";
import { ListEmployees } from "./core/employee/useCase/listEmployees";
import { DeleteEmployee } from "./core/employee/useCase/deleteEmployee";
import { GetEmployee } from "./core/employee/useCase/getEmployee";


typeorm.initialize()
const teamRepo = new TeamRepository(typeorm);
const createTeam = new CreateTeam(teamRepo);
const updateTeam = new UpdateTeam(teamRepo);
const listTeams = new ListTeams(teamRepo);
const deleteTeam = new DeleteTeam(teamRepo);
const getTeam = new GetTeam(teamRepo);
const teamController = new TeamCotroller(createTeam, updateTeam, deleteTeam, listTeams, getTeam);
const employeeRepo = new EmployeeRepository(typeorm);
const createEmployee = new CreateEmployee(employeeRepo);
const updateEmployee = new UpdateEmployee(employeeRepo);
const listEmployees = new ListEmployees(employeeRepo);
const deleteEmployee = new DeleteEmployee(employeeRepo);
const getEmployee = new GetEmployee(employeeRepo);
const employeeController = new EmployeeCotroller(createEmployee, updateEmployee, deleteEmployee, listEmployees, getEmployee);

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(openAPIValidator);

app.get("/teams", async (req: Request, res: Response, next: NextFunction) => teamController.list(req, res, next));
app.post("/teams", async (req: Request, res: Response, next: NextFunction) => teamController.create(req, res, next));
app.get("/teams/:id", async (req: Request, res: Response, next: NextFunction) => teamController.get(req, res, next));
app.delete("/teams/:id", async (req: Request, res: Response, next: NextFunction) => teamController.delete(req, res, next));
app.patch("/teams/:id", async (req: Request, res: Response, next: NextFunction) => teamController.update(req, res, next));
app.post("/teams/:id/members", async (req: Request, res: Response, next: NextFunction) => teamController.delete(req, res, next));
app.delete("/teams/:id/members/:mid", async (req: Request, res: Response, next: NextFunction) => teamController.delete(req, res, next));
app.get("/employees", async (req: Request, res: Response, next: NextFunction) => employeeController.list(req, res, next));
app.post("/employees", async (req: Request, res: Response, next: NextFunction) => employeeController.create(req, res, next));
app.get("/employees/:id", async (req: Request, res: Response, next: NextFunction) => employeeController.get(req, res, next));
app.delete("/employees/:id", async (req: Request, res: Response, next: NextFunction) => employeeController.delete(req, res, next));
app.patch("/employess/:id", async (req: Request, res: Response, next: NextFunction) => employeeController.update(req, res, next));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});