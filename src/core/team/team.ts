import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Employee } from "../employee/employee";

@Entity()
export class Team {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Employee, (member) => member.team)
    members: Employee[]
}