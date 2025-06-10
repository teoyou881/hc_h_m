import axios from 'axios';

const VITE_ADMIN_URL = import.meta.env.VITE_USER_URL;
/**
 * 사용자 관련 비즈니스 로직을 처리하는 서비스 계층
 */
const userService = {

  /**
   * 모든 사용자 목록을 조회합니다.
   * @returns {Array} 사용자 객체 배열
   */
  async getAllUsers() {
    try {
      const response = axios.get(VITE_ADMIN_URL+'/users');
      return response.data;
    } catch (error) {
      console.error('[UserService Error] Error getting all users:', error.message);
      throw new Error('Failed to retrieve users.');
    }
  },

  /**
   * ID로 특정 사용자를 조회합니다.
   * @param {string} userId - 조회할 사용자의 ID
   * @returns {Object|null} 사용자 객체 또는 null
   */
  async getUserById(userId) {
    try {
      const response = axios.get(VITE_ADMIN_URL+`/users/${userId}`);
      // 보안을 위해 비밀번호 등 민감 정보는 제거하고 반환하는 것이 좋습니다.
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error(`[UserService Error] Error getting user by ID ${userId}:`, error.message);
      throw new Error('Failed to retrieve user.');
    }
  },

  /**
   * 이메일로 특정 사용자를 조회합니다. (로그인 등에서 사용)
   * @param {string} email - 조회할 사용자의 이메일
   * @returns {Object|null} 사용자 객체 또는 null (비밀번호 포함 가능성 있음, 로그인 시)
   */
  async getUserByEmail(email) {
    try {
      // 실제 데이터베이스 로직: return await User.findOne({ email });
      console.log(`[UserService] Fetching user with email: ${email} (simulated)...`);
      await new Promise(resolve => setTimeout(resolve, 300));
      const user = users.find(u => u.email === email);
      return user || null; // 로그인 시 비밀번호 확인을 위해 전체 객체 반환
    } catch (error) {
      console.error(`[UserService Error] Error getting user by email ${email}:`, error.message);
      throw new Error('Failed to retrieve user by email.');
    }
  },

  /**
   * 새로운 사용자를 생성합니다.
   * 실제 비밀번호는 여기서 해싱되어야 합니다 (bcrypt 등 사용).
   * @param {Object} userData - 생성할 사용자 데이터 (email, password, username 등)
   * @returns {Object} 생성된 사용자 객체 (비밀번호 제외)
   */
  async createUser(userData) {
    try {
      // 실제 데이터베이스 로직:
      // const hashedPassword = await bcrypt.hash(userData.password, 10);
      // const newUser = new User({ ...userData, password: hashedPassword });
      // await newUser.save();
      console.log('[UserService] Creating new user (simulated):', userData.email);
      await new Promise(resolve => setTimeout(resolve, 500));

      // 시뮬레이션: 중복 이메일 체크
      if (users.some(u => u.email === userData.email)) {
        throw new Error('Email already registered.');
      }

      const newUser = {
        id: (users.length + 1).toString(), // 간단한 ID 생성
        email: userData.email,
        username: userData.username || 'NewUser',
        role: userData.role || 'USER',
        // 비밀번호는 실제 DB에는 해싱해서 저장하지만, 시뮬레이션에서는 저장하지 않음.
        // password: hashedPassword,
      };
      users.push(newUser);
      // 보안을 위해 비밀번호 등 민감 정보는 제거하고 반환
      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      console.error('[UserService Error] Error creating user:', error.message);
      throw error; // 에러를 호출자에게 다시 던짐
    }
  },

  /**
   * 기존 사용자를 업데이트합니다.
   * @param {string} userId - 업데이트할 사용자의 ID
   * @param {Object} updateData - 업데이트할 사용자 데이터
   * @returns {Object|null} 업데이트된 사용자 객체 또는 null
   */
  async updateUser(userId, updateData) {
    try {
      // 실제 데이터베이스 로직: return await User.findByIdAndUpdate(userId, updateData, { new: true });
      console.log(`[UserService] Updating user with ID: ${userId} (simulated)...`);
      await new Promise(resolve => setTimeout(resolve, 300));

      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return null;
      }
      const updatedUser = { ...users[userIndex], ...updateData };
      users[userIndex] = updatedUser;
      // 보안을 위해 비밀번호 등 민감 정보는 제거하고 반환
      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    } catch (error) {
      console.error(`[UserService Error] Error updating user ${userId}:`, error.message);
      throw new Error('Failed to update user.');
    }
  },

  /**
   * 사용자를 삭제합니다.
   * @param {string} userId - 삭제할 사용자의 ID
   * @returns {boolean} 삭제 성공 여부
   */
  async deleteUser(userId) {
    try {
      // 실제 데이터베이스 로직: const result = await User.findByIdAndDelete(userId); return !!result;
      console.log(`[UserService] Deleting user with ID: ${userId} (simulated)...`);
      await new Promise(resolve => setTimeout(resolve, 300));

      const initialLength = users.length;
      users = users.filter(u => u.id !== userId);
      return users.length < initialLength; // 길이가 줄었으면 삭제 성공
    } catch (error) {
      console.error(`[UserService Error] Error deleting user ${userId}:`, error.message);
      throw new Error('Failed to delete user.');
    }
  },
};

module.exports = userService;