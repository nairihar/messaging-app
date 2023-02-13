import configs from '../configs/main';

import getRedisInstance from '../connections/dbs/redis-client';

export async function makeUserAvailable(username: string): Promise<void> {
    await getRedisInstance().setEx(username, configs.userInactiveTimeout, '1');
}

export async function isUserAvailable(username: string): Promise<boolean> {
    return !!(await getRedisInstance().exists(username));
}

// export async function getAllAvailableUsers(username: string): Promise<boolean> {
//     return getRedisInstance().keys('*');
// }
