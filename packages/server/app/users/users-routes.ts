import { getUsers } from './users-controller-get';
import { registerUser } from './users-controller-post';

export default function (router) {
    router.get('/users', getUsers);

    router.post('/users/register', registerUser);
}
