import { TeamNotFoundException } from "../exception/teamNotFoundException";
import { Team } from "../team";
import { TeamRepositoryInterface } from "../teamRepositoryInterface";

export class GetTeam {
    constructor(private readonly teamRepo: TeamRepositoryInterface) { }

    async execute(id: string): Promise<Team> {

        const team = await this.teamRepo.findOneById(id);
        if (!team) {
            throw new TeamNotFoundException(id);
        }

        return team;
    }
}