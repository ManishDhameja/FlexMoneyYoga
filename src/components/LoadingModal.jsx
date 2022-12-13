import {Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Progress} from "@chakra-ui/react";

export function LoadingModal() {
  return (
    <Modal isOpen={true} onClose={() => {
    }}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Processing</ModalHeader>
        <ModalBody>
          <Progress size="sm" isIndeterminate colorScheme="teal" borderRadius="lg"/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}