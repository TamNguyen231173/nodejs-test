import webService from "~/services/web.service";
import dbService from "~/services/db.service";

const main = async () => {
  try {
    await webService.start()
    await dbService.connect()
  } catch (error) {
    console.log(error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
main().then((_) => {})