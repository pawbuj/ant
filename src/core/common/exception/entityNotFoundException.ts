export abstract class EntityNotFoundException extends Error {
    constructor(msg: string = 'Entity not found') {
        super(msg);
    }
}