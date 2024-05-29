import gameRepository from "~/repositories/game.repository";
import {CreateGameInput, UpdateGameInput} from "~/types/game.type";
import {ApiError} from "~/utils/api-error";
import httpStatus from "http-status";

class GameService {
  public async getGame(id: string) {
    const game = await gameRepository.getGameById(id);

    if (!game) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Game not found')
    }

    return game;
  }

  public async getGames(page: number, pageSize: number, search: string) {
    if (!page) page = 1;
    if (!pageSize) pageSize = 10;

    return gameRepository.getGames({
      page,
      pageSize,
      filter: {
        search
      }
    });
  }

  public async getMyGames(userId: string, page: number, pageSize: number) {
    if (!page) page = 1;
    if (!pageSize) pageSize = 10;

    return gameRepository.getGames({
      page,
      pageSize,
      filter: {
        author: userId
      }
    });
  }

  public async createGame(body: CreateGameInput) {
    return gameRepository.createGame(body);
  }

  public async updateGame(userId: string, id: string, body: UpdateGameInput) {
    const game = await gameRepository.getGameById(id)

    if (!game) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Game not found')
    }

    if (game.author._id.toString() !== userId) {
      throw new ApiError(httpStatus.FORBIDDEN, 'You are not the author of this game')
    }

    return gameRepository.updateGame(id, body);
  }

  public async deleteGame(userId: string, id: string) {
    const game = await gameRepository.getGameById(id);

    if (!game) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Game not found')
    }

    if (game.author._id.toString() !== userId) {
      throw new ApiError(httpStatus.FORBIDDEN, 'You are not the author of this game')
    }

    return gameRepository.deleteGame(id);
  }
}

const gameService = new GameService();
export default gameService;
