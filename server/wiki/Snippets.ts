// Set Cookie Header
res.setHeader('Set-Cookie', ['Authorization=; Max-Age=0'])

createCookie(tokenData: TokenData): string {
  return `Authorization=${tokenData.accessToken}; HttpOnly; Max-Age=${tokenData.expiresIn};`
}
