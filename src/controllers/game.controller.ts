import gameService from "~/services/game.service";
import { Request, Response } from "express";

class GameController {

  public async createGame(req: Request, res: Response) {
    const data = await gameService.createGame({
      ...req.body,
      author: req.user._id
    })
    res.json({
      message: 'Game created',
      data
    })
  }

  public async updateGame(req: Request, res: Response) {
    const data = await gameService.updateGame(req.user._id, req.params.id, req.body)
    res.json({
      message: 'Game updated',
      data
    })
  }

  public async deleteGame(req: Request, res: Response) {
    const data = await gameService.deleteGame(req.user._id, req.params.id)
    res.json({
      message: 'Game deleted',
      data
    })
  }

  public async getGames(req: Request, res: Response) {
    const data = await gameService.getGames(Number(req.query.page), Number(req.query.pageSize), req.query.search as string)
    res.json({
      message: 'Get games',
      data
    })
  }

  public async getGame(req: Request, res: Response) {
    const data = await gameService.getGame(req.params.id)
    res.json({
      message: 'Get game',
      data
    })
  }

  public async getMyGames(req: Request, res: Response) {
    const data = await gameService.getMyGames(req.user._id, Number(req.query.page), Number(req.query.pageSize))
    res.json({
      message: 'Get my games',
      data
    })
  }
}

const gameController = new GameController();
export default gameController;

