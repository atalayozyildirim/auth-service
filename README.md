### NODE JS + MYSQL AUTH SERVICE

#### Proje Açıklaması
Bu proje, Node.js ve MySQL kullanarak bir kimlik doğrulama API'si oluşturmayı amaçlamaktadır. Kullanıcıların kayıt olmasını, giriş yapmasını ve kimlik doğrulama işlemlerini gerçekleştirmesini sağlar.

#### Özellikler
- Kullanıcı kayıt ve giriş işlemleri
- JWT (JSON Web Token) ile kimlik doğrulama
- MySQL veritabanı entegrasyonu
- Şifreleme ve güvenlik önlemleri

#### Gereksinimler
- Node.js
- MySQL
- Redis
- npm (Node Package Manager)

#### Kurulum
1. Projeyi klonlayın:
    ```bash
    git clone <repository-url>
    ```
2. Proje dizinine gidin:
    ```bash
    cd project-directory
    ```
3. Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```
4. Veritabanı yapılandırmasını yapın:
    - `prisma/database.js` dosyasını açın ve MySQL bağlantı bilgilerinizi girin.

5. Veritabanını oluşturun ve tabloları ekleyin:
    ```bash
    npm run migrate
    ```

#### Kullanım
1. Sunucuyu başlatın:
    ```bash
    npm start
    ```
2. API'yi kullanarak kullanıcı kayıt ve giriş işlemlerini gerçekleştirin.

#### API Endpoints
- **POST /api/auth/register**: Yeni kullanıcı kaydı
- **POST** /api/auth/login**: Kullanıcı girişi
  **POST /api/auth/password/reset** Password reset
  **POST /api/auth/password/change** Password change
