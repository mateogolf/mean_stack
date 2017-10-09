var mongoose = require('mongoose');

var AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true }
})//, { timestamps: true });

mongoose.model('Animal', AnimalSchema);