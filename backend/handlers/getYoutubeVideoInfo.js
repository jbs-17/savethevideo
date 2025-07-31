import { getDataJSON } from "../services/getDataJSON.js";

export default getYoutubeVideoInfo;
export { getYoutubeVideoInfo };
/**
 * Controller untuk menangani permintaan  video dari URL YouTube
 */
async function getYoutubeVideoInfo(req, res) {
    try {
        const url = req.query.url;
        if (!url || url.length <= 16) {
            return res
                .status(400)
                .json({
                    status: false,
                    error: "Parameter URL wajib disediakan."
                });
        }

        res.json({ status: true, data: null });
    } catch (error) {
        return res.status(500).json({
            error: "Gagal mengambil format video.",
            detail: err.message
        });
    }
}
