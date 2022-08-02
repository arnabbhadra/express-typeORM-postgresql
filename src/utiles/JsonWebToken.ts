import * as jwt from 'jsonwebtoken';
export class JsonWebToken {
    public generateAccessToken =
      (payload: {id: string, user: string, type: string}): {access_token: string,token_type: string,
        expire_in: string } => {
        const secret: any = 'hybr1d';
        const algorithm: jwt.Algorithm = 'HS256';
        const accessToken: string =
          jwt.sign(payload, secret, {expiresIn: '1h', algorithm: algorithm});
        const jwtaccessToken: {access_token: string,token_type: string,
          expire_in: string } =
          {access_token: accessToken, token_type: 'jwt', expire_in: '3600'};
        return jwtaccessToken;
      };
    public verifyAccessToken =
      (accessToken: string): string | jwt.JwtPayload => {
        try {
          const secret: any = 'hybr1d';
          const decode: string | jwt.JwtPayload = jwt.verify(accessToken, secret);
          return decode;
        } catch (error) {
          throw error;
        }
      };
}