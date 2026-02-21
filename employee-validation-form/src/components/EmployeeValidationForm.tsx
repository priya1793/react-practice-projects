import React, { useState, useEffect } from "react";
import {
  Container,
  FormCard,
  FormHeader,
  Title,
  Subtitle,
  FormContent,
  Form,
  FieldContainer,
  Label,
  InputWrapper,
  Input,
  Error,
  ButtonGroup,
  Button,
  SuccessMessage,
  ProgressBar,
  ProgressContainer,
  FieldHint,
  IconWrapper,
  Icon,
  ErrorText,
} from "./EmployeeValidationForm.styles";

interface FormData {
  name: string;
  email: string;
  employeeId: string;
  joiningDate: string;
}

interface TouchedState {
  name: boolean;
  email: boolean;
  employeeId: boolean;
  joiningDate: boolean;
}

interface FieldValidity {
  name: boolean;
  email: boolean;
  employeeId: boolean;
  joiningDate: boolean;
}

const EmployeeValidationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    employeeId: "",
    joiningDate: "",
  });

  const [touched, setTouched] = useState<TouchedState>({
    name: false,
    email: false,
    employeeId: false,
    joiningDate: false,
  });

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [formProgress, setFormProgress] = useState<number>(0);

  // Validation functions
  const validateName = (name: string): boolean => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return name.length >= 4 && nameRegex.test(name);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEmployeeId = (employeeId: string): boolean => {
    const idRegex = /^\d{6}$/;
    return idRegex.test(employeeId);
  };

  const validateJoiningDate = (date: string): boolean => {
    if (!date) return false;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate <= today;
  };

  // Get field validity
  const getFieldValidity: FieldValidity = {
    name: validateName(formData.name),
    email: validateEmail(formData.email),
    employeeId: validateEmployeeId(formData.employeeId),
    joiningDate: validateJoiningDate(formData.joiningDate),
  };

  // Check if all fields are valid
  const isFormValid: boolean = Object.values(getFieldValidity).every(Boolean);

  // Calculate form progress
  useEffect(() => {
    const validFields = Object.values(getFieldValidity).filter(Boolean).length;
    const totalFields = Object.keys(getFieldValidity).length;
    setFormProgress((validFields / totalFields) * 100);
  }, [formData]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    // Special handling for employee ID to only allow digits
    if (name === "employeeId" && value !== "" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle field blur
  const handleBlur = (fieldName: keyof TouchedState): void => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isFormValid) {
      setShowSuccess(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          employeeId: "",
          joiningDate: "",
        });
        setTouched({
          name: false,
          email: false,
          employeeId: false,
          joiningDate: false,
        });
        setShowSuccess(false);
      }, 0);
    }
  };

  // Handle reset
  const handleReset = (): void => {
    setFormData({
      name: "",
      email: "",
      employeeId: "",
      joiningDate: "",
    });
    setTouched({
      name: false,
      email: false,
      employeeId: false,
      joiningDate: false,
    });
  };

  const getFieldHint = (fieldName: string): string => {
    switch (fieldName) {
      case "name":
        return "Min. 4 characters, letters and spaces only";
      case "email":
        return "e.g., john.doe@company.com";
      case "employeeId":
        return "Exactly 6 digits (0-9)";
      case "joiningDate":
        return "Cannot be in the future";
      default:
        return "";
    }
  };

  return (
    <Container>
      <FormCard>
        <FormHeader>
          <IconWrapper>
            <Icon $active={getFieldValidity.name}>👤</Icon>
            <Icon $active={getFieldValidity.email}>📧</Icon>
            <Icon $active={getFieldValidity.employeeId}>🆔</Icon>
            <Icon $active={getFieldValidity.joiningDate}>📅</Icon>
          </IconWrapper>
          <Title>Employee Validation</Title>
          <Subtitle>Please verify and update your information</Subtitle>
        </FormHeader>

        <FormContent>
          {showSuccess && (
            <SuccessMessage>
              ✓ Information validated successfully! Form will reset...
            </SuccessMessage>
          )}

          <ProgressContainer>
            <ProgressBar $progress={formProgress} />
          </ProgressContainer>

          <Form onSubmit={handleSubmit} noValidate>
            {/* Name Field */}
            <FieldContainer>
              <Label htmlFor="name">Full Name</Label>
              <InputWrapper
                $hasError={touched.name && !getFieldValidity.name}
                $isValid={touched.name && getFieldValidity.name}
              >
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("name")}
                  $hasError={touched.name && !getFieldValidity.name}
                  data-testid="name-input"
                  placeholder="John Doe"
                />
              </InputWrapper>
              <FieldHint>{getFieldHint("name")}</FieldHint>
              {touched.name && !getFieldValidity.name && (
                <Error data-testid="name-error" role="alert">
                  <ErrorText>
                    Name must be at least 4 characters long and only contain
                    letters and spaces.
                  </ErrorText>
                </Error>
              )}
            </FieldContainer>

            {/* Email Field */}
            <FieldContainer>
              <Label htmlFor="email">Email Address</Label>
              <InputWrapper
                $hasError={touched.email && !getFieldValidity.email}
                $isValid={touched.email && getFieldValidity.email}
              >
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("email")}
                  $hasError={touched.email && !getFieldValidity.email}
                  data-testid="email-input"
                  placeholder="john.doe@company.com"
                />
              </InputWrapper>
              <FieldHint>{getFieldHint("email")}</FieldHint>
              {touched.email && !getFieldValidity.email && (
                <Error data-testid="email-error" role="alert">
                  <ErrorText>Email must be a valid email address.</ErrorText>
                </Error>
              )}
            </FieldContainer>

            {/* Employee ID Field */}
            <FieldContainer>
              <Label htmlFor="employeeId">Employee ID</Label>
              <InputWrapper
                $hasError={touched.employeeId && !getFieldValidity.employeeId}
                $isValid={touched.employeeId && getFieldValidity.employeeId}
              >
                <Input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("employeeId")}
                  $hasError={touched.employeeId && !getFieldValidity.employeeId}
                  data-testid="employeeId-input"
                  placeholder="123456"
                  maxLength={6}
                />
              </InputWrapper>
              <FieldHint>{getFieldHint("employeeId")}</FieldHint>
              {touched.employeeId && !getFieldValidity.employeeId && (
                <Error data-testid="employeeId-error" role="alert">
                  <ErrorText>Employee ID must be exactly 6 digits.</ErrorText>
                </Error>
              )}
            </FieldContainer>

            {/* Joining Date Field */}
            <FieldContainer>
              <Label htmlFor="joiningDate">Joining Date</Label>
              <InputWrapper
                $hasError={touched.joiningDate && !getFieldValidity.joiningDate}
                $isValid={touched.joiningDate && getFieldValidity.joiningDate}
              >
                <Input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("joiningDate")}
                  $hasError={
                    touched.joiningDate && !getFieldValidity.joiningDate
                  }
                  data-testid="joiningDate-input"
                  max={new Date().toISOString().split("T")[0]}
                />
              </InputWrapper>
              <FieldHint>{getFieldHint("joiningDate")}</FieldHint>
              {touched.joiningDate && !getFieldValidity.joiningDate && (
                <Error data-testid="joiningDate-error" role="alert">
                  <ErrorText>Joining Date cannot be in the future.</ErrorText>
                </Error>
              )}
            </FieldContainer>

            <ButtonGroup>
              <Button
                type="submit"
                disabled={!isFormValid}
                data-testid="submit-button"
              >
                {isFormValid ? "✓ Submit" : "Complete All Fields"}
              </Button>

              <Button
                type="button"
                onClick={handleReset}
                $variant="secondary"
                disabled={false}
                data-testid="reset-button"
              >
                ↻ Reset
              </Button>
            </ButtonGroup>
          </Form>
        </FormContent>
      </FormCard>
    </Container>
  );
};

export default EmployeeValidationForm;
