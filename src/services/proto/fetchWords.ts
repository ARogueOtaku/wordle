import { WordServiceClient } from "./generated/WordsServiceClientPb";
import { WordRequest } from "./generated/words_pb";

const client = new WordServiceClient(process.env.REACT_APP_PROTO_ENDPOINT ?? "");

const fetchWords = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.getWord(new WordRequest(), {}, (error, response) => {
      if (error) reject(error);
      else resolve(response.getWord());
    });
  });
};

export default fetchWords;
