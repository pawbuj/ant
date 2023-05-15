import { DomainValidationException } from "../core/common/exception/domainValidationException";
import { EntityNotFoundException } from "../core/common/exception/entityNotFoundException";
import { BadRequest, InternalServerError, NotFound } from "express-openapi-validator/dist/openapi.validator";
 
export abstract class BasseCotroller {

    exceptionToError(exception: any) {
        if(exception instanceof DomainValidationException) {
            return new BadRequest({
                path:'',
                message: exception.message
            });
        }

        if(exception instanceof EntityNotFoundException) {
            return new NotFound({
                path:'',
                message: exception.message
            });
        }
        return new InternalServerError({});
    }
} 