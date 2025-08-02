const rootHandler = (req, res) => {
  res.json({
    status: true,
    message: `savethevideo's API. GET /help or /about for more information.`,
    developer: 'JBS',
    "supported-by": ['node','npm','express', 'yt-dlp', 'others'],
    data: null
  });
}

export default {rootHandler};
export {rootHandler};