var mongoose = require('mongoose'),
    TaskSchema = new mongoose.Schema({
        title: {
            type: String,
            minlength: [4, 'Your first name must be at least 2 characters'],
            required: [true, 'Title is required.']
        },
        description: {
            type: String,
            default:""
        },
        completed:{
            type: Boolean,
            default: false

        },
        created_at: {
            type: Date,
            default: new Date()
        },
        updated_at: {
            type: Date,
            default: new Date()
        }
    });
// TaskSchema.plugin(uniqueValidator);

mongoose.model('Task', TaskSchema);