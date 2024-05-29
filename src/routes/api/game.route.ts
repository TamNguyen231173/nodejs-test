import {Router} from "express";
import gameController from "~/controllers/game.controller";
import {validateMiddleware} from "~/middlewares/validate.middleware";
import {createGameValidation, updateGameValidation} from "~/validations/game.validation";
import "express-async-errors"
import {deleteUserValidation} from "~/validations/user.validation";

export const gameRoute = Router()

gameRoute.get('/', gameController.getGames)
gameRoute.get('/:id', validateMiddleware(deleteUserValidation), gameController.getGame)
gameRoute.post('/',validateMiddleware(createGameValidation) ,gameController.createGame)
gameRoute.put('/:id',validateMiddleware(updateGameValidation) ,gameController.updateGame)
gameRoute.delete('/:id', validateMiddleware(deleteUserValidation), gameController.deleteGame)
gameRoute.get('/my-games/get', gameController.getMyGames)
