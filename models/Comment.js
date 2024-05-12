import { Schema, model } from 'mongoose';
let CommentSchema = new Schema({
    PostId: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})
export default model('comment', CommentSchema)