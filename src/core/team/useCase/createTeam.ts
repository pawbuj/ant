import { exit } from "process";
import { TeamNameException } from "../exception/teamNameException";
import { Team } from "../team";
import { TeamRepositoryInterface } from "../teamRepositoryInterface";

export interface CreateTeamData {
    name: string;
    members?: string[]
}

export class CreateTeam {
    constructor(private readonly teamRepo: TeamRepositoryInterface) { }

    async execute(data: CreateTeamData): Promise<Team> {
        if (data.name.length < 3 || data.name.length > 100) {
            throw new TeamNameException();
        }
        
        const team = new Team();
        team.name = data.name;

        return this.teamRepo.save(team);
    }
}