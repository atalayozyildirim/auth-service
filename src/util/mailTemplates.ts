class EmailTemplates  {
    user: string;
    token: string;
    email : string

    constructor(user: string, token: string,email: string) {
        this.user = user;
        this.token = token;
        this.email = email;
    }

    PasswordReset() {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 50px auto;
              background-color: #ffffff;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 10px 0;
              border-bottom: 1px solid #dddddd;
            }
            .header h2 {
              margin: 0;
              color: #333333;
            }
            .content {
              padding: 20px;
              text-align: center;
            }
            .content p {
              font-size: 16px;
              color: #666666;
            }
            .content a {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              font-size: 16px;
              color: #ffffff;
              background-color: #007bff;
              text-decoration: none;
              border-radius: 5px;
            }
            .footer {
              text-align: center;
              padding: 10px 0;
              border-top: 1px solid #dddddd;
              font-size: 12px;
              color: #999999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Merhaba ${this.user}</h2>
            </div>
            <div class="content">
              <p>Şifreni değiştirmek istediğini duyduk. Aşağıdaki butona tıklayarak şifreni sıfırlayabilirsin.</p>
              <a href="http://localhost:3000/reset-password?token=${this.token}&redirect=localhost">Şifreni Sıfırla</a>
            </div>
            <div class="footer">
              <p>Eğer bu isteği sen yapmadıysan, hemen hesabını güvene al !</p>
            </div>
          </div>
        </body>
        </html>
        `;
    }
    EmailVerification() {
        return   `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 50px auto;
                  background-color: #ffffff;
                  padding: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  padding: 10px 0;
                  border-bottom: 1px solid #dddddd;
                }
                .header h2 {
                  margin: 0;
                  color: #333333;
                }
                .content {
                  padding: 20px;
                  text-align: center;
                }
                .content p {
                  font-size: 16px;
                  color: #666666;
                }
                .content a {
                  display: inline-block;
                  margin-top: 20px;
                  padding: 10px 20px;
                  font-size: 16px;
                  color: #ffffff;
                  background-color: #007bff;
                  text-decoration: none;
                  border-radius: 5px;
                }
                .footer {
                  text-align: center;
                  padding: 10px 0;
                  border-top: 1px solid #dddddd;
                  font-size: 12px;
                  color: #999999;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Merhaba ${this.email}</h2>
                </div>
                <div class="content">
                  <p>Email doğrulamak için aşağıdaki linke tıkla.</p>
                  <a href="http://localhost:3000/verify/email?token=${this.token}&redirect=localhost">Şifreni Sıfırla</a>
                </div>
                <div class="footer">
                  <p>Eğer bu isteği sen yapmadıysan, hemen hesabını güvene al !</p>
                </div>
              </div>
            </body>
            </html>
        `
    }
}