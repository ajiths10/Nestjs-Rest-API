import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class CryptoService {
  CRYPTO_BCRYPT_SALT: number;

  constructor(private readonly configService: ConfigService) {
    this.CRYPTO_BCRYPT_SALT = this.configService.get('CRYPTO_BCRYPT_SALT');
  }

  //encrypt Password using bcrypt
  encryptPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, Number(this.CRYPTO_BCRYPT_SALT), (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  //decrypt Password using bcrypt
  decryptPassword(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, function (err, result) {
        // result == true
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  //Generate Token Secret random Keys
  GenerateSecretKey(id) {
    return new Promise((resolve, reject) => {
      let secret_key = require('crypto').randomBytes(64).toString('hex');
      // console.log("key==> ", secret_key);
      resolve(secret_key);
    });
  }

  //Generate JWT Token for  Authentication
  GenerateJWTToken(id) {
    return new Promise((resolve, reject) => {
      let token = jwt.sign({ id: id }, process.env.TOKEN_SECRET, {
        expiresIn: '93600s',
      });
      resolve(token);
    });
  }

  //verify JWT Token for  Authentication
  VerifyJWTToken(token) {
    return new Promise((resolve, reject) => {
      if (token == null) return reject();

      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return reject();
        resolve(user);
      });
    });
  }
}
