import * as CryptoJS from 'crypto-js';

class SecureLocalStorage {
  private secretKey: string;

  constructor() {
    if (this.isLocalStorageAvailable()) {
      this.secretKey = this.getOrGenerateSecretKey();
    } else {
      this.secretKey = this.generateSecretKey();
      console.warn('LocalStorage não está disponível. As alterações não serão persistidas.');
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }

  private getOrGenerateSecretKey(): string {
    if (this.isLocalStorageAvailable()) {
      const storedKey = localStorage.getItem('app_secret_key');
      if (storedKey) {
        return storedKey;
      }
      const newKey = this.generateSecretKey();
      localStorage.setItem('app_secret_key', newKey);
      return newKey;
    }
    // Gera uma chave temporária se localStorage não estiver disponível
    return this.generateSecretKey();
  }

  private generateSecretKey(): string {
    const array = new Uint32Array(8);
    if (typeof window !== 'undefined' && window.crypto) {
      window.crypto.getRandomValues(array);
    } else {
      // Fallback para ambiente sem `window.crypto`
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 0xffffffff);
      }
    }
    return Array.from(array, (val) => val.toString(16).padStart(8, '0')).join('');
  }

  encrypt(data: any): string {
    if (!this.secretKey) {
      console.error('SecretKey não está configurada.');
      return '';
    }
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  decrypt(encryptedData: string): any {
    try {
      if (!this.secretKey) {
        console.error('SecretKey não está configurada.');
        return null;
      }
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Falha ao descriptografar os dados:', error);
      return null;
    }
  }

  setItem(key: string, data: any): void {
    if (!this.isLocalStorageAvailable()) {
      console.warn('LocalStorage não está disponível. O dado não será salvo.');
      return;
    }
    const encryptedData = this.encrypt(data);
    localStorage.setItem(key, encryptedData);
  }

  getItem(key: string): any {
    if (!this.isLocalStorageAvailable()) {
      console.warn('LocalStorage não está disponível. Nenhum dado foi carregado.');
      return null;
    }
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) {
      return null;
    }
    return this.decrypt(encryptedData);
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }
}

export const secureLocalStorage = new SecureLocalStorage();
