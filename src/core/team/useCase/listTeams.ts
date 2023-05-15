import { Team } from "../team";
import { TeamFilter, TeamRepositoryInterface } from "../teamRepositoryInterface";

export interface ListTeamsData {
    limit: number;
}

export class ListTeams {
    constructor(private readonly teamRepo: TeamRepositoryInterface) {}

    async execute(data:  ListTeamsData): Promise<Team[]> {
        return this.teamRepo.findByFilter(data as TeamFilter);
    }
}