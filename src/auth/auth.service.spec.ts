import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from './jwt';

const PUBLIC_KEY = 'A0ZGrlBHMWtCMNAIbIrOxofwCxzZ0dxjT2yzWKwKmo//';
const SIGNATURE =
  'u7aaxlSRItgmXH2je0jbLUSmVj/uBA8niiQsLyXSH0Qf82OVAKqHburb6uZ0vMAOsvLUUadQTSyY58aGH6p9wg==';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true with valid signature', () => {
    expect(service.validate(PUBLIC_KEY, SIGNATURE)).toBeTruthy();
  });
});
