import getRawJSON from '../services/service-get-raw-json.js';

async function main(params) {
  try {
    const videoInformation = {};
    const { stderr, stdout} = await getRawJSON("https://www.youtube.com/watch?v=pzBi1nwDn8U");
    const data = JSON.parse(stdout);
    videoInformation.id = data.id ?? '';
    videoInformation.title = data.title ?? '';
    videoInformation.formats = data.formats ?? '';
    videoInformation.thumbnail = data.thumbnail ?? '';
    videoInformation.description = data.description ?? '';
    videoInformation.channel_id = data.channel_id ?? '';
    videoInformation.channel_url = data.id ?? '';
    videoInformation.duration = data.id ?? '';
    videoInformation.view_count = data.id ?? '';
    videoInformation.average_rating = data.id ?? '';
    videoInformation.age_limit = data.id ?? '';
    videoInformation.webpage_url = data.id ?? '';
    videoInformation.categories = data.id ?? '';
    videoInformation.tags = data.id ?? '';
    videoInformation.live_status = data.id ?? '';
    videoInformation.media_type = data.id ?? '';
    videoInformation.release_timestamp = data.release_timestamp ?? '';
    videoInformation.subtitles = data.subtitles ?? '';
    videoInformation.comment_count = data.comment_count ?? '';
    videoInformation.like_count = data.like_count ?? '';
    videoInformation.channel = data.channel ?? '';
    videoInformation.channel_follower_count = data.channel_follower_count ?? '';
    videoInformation.uploader = data.uploader ?? '';
    videoInformation.uploader_id = data.uploader_id ?? '';
    videoInformation.uploader_url = data.uploader_url ?? '';
    videoInformation.upload_date = data.upload_date ?? '';
    videoInformation.timestamp = data.timestamp ?? '';
    videoInformation.availability = data.availability ?? '';
    videoInformation.original_url = data.original_url ?? '';
    videoInformation.webpage_url_basename = data.webpage_url_basename ?? '';
    videoInformation.webpage_url_domain = data.webpage_url_domain ?? '';
    videoInformation.extractor = data.extractor ?? '';
    videoInformation.extractor_key = data.extractor_key ?? '';
    videoInformation.playlist = data.playlist ?? '';
    videoInformation.playlist_index = data.playlist_index ?? '';
    videoInformation.display_id = data.display_id ?? '';
    videoInformation.fulltitle = data.fulltitle ?? '';
    videoInformation.duration_string = data.duration_string ?? '';
    videoInformation.is_live = data.is_live ?? '';
    videoInformation.was_live = data.was_live ?? '';
    videoInformation.release_year = data.release_year ?? '';
    videoInformation.id = data.id ?? '';
    videoInformation.id = data.id ?? '';
    videoInformation.id = data.id ?? '';
    videoInformation.id = data.id ?? '';
    videoInformation.id = data.id ?? '';
    videoInformation.id = data.id ?? '';
    videoInformation.id = data.id ?? '';
    videoInformation.id = data.id ?? '';
    videoInformation.id = data.id ?? '';
    videoInformation.id = data.id ?? '';
    videoInformation.id = data.id ?? '';


    
  } catch (error) {
    console.log(error);    
  }
  
}

main()