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
  ErrorText,
  ButtonGroup,
  Button,
  SuccessMessage,
  ProgressBar,
  ProgressContainer,
  FieldHint,
  IconWrapper,
  Icon,
  CharacterCounter,
  Timestamp,
  AutoSaveIndicator,
  ShortcutHint,
  StyledDatePicker,
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
    joiningDate: null,
  });

  const [touched, setTouched] = useState<TouchedState>({
    name: false,
    email: false,
    employeeId: false,
    joiningDate: false,
  });

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [formProgress, setFormProgress] = useState<number>(0);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("employeeForm");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Convert string date back to Date object
        if (parsed.joiningDate) {
          parsed.joiningDate = new Date(parsed.joiningDate);
        }
        setFormData(parsed);
        setLastSaved("Loaded from storage");
      } catch (e) {
        console.error("Failed to load saved data");
      }
    }
  }, []);

  // Auto-save to localStorage when form data changes
  useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        // Convert Date object to string for storage
        const dataToSave = {
          ...formData,
          joiningDate: formData.joiningDate
            ? formData.joiningDate.toISOString()
            : null,
        };
        localStorage.setItem("employeeForm", JSON.stringify(dataToSave));
        setAutoSaveStatus(true);
        setLastSaved(`Auto-saved at ${new Date().toLocaleTimeString()}`);

        setTimeout(() => setAutoSaveStatus(false), 2000);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [formData, isDirty]);

  // Mark form as dirty when user types
  useEffect(() => {
    if (
      Object.values(formData).some((value) => value !== "" && value !== null)
    ) {
      setIsDirty(true);
    }
  }, [formData]);

  // Validation functions - now return false for empty fields
  const validateName = (name: string): boolean => {
    if (!name) return false; // Empty field is invalid
    const nameRegex = /^[A-Za-z\s]+$/;
    return name.length >= 4 && nameRegex.test(name);
  };

  const validateEmail = (email: string): boolean => {
    if (!email) return false; // Empty field is invalid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEmployeeId = (employeeId: string): boolean => {
    if (!employeeId) return false; // Empty field is invalid
    const idRegex = /^\d{6}$/;
    return idRegex.test(employeeId);
  };

  const validateJoiningDate = (date: Date | null): boolean => {
    if (!date) return false; // Empty field is invalid
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date <= today;
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
    setAutoSaveStatus(false);

    // Don't mark as touched automatically - wait for blur
  };

  // Handle date change
  const handleDateChange = (date: Date | null): void => {
    setFormData((prev) => ({
      ...prev,
      joiningDate: date,
    }));
    setAutoSaveStatus(false);
  };

  // Handle field blur - mark as touched to show errors
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
      setLastSaved(`Submitted at ${new Date().toLocaleTimeString()}`);

      localStorage.removeItem("employeeForm");

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          employeeId: "",
          joiningDate: null,
        });
        setTouched({
          name: false,
          email: false,
          employeeId: false,
          joiningDate: false,
        });
        setShowSuccess(false);
        setIsDirty(false);
      }, 0);
    }
  };

  // Handle reset
  const handleReset = (): void => {
    setFormData({
      name: "",
      email: "",
      employeeId: "",
      joiningDate: null,
    });
    setTouched({
      name: false,
      email: false,
      employeeId: false,
      joiningDate: false,
    });
    localStorage.removeItem("employeeForm");
    setLastSaved("Form reset");
    setIsDirty(false);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter" && isFormValid) {
        e.preventDefault();
        handleSubmit(e as any);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFormValid, formData]);

  // Get field hints
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

  // Quick fill sample data
  const fillSampleData = () => {
    setFormData({
      name: "John Doe",
      email: "john.doe@company.com",
      employeeId: "123456",
      joiningDate: new Date("2023-01-15"),
    });
    setTouched({
      name: true,
      email: true,
      employeeId: true,
      joiningDate: true,
    });
    setLastSaved("Sample data loaded");
    setIsDirty(true);
  };

  // Check if field should show error (touched AND invalid)
  const shouldShowError = (fieldName: keyof TouchedState): boolean => {
    return touched[fieldName] && !getFieldValidity[fieldName];
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
              <p style={{ margin: 0, wordBreak: "break-word" }}>
                ✓ Information validated successfully! Form will reset...
              </p>
            </SuccessMessage>
          )}

          {isDirty && (
            <AutoSaveIndicator $saved={autoSaveStatus}>
              {autoSaveStatus ? "💾 All changes saved" : "⏳ Saving..."}
            </AutoSaveIndicator>
          )}

          <ProgressContainer>
            <ProgressBar $progress={formProgress} />
          </ProgressContainer>

          <Form onSubmit={handleSubmit} noValidate>
            {/* Name Field */}
            <FieldContainer>
              <Label htmlFor="name">Full Name</Label>
              <InputWrapper
                $hasError={shouldShowError("name")}
                $isValid={touched.name && getFieldValidity.name}
              >
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("name")}
                  $hasError={shouldShowError("name")}
                  data-testid="name-input"
                  placeholder="John Doe"
                />
              </InputWrapper>
              <FieldHint>{getFieldHint("name")}</FieldHint>

              {formData.name.length > 0 && (
                <CharacterCounter $isValid={getFieldValidity.name}>
                  {formData.name.length}/4+ characters
                  {!getFieldValidity.name &&
                    formData.name.length < 4 &&
                    " - need " + (4 - formData.name.length) + " more"}
                  {!getFieldValidity.name &&
                    formData.name.length >= 4 &&
                    " - invalid characters"}
                </CharacterCounter>
              )}

              <Error
                $show={shouldShowError("name")}
                data-testid="name-error"
                role="alert"
              >
                <ErrorText>
                  Name must be at least 4 characters long and only contain
                  letters and spaces.
                </ErrorText>
              </Error>
            </FieldContainer>

            {/* Email Field */}
            <FieldContainer>
              <Label htmlFor="email">Email Address</Label>
              <InputWrapper
                $hasError={shouldShowError("email")}
                $isValid={touched.email && getFieldValidity.email}
              >
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("email")}
                  $hasError={shouldShowError("email")}
                  data-testid="email-input"
                  placeholder="john.doe@company.com"
                />
              </InputWrapper>
              <FieldHint>{getFieldHint("email")}</FieldHint>
              <Error
                $show={shouldShowError("email")}
                data-testid="email-error"
                role="alert"
              >
                <ErrorText>Email must be a valid email address.</ErrorText>
              </Error>
            </FieldContainer>

            {/* Employee ID Field */}
            <FieldContainer>
              <Label htmlFor="employeeId">Employee ID</Label>
              <InputWrapper
                $hasError={shouldShowError("employeeId")}
                $isValid={touched.employeeId && getFieldValidity.employeeId}
              >
                <Input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("employeeId")}
                  $hasError={shouldShowError("employeeId")}
                  data-testid="employeeId-input"
                  placeholder="123456"
                  maxLength={6}
                />
              </InputWrapper>
              <FieldHint>{getFieldHint("employeeId")}</FieldHint>
              <Error
                $show={shouldShowError("employeeId")}
                data-testid="employeeId-error"
                role="alert"
              >
                <ErrorText>Employee ID must be exactly 6 digits.</ErrorText>
              </Error>
            </FieldContainer>

            {/* Joining Date Field with DatePicker */}
            <FieldContainer>
              <Label htmlFor="joiningDate">Joining Date</Label>
              <InputWrapper
                $hasError={shouldShowError("joiningDate")}
                $isValid={touched.joiningDate && getFieldValidity.joiningDate}
              >
                <StyledDatePicker
                  selected={formData.joiningDate}
                  onChange={handleDateChange}
                  onBlur={() => handleBlur("joiningDate")}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select joining date"
                  maxDate={new Date()}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={15}
                  $hasError={shouldShowError("joiningDate")}
                  data-testid="joiningDate-input"
                  id="joiningDate"
                  name="joiningDate"
                  isClearable={true}
                  showPopperArrow={false}
                  popperClassName="datepicker-popper"
                />
              </InputWrapper>
              <FieldHint>{getFieldHint("joiningDate")}</FieldHint>
              <Error
                $show={shouldShowError("joiningDate")}
                data-testid="joiningDate-error"
                role="alert"
              >
                <ErrorText>Joining Date cannot be in the future.</ErrorText>
              </Error>
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

              <Button
                type="button"
                onClick={fillSampleData}
                $variant="secondary"
                style={{ background: "#4299e1", color: "white" }}
              >
                📋 Sample
              </Button>
            </ButtonGroup>
          </Form>

          {lastSaved && (
            <Timestamp>
              <span>🕒</span> {lastSaved}
            </Timestamp>
          )}

          <ShortcutHint>
            ⌨️ Shortcuts: Ctrl+Enter (submit) | Esc (reset)
          </ShortcutHint>
        </FormContent>
      </FormCard>
    </Container>
  );
};

export default EmployeeValidationForm;
