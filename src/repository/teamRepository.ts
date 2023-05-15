import { DataSource, Repository } from 'typeorm';
import { Team } from '../core/team/team';
import { TeamFilter, TeamRepositoryInterface } from '../core/team/teamRepositoryInterface';


export class TeamRepository extends Repository<Team> implements TeamRepositoryInterface {
    constructor(private dataSource: DataSource) {
        super(Team, dataSource.createEntityManager());
    }

    async findByFilter(filter: TeamFilter): Promise<Team[]> {
        return this.find({
            take: filter.limit
        });
    }
} 