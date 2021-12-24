import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from './jwt';

const PUBLIC_KEY = 'A4Fj1Y4k77Qaxuy496CHYB2rpfWXkM3LCnlyrU8eKbH7';
const PRIVATE_KEY = '69b4e47d3aa61ad6184493529cd0feb0d2dfb55ea31aa9799af42607de3cd1a9';
const SIGNATURE =
  'sF49w4adKMUaV9drJa9+1U/SQDyKIHxvus4LDaLROjYR1fMlUi+lEH+EPS0ApPZNABJZEyKw1EJ2vIsaeSH7dQ==';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useClass: jest.fn(() => ({})),
        },
        {
          provide: ConfigService,
          useClass: jest.fn(() => ({
            get: () => 'Hello World',
          })),
        },
      ],
      imports: [],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should return true with valid signature', () => {
    expect(service.validate(PUBLIC_KEY, SIGNATURE)).toBeTruthy();
  });

  it('should sign a message with public key', () => {
    const signature = service.signMsg(PRIVATE_KEY);

    expect(signature).toBe(SIGNATURE);
  });
});
