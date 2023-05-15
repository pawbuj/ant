import { DomainValidationException } from "../../common/exception/domainValidationException";

export abstract class TeamValidationException extends DomainValidationException {
    constructor(msg: string = 'Team validation error') {
        super(msg);
    }
}