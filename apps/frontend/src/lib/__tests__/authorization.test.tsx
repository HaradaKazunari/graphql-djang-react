import { createUser, render, screen, test, expect } from "@/test/test-utils";

import { Authorization, ROLES } from "../authorization";

test("should view protected resource if user role is matching", async () => {
  const user = createUser({
    role: ROLES.ADMIN,
  });

  const protectedResource = "This is very confidential data";

  await render(
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      {protectedResource}
    </Authorization>,
    {
      user,
    },
  );

  expect(screen.getByText(protectedResource));
});
