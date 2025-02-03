import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

class PostService {
    private post = PostModel;

    // Create a new post
    public async create(title: string, body: string): Promise<Post> {
        try {
            // the create method used here on this.post (PostModel type, which is in turn exported as model<post>) is a method from mongoose Model.create
            const post = await this.post.create({ title, body });

            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }
}

export default PostService;
