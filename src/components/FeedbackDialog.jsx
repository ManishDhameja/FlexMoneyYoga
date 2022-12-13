import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay, Button, Heading,
} from "@chakra-ui/react";
import React from "react";
import {readableBatches} from "../App";

export function FeedbackDialog({isOpen, onClose, data}) {
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Success !
          </AlertDialogHeader>

          <AlertDialogBody>
            <Heading size="md" textAlign="center">Payment completed. You have successfully registered for yoga classes
              !!</Heading>
            <br/>
            <Heading size="sm">id: {data?.id}</Heading>
            <Heading size="sm">Email: {data?.email}</Heading>
            <Heading size="sm">Batch: {readableBatches[data?.batch]}</Heading>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme="teal">Okay</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}