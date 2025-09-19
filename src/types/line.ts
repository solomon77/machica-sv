/**
 * アクセストークン検証APIのレスポンス
 * https://developers.line.biz/en/reference/social-api/#verify-access-token
 */
export interface VerifyTokenResult {
  scope: string;
  client_id: string;
  expires_in: number;
}

/**
 * ユーザープロファイル取得APIのレスポンス
 * https://developers.line.biz/en/reference/social-api/#get-user-profile
 */
export interface UserProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}
