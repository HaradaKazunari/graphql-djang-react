import omit from "lodash/omit";
import { HttpResponse } from "msw";

import { JWT_SECRET } from "@/config";

import { db } from "./db";

const isTesting =
  process.env.NODE_ENV === "test" || ((window as any).Cypress as any);

// export const delayedResponse = createResponseComposition(undefined, [
//   context.delay(isTesting ? 0 : 1000),
// ]);
export const delayedResponse = (status, body = null) => {
  if (!body) {
    return HttpResponse.json(status);
  }
  return HttpResponse.json(body);
};

export const hash = (str: string) => {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
};

export const sanitizeUser = (user: any) => omit(user, ["password", "iat"]);

export function authenticate({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = db.user.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
  });
  if (user?.password === password) {
    return { user: { username }, jwt: "" };
  }

  const error = new Error("Invalid username or password");
  throw error;
}

export function requireAuth(request) {
  try {
    const encodedToken = request.headers.get("authorization");
    if (!encodedToken) {
      throw new Error("No authorization token provided!");
    }
    const decodedToken = jwt.verify(encodedToken, JWT_SECRET) as { id: string };

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id,
        },
      },
    });

    if (!user) {
      throw Error("Unauthorized");
    }

    return sanitizeUser(user);
  } catch (err: any) {
    throw new Error(err);
  }
}

export function requireAdmin(user: any) {
  if (user.role !== "ADMIN") {
    throw Error("Unauthorized");
  }
}
