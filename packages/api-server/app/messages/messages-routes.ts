import { sendMessage } from './messages-controller-post';
import { getUserMessages } from './messages-controller-get';

export default function (router) {
    router.get('/messages/users/:username', getUserMessages);

    router.post('/messages/users/:username', sendMessage);
}
