import { Team } from "../../core/team/team";

export function createListView(teams: Team[]): TeamsListItem[] {
    const views = [];
    for (const team of teams) {
        views.push({
            id: team.id,
            name: team.name
        })
    }

    return views
}

export interface TeamsListItem {
    id: string;
    name: string;
}