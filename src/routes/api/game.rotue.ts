import {Router} from "express";
import gameController from "~/controllers/game.controller";
import authenticator from "~/services/authenticator.service";
import {validateMiddleware} from "~/middlewares/validate.middleware";
import {createGameValidation, updateGameValidation} from "~/validations/game.validation";

export const gameRoute = Router()

gameRoute.get('/', gameController.getGames)
gameRoute.get('/:id', gameController.getGame)
gameRoute.post('/',validateMiddleware(createGameValidation) ,gameController.createGame)
gameRoute.put('/:id',validateMiddleware(updateGameValidation) ,gameController.updateGame)
gameRoute.delete('/:id', gameController.deleteGame)
gameRoute.get('/my-games/get', gameController.getMyGames)
