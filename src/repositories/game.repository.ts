import {CreateGameInput, GetGamesQuery, UpdateGameInput} from "~/types/game.type";
import {GameModel} from "~/models/game.model";

class GameRepository {
  public async createGame(body: CreateGameInput) {
    return GameModel.create(body);
  }

  public async getGameById(id: string) {
    return GameModel.findById(id);
  }

  public async getGames(query: GetGamesQuery) {
    const { page, pageSize, filter } = query;

    const totalDocuments = await GameModel.countDocuments();
    const totalPages = Math.ceil(totalDocuments / pageSize);
    const games = await GameModel.paginate({
      ...filter.search && { name: { $regex: filter.search, $options: 'i' } }
    }, { page, limit: pageSize });

    return {
      games: games.docs,
      totalDocuments,
      totalPages,
      page
    }
  }

  public async updateGame(id: string, body: UpdateGameInput) {
    return GameModel.findByIdAndUpdate(id, body, { new: true });
  }

  public async deleteGame(id: string) {
    return GameModel.updateOne({ _id: id }, { flag: false })
  }
}

const gameRepository = new GameRepository();
export default gameRepository;
