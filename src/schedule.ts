
export const convertUrlToId = (youtubeUrl: string) => { // string은 아마 값복사 일거임.
    const id = youtubeUrl.replace("https://www.youtube.com/watch?v=", '');
    
    return id;
};

const convertHmsToSecond = (hms: string) => {
    const arr = hms.split(':');
    if(arr.length == 2) {
        const m = Number(arr[0]);
        const s = Number(arr[1]);
        
        return m*60 + s;
    }

}

const schedule = {
    startTime: "12:45", // 첫영상 시작 기준 시간
    videos: [
        {
            url: "https://www.youtube.com/watch?v=_7-Z2MDx7YU",
            from: "2:00",
            to: "5:00",
        },
        {
            url: "https://www.youtube.com/watch?v=3Hr35Kr2aXA",
            from: "5:00",
            to: "15:00",
        },
    ],
};

export default schedule;