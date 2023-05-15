import { Team } from "../../core/team/team";

export function createSingleView(team: Team): singleTeam {
    return {
        id: team.id,
        name: team.name
    } as singleTeam
}

interface singleTeam {
    id: string;
    name: string;
}