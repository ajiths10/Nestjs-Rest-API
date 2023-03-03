import { Test, TestingModule } from '@nestjs/testing';
import { ResponseHandlerService } from './response_handler.service';

describe('ResponseHandlerService', () => {
  let service: ResponseHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseHandlerService],
    }).compile();

    service = module.get<ResponseHandlerService>(ResponseHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
