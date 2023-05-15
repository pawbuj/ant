import { NextFunction, Request, Response } from "express";
import { CreateTeam, CreateTeamData } from "../core/team/useCase/createTeam";
import { createListView } from "../view/team/list";
import { createSingleView } from "../view/team/single";
import { UpdateTeam, UpdateTeamData } from "../core/team/useCase/updateTeam";
import { DeleteTeam } from "../core/team/useCase/deleteTeam";
import { ListTeams } from "../core/team/useCase/listTeams";
import { GetTeam } from "../core/team/useCase/getTeam";
import { BasseCotroller } from "./baseController";

export class TeamCotroller extends BasseCotroller {
    constructor(
        private readonly createTeam: CreateTeam,
        private readonly updateTeam: UpdateTeam,
        private readonly deleteTeam: DeleteTeam,
        private readonly listTeams: ListTeams,
        private readonly getTeam: GetTeam
    ) { super(); }

    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const team = await this.getTeam.execute(req.params.id)
            const view = createSingleView(team);
            res.status(200).send(view);
        } catch (err) {
            next(this.exceptionToError(err));
        }
    }

    async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const teams = await this.listTeams.execute({ limit: Number(req.query.limit) })
            const view = createListView(teams);
            res.status(200).send(view);
        } catch (err) {
            next(this.exceptionToError(err));
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const team = await this.createTeam.execute(req.body as CreateTeamData);
            const view = createSingleView(team);
            res.status(201).send(view);
        } catch (err) {
            next(this.exceptionToError(err));
        }

    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.deleteTeam.execute(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(this.exceptionToError(err));
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const team = await this.updateTeam.execute(req.params.id, req.body as UpdateTeamData);
            const view = createSingleView(team);
            res.status(200).send(view);
        } catch (err) {
            next(this.exceptionToError(err));
        }
    }
} 