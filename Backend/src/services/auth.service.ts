
import mongoose from "mongoose";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import { ONE_DAY_MS, thirtyDaysFromNow } from "../utils/date";
import { RefreshTokenPayload, refreshTokenSignOptions, signToken, verifyToken } from "../utils/jwt";


export type CreateAccountParams = {
    email: string;
    password: string;
};

export const createAccount = async (data: CreateAccountParams) => {

    const existingUser = await UserModel.exists({ email: data.email });
    appAssert(!existingUser, CONFLICT, "Email already in use")

    const user = await UserModel.create({
        email: data.email,
        password: data.password,
    });

    const userId = user._id;

    const session = await SessionModel.create({
        userId,
    });

    const refreshToken = signToken({ sessionId: session._id }, refreshTokenSignOptions);

    const accessToken = signToken(
        {
            userId,
            sessionId: session._id,
        },

    );

    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken
    }
};

export type LoginParams = {
    email: string;
    password: string;
};

export const loginUser = async ({ email, password }: LoginParams) => {

    const user = await UserModel.findOne({ email });
    appAssert(user, UNAUTHORIZED, "Invalid email or password")


    const isValid = await user.comparePassword(password);
    appAssert(isValid, UNAUTHORIZED, "Invalid email or password")

    const userId = user._id

    const session = await SessionModel.create({
        userId,
    })

    const sessionInfo = {
        sessionId: session._id,
    }

    const refreshToken = signToken(sessionInfo, refreshTokenSignOptions)

    const accessToken = signToken(
        {
            ...sessionInfo,
            userId: user._id,
        }
    )

    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken
    }

}

export const refreshUserAccessToken = async (refreshToken: string) => {
    const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
        secret: refreshTokenSignOptions.secret,
    })
    appAssert(payload, UNAUTHORIZED, "Invalid refresh token")

    const session = await SessionModel.findById(payload.sessionId);
    const now = Date.now()
    appAssert(session && session.expiresAt.getTime() > now, UNAUTHORIZED, "Session expired")

    const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;
    if (sessionNeedsRefresh) {
        session.expiresAt = thirtyDaysFromNow();
        await session.save();
    }

    const newRefreshToken = sessionNeedsRefresh ? signToken({ sessionId: session._id }, refreshTokenSignOptions) : undefined

    const accessToken = signToken({
        userId: session.userId,
        sessionId: session._id
    })

    return {
        accessToken,
        newRefreshToken
    }
}

export const getUser = async (userId: mongoose.Types.ObjectId) => {

    const user = await UserModel.findById(userId);
    appAssert(user, UNAUTHORIZED, "User not found")

    return {
        user: user.omitPassword()
    }
}