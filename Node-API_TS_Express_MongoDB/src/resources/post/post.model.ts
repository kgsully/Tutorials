import { Schema, model } from 'mongoose';
import Post from '@/resources/post/post.interface';

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// This is a template / generic so is of type post, name of model is post, and schema it uses is PostSchema
export default model<Post>('Post', PostSchema);
