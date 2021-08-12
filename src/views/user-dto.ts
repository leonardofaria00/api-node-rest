import { User } from '@models/User';

class UserDTO {
  public render(user: User) {
    const userDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return userDTO;
  }
}

export default UserDTO;
