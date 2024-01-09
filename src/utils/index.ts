import axios from "axios";

export const youtubeUrlToId = (youtubeUrl: string) => {
  const id = youtubeUrl.replace("https://www.youtube.com/watch?v=", "");

  return id;
};

export const getYoutubeVideoTitle = async (videoId: string) => {
  const res = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      part: "snippet",
      maxResults: 50,
      id: videoId,
      key: "AIzaSyApPrwEPYT0KcMmpdF1YtfzGXI8TUu-Y8w",
    },
  });

  return res.data.items[0].snippet.title;
};

export const dateToString = (date: Date) => {
  const hh = date.getHours().toString().padStart(2, "0");
  const mm = date.getMinutes().toString().padStart(2, "0");
  const ss = date.getSeconds().toString().padStart(2, "0");

  return {
    hms: `${hh}:${mm}:${ss}`,
    hm: `${hh}:${mm}`,
  };
};

export const getYoutubeThumbnailSrc = (id: string) => {
  return "https://img.youtube.com/vi/" + id + "/mqdefault.jpg";
};
