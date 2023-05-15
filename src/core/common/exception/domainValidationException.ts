export abstract class DomainValidationException extends Error {
    constructor(msg: string = 'Validation error') {
        super(msg);
    }
}