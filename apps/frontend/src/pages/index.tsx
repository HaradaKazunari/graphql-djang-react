import * as React from "react";
import { useNavigate } from "react-router";

import { useUser } from "@/lib/auth";

export const Landing = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();

  React.useEffect(() => {
    if (user) {
      navigate("/app");
    } else {
      navigate("/login");
    }
  }, [user]);

  return null;
};

export default Landing;
