import { notification } from "antd";
import type { NotificationConfig } from "antd/es/notification/interface";
import type { ArgsProps } from "antd/es/notification/interface";
import type { NotificationInstance } from "antd/es/notification/interface";
import { createContext } from "react";
import "./index.less";
// import { createIntl, createIntlCache } from "react-intl";
// import { enUS_globalTips } from "@/locales/en-US/global/tips";

interface IProps {
  children: React.ReactNode;
}

interface INotificationParams extends ArgsProps {
  message: React.ReactNode;
  description?: React.ReactNode;
}

interface INotificationContext {
  notification?: NotificationInstance | undefined;
  contextHover?: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  success: (params: INotificationParams) => void;
  error: (params: INotificationParams) => void;
  warning: (params: INotificationParams) => void;
}

const NotificationContext = createContext<INotificationContext>({
  success: () => {},
  error: () => {},
  warning: () => {},
  notification: undefined,
  contextHover: undefined,
});

const DEFAULT_DURATION = 5;
const DEFAULT_STACK_THRESHOLD = 5;

const configNotification: NotificationConfig = {
  placement: "topRight",
  rtl: false,
  top: 70,
  stack: { threshold: DEFAULT_STACK_THRESHOLD },
};

// const locale = "en"
// const messages = enUS_globalTips;
// const cache = createIntlCache();
// const intl = createIntl({ locale, messages }, cache);

function getDescription(description?: React.ReactNode) {
  return description ? description : "";
}
let globalNotificationApi: NotificationInstance | null = null;
function NotificationProvider(props: IProps) {
  const [api, contextHover] = notification.useNotification(configNotification);
  globalNotificationApi = api;

  const success = (params: INotificationParams) => {
    api.success({
      duration: DEFAULT_DURATION,
      // icon: <NotificationSuccessSvg />,
      ...params,
      className: `notification-provider notification-success ${params.className}`,
      message: params.message,
      description: getDescription(params.description),
    });
  };

  const error = (params: INotificationParams) => {
    api.error({
      duration: DEFAULT_DURATION,
      // icon: <NotificationErrorSvg />,
      ...params,
      className: `notification-provider notification-error ${params.className}`,
      message: params.message,
      description: getDescription(params.description),
    });
  };

  const warning = (params: INotificationParams) => {
    api.warning({
      duration: DEFAULT_DURATION,
      // icon: <NotificationWarningSvg />,
      ...params,
      className: `notification-provider notification-warning ${params.className}`,
      message: params.message,
      description: getDescription(params.description),
    });
  };

  return (
    <NotificationContext.Provider
      value={{ success, error, warning, notification: api, contextHover }}
    >
      {contextHover}
      {props.children}
    </NotificationContext.Provider>
  );
}

const notificationSuccess = (params: INotificationParams) => {
  globalNotificationApi?.success({
    ...params,
    duration: DEFAULT_DURATION,
    // icon: <NotificationSuccessSvg />,
    className: `notification-provider notification-success ${params.className}`,
    placement: "topRight",
    // style: { marginTop: '46px' },
    message: params.message,
    description: getDescription(params.description),
  });
};

const notificationError = (params: INotificationParams) => {
  globalNotificationApi?.error({
    ...params,
    duration: DEFAULT_DURATION,
    // icon: <NotificationErrorSvg />,
    className: `notification-provider notification-error ${params.className}`,
    placement: "topRight",
    // style: { marginTop: '46px' },
    message: params.message,
    description: getDescription(params.description),
  });
};

const notificationWarning = (params: INotificationParams) => {
  globalNotificationApi?.warning({
    ...params,
    duration: DEFAULT_DURATION,
    // icon: <NotificationWarningSvg />,
    className: `notification-provider notification-warning ${params.className}`,
    placement: "topRight",
    // style: { marginTop: '46px' },
    message: params.message,
    description: getDescription(params.description),
  });
};

const notificationInfo = (params: INotificationParams) => {
  globalNotificationApi?.info({
    ...params,
    duration: DEFAULT_DURATION,
    // icon: <NotificationInfoSvg />,
    className: `notification-provider notification-info notification-info-icon ${params.className}`,
    placement: "topRight",
    message: params.message,
    description: getDescription(params.description),
  });
};

export {
  NotificationProvider,
  notificationSuccess,
  notificationError,
  notificationWarning,
  notificationInfo,
};
export default NotificationContext;
