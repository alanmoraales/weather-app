import {
  forwardRef,
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
} from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import Heading from "@atoms/Heading";

interface ISearchInput {
  label?: string;
  placeholder?: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  shouldFocusOnMount?: boolean;
  errorMessage?: string;
  hasError?: boolean;
}

// Doesn't recognize component's name due to the use of forwardRef
// eslint-disable-next-line react/display-name
const SearchInput = forwardRef<HTMLInputElement, ISearchInput>(
  (
    {
      label = "Ingresa un destino",
      placeholder = "Ej. Acapulco",
      name = "searchKey",
      shouldFocusOnMount = false,
      hasError = false,
      errorMessage = "",
      ...inputProps
    },
    ref
  ) => {
    useEffect(() => {
      if (shouldFocusOnMount && typeof ref !== "function") {
        ref?.current?.focus();
      }
    }, [ref, shouldFocusOnMount]);

    return (
      <FormControl isInvalid={hasError}>
        <FormLabel htmlFor={name}>
          <Heading variant="h6">{label}</Heading>
        </FormLabel>
        <Box position="relative">
          <Input
            ref={ref}
            {...inputProps}
            id={name}
            name={name}
            placeholder={placeholder}
            paddingY={5}
            height="fit-content"
            paddingInlineEnd={28}
            border="none"
            boxShadow="0px 3px 10px rgba(0, 0, 0, 0.1)"
          />
          <Button
            background="primary.normal"
            position="absolute"
            right={4}
            top={3}
            zIndex={1}
            type="submit"
            _hover={{
              background: "primary.dark",
            }}
            _active={{
              background: "primary.dark",
            }}
          >
            <Heading variant="h6" color="inverted">
              Buscar
            </Heading>
          </Button>
        </Box>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    );
  }
);

export default SearchInput;
