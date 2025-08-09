function getAllKeys(obj) {
    let keys = [];
    function extractKeys(obj, prefix = "") {
        Object.keys(obj).forEach(key => {
            const newKey = prefix ? `${prefix}.${key}` : key;
            keys.push(newKey);

            if (
                typeof obj[key] === "object" &&
                obj[key] !== null &&
                !Array.isArray(obj[key])
            ) {
                extractKeys(obj[key], newKey);
            }
        });
    }

    extractKeys(obj);
    return keys;
}
