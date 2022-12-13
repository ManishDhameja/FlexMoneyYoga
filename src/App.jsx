import {useState} from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Text,
  useColorMode, useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import {FeedbackDialog} from "./components/FeedbackDialog.jsx";
import {LoadingModal} from "./components/LoadingModal";

const batches = {
  FIRST: "67",
  SECOND: "78",
  THIRD: "89",
  EVENING: "56",
};

export const readableBatches = {
  "67": "6AM - 7AM",
  "78": "7AM - 8AM",
  "89": "8AM - 9AM",
  "56": "5PM - 6PM",
};

function App() {
  const init = {
    age: 18,
    batch: batches.FIRST,
    txnID: "",
    email: "",
  };
  const [fields, setFields] = useState(init);
  const {colorMode, toggleColorMode} = useColorMode();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [response, setResponse] = useState({});
  const [processing, setProcessing] = useState(false);

  function validAge() {
    return fields.age < 18 || fields.age > 65;
  }

  function handleFields(e) {
    setFields({...fields, [e.target.name]: e.target.value});
  }

  function submit(e) {
    e.preventDefault();
    setProcessing(true);

    for (const value of Object.values(fields)) {
      if (!!!value) {
        alert("All fields are required. Please check the form.");
        return;
      }
    }

    axios.post("https://tame-long-underwear-hare.cyclic.app/register", fields).then(res => {
      if (!!res.data.error) {
        alert(res.data.error);
        setProcessing(false);
        return;
      }
      setResponse(res.data);
      setProcessing(false);
      onOpen();
    });
    setFields(init);
  }

  return (
    <Box
      className="App"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={2}
      minHeight="100vh"
    >
      <Heading fontFamily="Poppins">
        Register for Yoga classes
      </Heading>
      <br/>
      <Text fontFamily="Poppins">Your path to mindfulness</Text>
      <br/>
      <Box boxShadow="xl" border="1px" borderColor={colorMode === "light" ? "gray.200" : "gray.900"} p={4}
           borderRadius="md" mx={2} maxW="md" height="auto">
        <form onSubmit={submit}>
          <FormControl isRequired mb={4}>
            <FormLabel>Your Email</FormLabel>
            <Input type="email" value={fields.email} name="email" onChange={handleFields}/>
            <FormHelperText>
              Your active email address
            </FormHelperText>
          </FormControl>
          <FormControl isRequired isInvalid={validAge()} mb={4}>
            <FormLabel>Your age</FormLabel>
            <Input type="number" name="age" value={fields.age} onChange={handleFields}/>
            {!validAge() ? null : (
              <FormErrorMessage>
                Age must be between 18 - 65 years.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Choose a batch</FormLabel>
            <Select placeholder="Choose a batch" name="batch" variant="filled" value={fields.batch}
                    onChange={handleFields}>
              <option value={batches.FIRST}>6AM - 7AM</option>
              <option value={batches.SECOND}>7AM - 8AM</option>
              <option value={batches.THIRD}>8AM - 9AM</option>
              <option value={batches.EVENING}>5PM - 6PM</option>
            </Select>
            <FormHelperText>There are a total of 4 batches a day. You can switch to any other batch in the next
              month</FormHelperText>
          </FormControl>
          <br/>
          <HStack mb={2} justify="space-between">
            <Heading size="md">Subscription</Heading>
            <Heading size="md" fontFamily="Poppins" color="green.500">₹ 499</Heading>
          </HStack>
          <Text mb={2}>Generate the QR code and pay
            using UPI, then enter the transaction's ID below</Text>
          <Popover>
            <PopoverTrigger>
              <Button>Generate QR Code</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow/>
              <PopoverCloseButton/>
              <PopoverHeader>Scan and pay</PopoverHeader>
              <PopoverBody>
                You can enroll any day of the month, but you'll have to pay for the entire month.
                <Image src="https://res.cloudinary.com/dmmt1w6md/image/upload/v1670849116/random_bvpebk.png" width="100%"/>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <br/>
          <FormControl isRequired mt={2}>
            <FormLabel>Transaction ID</FormLabel>
            <Input type="text" name="txnID" value={fields.txnID} onChange={handleFields}/>
            <FormHelperText>
              Enter transaction ID of above payment.
            </FormHelperText>
          </FormControl>
          <br/>
          <Button type="submit" colorScheme="teal" width="100%">Submit</Button>
        </form>
        <IconButton
          position="absolute"
          aria-label="toggle"
          colorScheme="teal"
          onClick={toggleColorMode}
          bottom="5vh"
          right="5vw"
        >
          {
            colorMode === "dark" ? <LightMode/> : <DarkMode/>
          }
        </IconButton>
      </Box>
      <FeedbackDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={response}
      />
      {
        processing && <LoadingModal/>
      }
    </Box>
  )
    ;
}

const LightMode = () => {
  return (
    <Icon>
      <path
        d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path>
    </Icon>
  );
};

const DarkMode = () => {
  return (
    <Icon>
      <path
        fill="white"
        d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"></path>
    </Icon>
  );
};

export default App;