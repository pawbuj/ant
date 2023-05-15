import { Team } from "./team";

export interface TeamFilter {
    limit: number;
}

export interface TeamRepositoryInterface {
    findOneById(id: string): Promise<Team | null>;
    findByFilter(filter: TeamFilter): Promise<Team[]>
    save(team: Team): Promise<Team>
    remove(team: Team): Promise<Team>
}