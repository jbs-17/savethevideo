


export async function userLoginService(identifier, password) {
    const user = await userLoginFindDB(identifier);
    if (!user) throw new AppError("user not found", 404);
    return verifyPassword(password, user.password);
}
