// Função para filtrar campos proibidos
const filterFields = (data, allowedFields) => {
    return Object.keys(data)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
};

module.exports= {
    filterFields
}