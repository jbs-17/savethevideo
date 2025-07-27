//core

//local
import getYoutubeFormats from './get-youtube-formats.js';
import safeYoutubeFormats from "./safe-youtube-formats.js";

//npm


async function main(params) {
  try {
    const url = 'https://www.youtube.com/watch?v=KrLj6nc516A';
    const formats = await getYoutubeFormats(url);
    const safeFormats = await safeYoutubeFormats(formats.stdout);
    console.table(safeFormats);

  } catch (error) {
    console.log(error);
  }
}
main()
