import { UserEntity } from '../entities/user.entity';

export class UserResponse {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  photoURL: string | null;
  createdAt: string;

  static fromUserEntity(entity: UserEntity): UserResponse {
    const response = new UserResponse();
    response.uid = entity.user_id;
    response.email = entity.email;
    response.emailVerified = entity.email_verified;
    response.displayName = entity.name;
    response.photoURL = entity.picture;
    response.createdAt = entity.created_at.toISOString();
    return response;
  }
}
