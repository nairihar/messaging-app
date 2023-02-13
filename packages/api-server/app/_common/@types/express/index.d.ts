import { UserDocument } from '../../../users/users';

declare global {
    namespace Express {
        interface Request {
            performer?: UserDocument;
        }
    }
}
