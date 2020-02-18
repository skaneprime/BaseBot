module.exports = {
    schema: function(ffff, schemaName) {
            var Schema = mongoose.Schema;
            var temp = new Schema(ffff);
            return mongoose.model(schemaName, temp)
    }
}