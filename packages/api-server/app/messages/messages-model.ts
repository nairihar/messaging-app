import { Schema, model } from 'mongoose';
import { IMessage } from './messages';
import { UserDocument } from '../users/users';

export const messageSchema = new Schema({
    content: {
        type    : String,
        required: true,
    },

    contentType: {
        type   : String,
        default: 'text',
    },

    sender: {
        type: Schema.Types.ObjectId,
        ref : 'User',
    },

    receiver: {
        type: Schema.Types.ObjectId,
        ref : 'User',
    },

    createdAt: {
        type   : Date,
        default: Date.now,
    },
});

messageSchema.method('plain', async function () {
    const { sender }: { sender: UserDocument } = this.populated('sender')
        ? this
        : await this.populate('sender');

    return {
        message: this.content,
        sender : sender.username,
        date   : this.createdAt,
    };
});

const Message = model<IMessage>('Message', messageSchema);

export default Message;
