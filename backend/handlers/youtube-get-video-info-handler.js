import { getDataYTDLP } from "../services/get-data-ytdlp-service.js";
import { youtubeFindVideo } from "../databases/youtube-find-video-db.js";
import { youtubeInsertVideo } from "../databases/youtube-insert-video-db.js";

export default getYoutubeVideoInfo;
export { getYoutubeVideoInfo };

async function getYoutubeVideoInfo(req, res) {
    try {
        const url = req.query.url;
        if (!url || url.length <= 16) {
            return res.status(400).json({
                status: false,
                error: "Parameter URL wajib disediakan."
            });
        }
        let dataVideo = null;
        //cari di db jika ada
        const findVideo = await youtubeFindVideo(url);
        if (findVideo.status) {
            dataVideo = findVideo.data;
        }
        if (!findVideo.status) {
            dataVideo = await getDataYTDLP(url);
            dataVideo.url = url;
        }
        //check apakah youtube
        const is = isYoutube(dataVideo);

        if (is) {
            res.json({ status: true, data: dataVideo, url });
            await youtubeInsertVideo(dataVideo);
        } else {
            res.json({
                status: false,
                data: null,
                message: "invalid youtube url"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Gagal mengambil format video.",
            error
        });
    }
}

function isYoutube(dataVideo) {
    const values = Object.values(dataVideo);
    let count = 0;
    for (const value of values) {
        if (typeof value !== "string") {
            continue;
        }
        if (value.includes("you")) {
            count++;
        }
    }

    return count > 5;
}
