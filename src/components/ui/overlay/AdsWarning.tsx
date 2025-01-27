"use client";

import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ScrollShadow,
  Link,
} from "@heroui/react";

const AdsWarning: React.FC = () => {
  const [seen, setSeen] = useLocalStorage<boolean>({
    key: "ads-warning-seen",
    getInitialValueInEffect: false,
  });
  const [opened, handlers] = useDisclosure(!seen);

  const handleSeen = () => {
    handlers.close();
    setSeen(true);
  };

  return (
    <Modal
      hideCloseButton
      isOpen={opened}
      placement="center"
      backdrop="blur"
      size="3xl"
      isDismissable={false}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-center text-3xl uppercase">
          Before you watch!
        </ModalHeader>
        <ModalBody>
          <ScrollShadow hideScrollBar className="space-y-4">
            <p className="text-center">
              As our content is hosted by various third party providers, you may encounter pop up
              advertisements while streaming. To improve your viewing experience, we suggest using
              an ad-blocker like{" "}
              <Link href="https://ublockorigin.com/" target="_blank" className="font-bold">
                uBlock Origin
              </Link>{" "}
              or{" "}
              <Link href="https://adblockplus.org/" target="_blank" className="font-bold">
                Adblock Plus
              </Link>
              . Please be aware that we don't have control over the ads displayed and cannot be held
              responsible for their content or any issues they may cause.
            </p>
          </ScrollShadow>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button color="primary" variant="shadow" onPress={handleSeen}>
            Okay, I understand
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdsWarning;
