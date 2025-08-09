import { getDataYTDLP } from "../services/get-data-ytdlp-service.js";
import pkg from "validator";
const { isURL } = pkg;

export async function tiktokGetVideoInfoFull(req, res) {
    const { url } = req.query;
    if (!url || !isURL(url))
        return res.fail("invalid tiktok video url", { url });
    try {
      const data = await getDataYTDLP(url);
      console.log(data);
      res.success("fetch tiktok video info full success", data)
    } catch (err) {
        console.error("Error:", err);
        res.fail('internal server error');
    }
    
}
