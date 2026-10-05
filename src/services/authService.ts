import { User, UserAddress, UserRole } from '../types';

const USERS_STORAGE_KEY = 'nexora_users_v2';
const CURRENT_USER_KEY = 'nexora_current_user_v2';

// Demo initial users
const INITIAL_USERS: User[] = [
  {
    id: 'admin',
    firstName: 'مدیر',
    lastName: 'فروشگاه',
    email: 'admin@nexora.ir',
    phone: '02191008877',
    password: 'admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    createdAt: '۱۴۰۳/۰۱/۰۱',
    addresses: [
      {
        id: 'addr-admin-1',
        recipientName: 'مدیر فروشگاه نکسورا',
        phone: '02191008877',
        province: 'تهران',
        city: 'تهران',
        fullAddress: 'بلوار میرداماد، مجتمع کامپیوتر پایتخت، برج A، طبقه ۸',
        postalCode: '۱۹۶۹۷۵۴۳۲۱',
        isDefault: true
      }
    ],
    orders: [],
    wishlist: ['nx-asus-rog-strix-g16', 'nx-apple-macbook-pro-16-m3-max'],
    status: 'active'
  },
  {
    id: 'usr-mohammad',
    firstName: 'محمد',
    lastName: 'نجفی',
    email: 'mohammad@nexora.ir',
    phone: '09123456789',
    password: 'user123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    createdAt: '۱۴۰۳/۰۵/۱۵',
    addresses: [
      {
        id: 'addr-1',
        recipientName: 'محمد نجفی',
        phone: '09123456789',
        province: 'تهران',
        city: 'تهران',
        fullAddress: 'خیابان ولیعصر، بالاتر از میدان ونک، برج نگین، واحد ۴۰۲',
        postalCode: '۱۹۶۹۷۵۴۳۲۱',
        isDefault: true
      },
      {
        id: 'addr-2',
        recipientName: 'محمد نجفی (محل کار)',
        phone: '09123456789',
        province: 'تهران',
        city: 'تهران',
        fullAddress: 'میدان آرژانتین، خیابان الوند، پلاک ۲۴، واحد ۳',
        postalCode: '۱۵۱۶۷۳۴۲۱۱',
        isDefault: false
      }
    ],
    orders: ['ord-1', 'ord-2'],
    wishlist: ['nx-asus-rog-strix-g16', 'nx-apple-macbook-pro-16-m3-max', 'nx-asus-zenbook-14-oled'],
    status: 'active'
  }
];

class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
        // Ensure admin account always exists
        if (!this.users.some(u => u.id === 'admin' || u.role === 'admin')) {
          this.users.unshift(INITIAL_USERS[0]);
          this.saveUsers(this.users);
        }
      } else {
        this.users = [...INITIAL_USERS];
        this.saveUsers(this.users);
      }

      const storedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        // Match with current up-to-date user data
        const found = this.users.find(u => u.id === parsed.id);
        this.currentUser = found || parsed;
      }
    } catch (e) {
      console.error('Error initializing AuthService', e);
      this.users = [...INITIAL_USERS];
      this.currentUser = null;
    }
  }

  public getUsers(): User[] {
    return [...this.users];
  }

  public getAllUsers(): User[] {
    return this.getUsers();
  }

  public saveUsers(users: User[]): void {
    this.users = users;
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users to localStorage', e);
    }
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public saveCurrentUser(user: User | null): void {
    this.currentUser = user;
    try {
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch (e) {
      console.error('Failed to save current user to localStorage', e);
    }
  }

  public login(identifier: string, password: string): { success: boolean; user?: User; error?: string } {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    // Check special demo admin login
    if (cleanId === 'admin' && cleanPass === 'admin') {
      let adminUser = this.users.find(u => u.id === 'admin' || (u.role === 'admin' && u.email === 'admin@nexora.ir'));
      if (!adminUser) {
        adminUser = INITIAL_USERS[0];
        this.users.unshift(adminUser);
        this.saveUsers(this.users);
      }
      this.saveCurrentUser(adminUser);
      return { success: true, user: adminUser };
    }

    const user = this.users.find(
      u =>
        u.email.toLowerCase() === cleanId ||
        u.phone === cleanId ||
        (u.id && u.id.toLowerCase() === cleanId) ||
        (u.role === 'admin' && cleanId === 'admin')
    );

    if (!user) {
      return { success: false, error: 'نام کاربری یا رمز عبور اشتباه است.' };
    }

    if (user.status === 'blocked') {
      return { success: false, error: 'این حساب کاربری توسط مدیریت مسدود شده است.' };
    }

    if (user.password !== cleanPass) {
      return { success: false, error: 'نام کاربری یا رمز عبور اشتباه است.' };
    }

    this.saveCurrentUser(user);
    return { success: true, user };
  }

  public register(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }): { success: boolean; user?: User; error?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return { success: false, error: 'ایمیل وارد شده صحیح نیست.' };
    }

    if (data.password.length < 8) {
      return { success: false, error: 'رمز عبور حداقل باید ۸ کاراکتر باشد.' };
    }

    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPhone = data.phone.trim();

    if (this.users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'این ایمیل قبلاً ثبت شده است.' };
    }

    if (this.users.some(u => u.phone === cleanPhone)) {
      return { success: false, error: 'این شماره موبایل قبلاً ثبت شده است.' };
    }

    const newUser: User = {
      id: 'usr-' + Date.now(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      password: data.password,
      role: 'user', // strictly user!
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`,
      createdAt: new Date().toLocaleDateString('fa-IR'),
      addresses: [],
      orders: [],
      wishlist: [],
      status: 'active'
    };

    const updated = [newUser, ...this.users];
    this.saveUsers(updated);
    this.saveCurrentUser(newUser);

    return { success: true, user: newUser };
  }

  public logout(): void {
    this.saveCurrentUser(null);
  }

  public updateProfile(userId: string, data: Partial<User>): { success: boolean; user?: User; error?: string } {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, error: 'کاربر یافت نشد.' };
    }

    // Role cannot be changed via regular profile update
    const { role, password, ...allowedUpdates } = data;
    const updatedUser = {
      ...this.users[userIndex],
      ...allowedUpdates
    };

    this.users[userIndex] = updatedUser;
    this.saveUsers([...this.users]);

    if (this.currentUser?.id === userId) {
      this.saveCurrentUser(updatedUser);
    }

    return { success: true, user: updatedUser };
  }

  public changePassword(userId: string, currentPass: string, newPass: string): { success: boolean; error?: string } {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, error: 'کاربر یافت نشد.' };
    }

    const user = this.users[userIndex];
    if (user.password && user.password !== currentPass.trim()) {
      return { success: false, error: 'رمز عبور فعلی نادرست است.' };
    }

    if (newPass.trim().length < 8) {
      return { success: false, error: 'رمز عبور جدید باید حداقل ۸ کاراکتر باشد.' };
    }

    user.password = newPass.trim();
    this.users[userIndex] = user;
    this.saveUsers([...this.users]);

    if (this.currentUser?.id === userId) {
      this.saveCurrentUser(user);
    }

    return { success: true };
  }

  public addAddress(userId: string, addressData: Omit<UserAddress, 'id'>): UserAddress {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    user.addresses = user.addresses || [];
    const isFirst = user.addresses.length === 0;
    const newAddress: UserAddress = {
      ...addressData,
      id: 'addr-' + Date.now(),
      isDefault: addressData.isDefault || isFirst
    };

    if (newAddress.isDefault) {
      user.addresses = user.addresses.map(a => ({ ...a, isDefault: false }));
    }

    user.addresses.push(newAddress);
    this.saveUsers([...this.users]);

    if (this.currentUser?.id === userId) {
      this.saveCurrentUser(user);
    }

    return newAddress;
  }

  public updateAddress(userId: string, addressId: string, addressData: Partial<UserAddress>): void {
    const user = this.users.find(u => u.id === userId);
    if (!user) return;

    user.addresses = user.addresses || [];
    user.addresses = user.addresses.map(addr => {
      if (addr.id === addressId) {
        return { ...addr, ...addressData };
      }
      if (addressData.isDefault) {
        return { ...addr, isDefault: false };
      }
      return addr;
    });

    this.saveUsers([...this.users]);
    if (this.currentUser?.id === userId) {
      this.saveCurrentUser(user);
    }
  }

  public deleteAddress(userId: string, addressId: string): void {
    const user = this.users.find(u => u.id === userId);
    if (!user) return;

    user.addresses = user.addresses || [];
    user.addresses = user.addresses.filter(a => a.id !== addressId);
    if (user.addresses.length > 0 && !user.addresses.some(a => a.isDefault)) {
      user.addresses[0].isDefault = true;
    }

    this.saveUsers([...this.users]);
    if (this.currentUser?.id === userId) {
      this.saveCurrentUser(user);
    }
  }

  public setDefaultAddress(userId: string, addressId: string): void {
    const user = this.users.find(u => u.id === userId);
    if (!user) return;

    user.addresses = user.addresses || [];
    user.addresses = user.addresses.map(a => ({
      ...a,
      isDefault: a.id === addressId
    }));

    this.saveUsers([...this.users]);
    if (this.currentUser?.id === userId) {
      this.saveCurrentUser(user);
    }
  }

  // Admin Management Functions
  public updateUserRole(userId: string, role: UserRole): boolean {
    const user = this.users.find(u => u.id === userId);
    if (!user) return false;
    // Cannot demote main admin
    if (user.id === 'admin' && role !== 'admin') return false;

    user.role = role;
    this.saveUsers([...this.users]);
    if (this.currentUser?.id === userId) {
      this.saveCurrentUser(user);
    }
    return true;
  }

  public changeUserRole(userId: string, role: UserRole): boolean {
    return this.updateUserRole(userId, role);
  }

  public toggleUserStatus(userId: string): boolean {
    const user = this.users.find(u => u.id === userId);
    if (!user) return false;
    // Cannot block main admin
    if (user.id === 'admin') return false;

    user.status = user.status === 'blocked' ? 'active' : 'blocked';
    this.saveUsers([...this.users]);
    if (this.currentUser?.id === userId) {
      this.saveCurrentUser(user);
    }
    return true;
  }

  public deleteUser(userId: string): { success: boolean; error?: string } {
    if (userId === 'admin') {
      return { success: false, error: 'حساب کاربری مدیر اصلی سیستم غیرقابل حذف است.' };
    }

    this.users = this.users.filter(u => u.id !== userId);
    this.saveUsers([...this.users]);

    if (this.currentUser?.id === userId) {
      this.logout();
    }
    return { success: true };
  }

  public addOrderToUser(userId: string, orderId: string): void {
    const user = this.users.find(u => u.id === userId);
    if (!user) return;

    if (!user.orders.includes(orderId)) {
      user.orders.unshift(orderId);
      this.saveUsers([...this.users]);
      if (this.currentUser?.id === userId) {
        this.saveCurrentUser(user);
      }
    }
  }
}

export const authService = new AuthService();
