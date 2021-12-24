import secp256k1 from 'secp256k1';
import createHash from 'create-hash';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { GenerateTokenPayload } from './interfaces';
import { JwtService } from './jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public validate(publicKey: string, signature: string): boolean {
    this.logger.verbose('validateAddress');

    const msgSha256 = createHash('sha256');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const message = this.configService.get<string>('auth.message')!;

    msgSha256.update(message);

    const msgHash = msgSha256.digest();
    const valid = secp256k1.ecdsaVerify(
      Buffer.from(signature, 'base64'),
      msgHash,
      Buffer.from(publicKey, 'base64')
    );

    return valid;
  }

  public signMsg(privateKey: string): string {
    const privkeyBytes = Buffer.from(privateKey, 'hex');
    const msgSha256 = createHash('sha256');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const message = this.configService.get<string>('auth.message')!;

    msgSha256.update(message);

    const msgHash = msgSha256.digest();
    const { signature: signatureArr } = secp256k1.ecdsaSign(msgHash, privkeyBytes);
    const signature = Buffer.from(signatureArr).toString('base64');

    return signature;
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
