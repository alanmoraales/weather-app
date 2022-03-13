import { useToast } from "@chakra-ui/react";
import { ENotificationType } from "@declarations/common";

interface INotify {
  title?: string;
  description: string;
  duration?: number;
  isClosable?: boolean;
}

const useNotification = () => {
  const displayToast = useToast();

  const success = ({
    title = "Listo",
    description,
    duration = 5000,
    isClosable = true,
  }: INotify) =>
    displayToast({
      status: ENotificationType.SUCCESS,
      title,
      description,
      duration,
      isClosable,
      position: "top-right",
    });

  const error = ({
    title = "Lo sentimos",
    description,
    duration = 5000,
    isClosable = true,
  }: INotify) =>
    displayToast({
      status: ENotificationType.ERROR,
      title,
      description,
      duration,
      isClosable,
      position: "top-right",
    });

  return {
    success,
    error,
  };
};

export default useNotification;
