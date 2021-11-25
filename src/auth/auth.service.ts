import secp256k1 from 'secp256k1';
import createHash from 'create-hash';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { GenerateTokenPayload } from './interfaces';
import { JwtService } from './jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly jwtService: JwtService) {}

  public validate(publicKey: string, signature: string): boolean {
    this.logger.log('validateAddress');

    const msgSha256 = createHash('sha256');

    msgSha256.update('Hello World');

    const msgHash = msgSha256.digest();

    console.log(msgHash, signature, publicKey);

    const valid = secp256k1.ecdsaVerify(
      Buffer.from(signature, 'base64'),
      msgHash,
      Buffer.from(publicKey, 'base64')
    );

    return valid;
  }

  public async login(payload: GenerateTokenPayload) {
    this.logger.log('login');

    const valid = this.validate(payload.publicKey, payload.signature);

    if (!valid) {
      throw new UnauthorizedException();
    }

    return this.jwtService.generateTokens(payload);
  }
}
