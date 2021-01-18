<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Starterkit nestjs firebase auth and mysql

## Deskripsi

Starter kit server side yang dibuat menggunakan framework NestJS sebagai strukturnya.

* Firebase Auth sebagai metode otentikasi
* Menggunakan User Role untuk tingkatan level pengguna.
* Swagger untuk generate dokumentasi API secara konsisten.
* MySQL dan TypeORM untuk manajemen databasenya.

## Alur API

Karena dalam JWT Firebase Auth tidak memiliki payload yang kita butuhkan untuk autentikasi maka kita harus membuat dulu custom claim yang berisi tambahan payload `{iduser: number, user_role: number}

iduser dan user_role adalah skema database lokal MySQL yang kita gunakan.

Untuk membuat custom claim admin pertama kita gunakan API `/install/setup_first_user` selanjutnya setiap request yang membutuhkan autentikasi bisa menggunakan idToken yang didapat saat login menggunakan Firebase Auth.

Untuk custom claim pengguna umum, maka gunakan API `/auth/complete_profile` selanjutnya user dapat mengakes API sesuai role pengguna umum.

### Logika Registrasi dari Aplikasi Client

1. User melakukan autentikasi dengan email/google
   * Jika payload `email_verified` false, maka arahkan pengguna untuk verifikasi email.
   * Jika payload `iduser` dan `user_role` tidak ada, maka arahkan pengguna untuk melengkapi profile
2. Setelah melengkapi profile, pengguna sudah memiliki custom claim untuk autentikasi API kita dan otomatis user firebase yang dia miliki tersimpan di database lokal kita.

## Installation

``` bash
npm install
```

## Running the app

``` bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

``` bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
