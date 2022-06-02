const getItems = (data , type, date ) => {
    let res  = [];
    data.forEach((item ) => {
        let date_ = new Date(parseInt(item.log.date.split("/")[2]), parseInt(item.log.date.split("/")[1])-1, parseInt(item.log.date.split("/")[0])).toLocaleDateString();
        if (date_ === date.toLocaleDateString()) {
            if (item.log.type.toLowerCase() === type.toLowerCase()) {
                res.push(item);
            }
        }
    })
    return res;
}

export const getAll = (data , date ) => {
    let res = [];
    data.forEach((item) => {
        let date_ = new Date(parseInt(item.log.date.split("/")[2]), parseInt(item.log.date.split("/")[1])-1, parseInt(item.log.date.split("/")[0])).toLocaleDateString();
        if (date_ === date.toLocaleDateString()) {
            res.push(item);
        }
    })
    return res;
}

export default getItems;