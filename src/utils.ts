export const getCurrentTime = () => {
    const today = new Date();
    const to2digit = (num: number) => String(num).padStart(2, '0');
    const hh = to2digit(today.getHours());
    const mm = to2digit(today.getMinutes());
    const ss = to2digit(today.getSeconds());
    
    return {
        hms: `${hh}:${mm}:${ss}`,
        hm: `${hh}:${mm}`,
    } 
}