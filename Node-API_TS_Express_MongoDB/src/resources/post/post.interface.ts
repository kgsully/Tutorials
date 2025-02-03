// Some may decide to define the interface inside the model (which would negate the requirement for this file), but not a bad practice to create this separately

import { Document } from "mongoose";

// Want to be able to access all of the properties, methods, etc that are present in a mongoose document
export default interface Post extends Document {
    title: string;
    body: string;
}
