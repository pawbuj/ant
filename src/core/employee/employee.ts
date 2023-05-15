import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Team } from "../team/team";

export enum EmployeeRole {
    ROLE1 = 'role1',
    ROLE2 = 'role2',
    ROLE3 = 'role3'
}

@Entity()
export class Employee {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToOne(() => Employee, { onDelete: 'SET NULL' })
    manager: Employee | null = null;

    @Column({ type: 'timestamptz' })
    firstDayAtWork: Date;

    @Column({
        type: 'enum',
        enum: EmployeeRole,
    })
    role: EmployeeRole;

    @ManyToOne(() => Team, (team) => team.members, { onDelete: 'SET NULL' })
    team: Team | null = null;
}
