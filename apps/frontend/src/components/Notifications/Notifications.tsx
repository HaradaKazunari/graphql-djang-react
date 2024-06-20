import React from "react";
import ReactDOM from "react-dom";
import { useNotificationStore } from "@/stores/notifications";

import { Notification } from "./Notification";

const el = document.createElement("div");
el.setAttribute("id", "notifications-portal");

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();

  return (
    <Portal isShow={notifications.length > 0}>
      <div
        aria-live="assertive"
        className="z-50 flex flex-col fixed inset-0 space-y-4 items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onDismiss={dismissNotification}
          />
        ))}
      </div>
    </Portal>
  );
};

const Portal = ({
  isShow,
  children,
}: {
  isShow: boolean;
  children: React.ReactNode;
}) => {
  React.useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;

    const portal = document.querySelector("#notifications-portal");
    if (portal && !isShow) {
      portal.remove();
    }
    if (!portal) body.appendChild(el);
  }, [isShow]);

  return ReactDOM.createPortal(children, el);
};
