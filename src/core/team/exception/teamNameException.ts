import { TeamValidationException } from "./teamValidationException";

export class TeamNameException extends TeamValidationException {
    constructor() {
        super(`Team name length should be between 3 and 100 characters`);
    }
}