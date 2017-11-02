
export function sanitizeData(data) {
    if (!data)
        return;

    if (Array.isArray(data)) {
        return data.map(el => { return sanitizeData(el) })
    } else {
        let result: any = {}
        for (const key in data) {
            let resultData = null;
            if (Array.isArray(data[key])) {
                resultData = sanitizeData(data[key]);
            } else if (typeof (data[key]) == 'object' && data[key] && Object.keys(data[key]).length > 0) {
                resultData = sanitizeData(data[key]);
            } else if (data[key]) {
                resultData = data[key]
            }
            if (resultData)
                result[key] = resultData;
        }
        return result;
    }
}