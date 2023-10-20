import { ApiProperty } from '@nestjs/swagger';

export class AddServiceAccountDto {
  @ApiProperty({ example: 'ESM' })
  serviceName: string;
  @ApiProperty({ example: '내 ESM 계정' })
  name: string;
  @ApiProperty({
    example: {
      username: 'test@test.com',
      password: 'P@ssw0rd12#',
    },
  })
  accountInfo: any;
}
