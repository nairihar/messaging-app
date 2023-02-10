import { sendMessage } from './messages-controller-post';
import { getUserMessages } from './messages-controller-get';

export default function (router) {
    router.get('/messages/users/:user_name', getUserMessages);

    router.post('/messages/users/:user_name', sendMessage);
}
