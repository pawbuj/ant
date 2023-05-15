import { EntityNotFoundException } from "../../common/exception/entityNotFoundException";

export class TeamNotFoundException extends EntityNotFoundException {
    constructor(public id: string) {
        super(`Team ${id} not found`);
    }
}