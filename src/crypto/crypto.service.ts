import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CryptoService {
  private CRYPTO_BCRYPT_SALT: number;

  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {
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
  decryptPassword(password: string, hash: string): Promise<boolean> {
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
  GenerateSecretKey() {
    return new Promise((resolve, reject) => {
      let secret_key = require('crypto').randomBytes(64).toString('hex');
      // console.log("key==> ", secret_key);
      resolve(secret_key);
    });
  }

  //Generate JWT Token for  Authentication
  GenerateJWTToken(id: number) {
    return this.jwtService.sign(
      { id: id },
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
        secret: process.env.TOKEN_SECRET,
      },
    );
  }

  //verify JWT Token for  Authentication
  VerifyJWTToken(token: string) {
    return new Promise((resolve, reject) => {
      if (token == null) return reject();

      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return reject();
        resolve(user);
      });
    });
  }
}
