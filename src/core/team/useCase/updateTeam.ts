import { TeamNotFoundException } from "../exception/teamNotFoundException";
import { Team } from "../team";
import { TeamRepositoryInterface } from "../teamRepositoryInterface";

export interface UpdateTeamData {
    name?: string;
    members?: string[]
}

export class UpdateTeam {
    constructor(private readonly teamRepo: TeamRepositoryInterface) { }

    async execute(id: string, data: UpdateTeamData): Promise<Team> {

        const team = await this.teamRepo.findOneById(id);
        if (!team) {
            throw new TeamNotFoundException(id);
        }

        if (data.name) {
            team.name = data.name;
        }

        return await this.teamRepo.save(team);
    }
}