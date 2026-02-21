import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const FormHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Title = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 10px 0;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  margin: 0;
  position: relative;
  z-index: 1;
  font-weight: 400;
`;

export const FormContent = styled.div`
  padding: 40px;
  width: 600px;
  box-sizing: border-box;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    width: 3px;
    height: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 3px;
  }
`;

export const InputWrapper = styled.div<{
  $hasError?: boolean;
  $isValid?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  &::after {
    content: ${(props) => {
      if (props.$hasError) return "'⚠️'";
      if (props.$isValid) return "'✓'";
      return "''";
    }};
    position: absolute;
    right: 16px;
    font-size: 18px;
    color: ${(props) => {
      if (props.$hasError) return "#e53e3e";
      if (props.$isValid) return "#48bb78";
      return "transparent";
    }};
    animation: ${(props) => (props.$isValid ? "popIn 0.3s ease-out" : "none")};
  }

  @keyframes popIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 14px 40px 14px 16px;
  font-size: 16px;
  border: 2px solid ${(props) => (props.$hasError ? "#feb2b2" : "#e2e8f0")};
  border-radius: 12px;
  background: ${(props) => (props.$hasError ? "#fff5f5" : "#f7fafc")};
  transition: all 0.3s ease;
  color: #2d3748;
  font-weight: 500;
  box-sizing: border-box;

  &:hover {
    border-color: ${(props) => (props.$hasError ? "#fc8181" : "#cbd5e0")};
    background: white;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#f56565" : "#667eea")};
    background: white;
    box-shadow: ${(props) =>
      props.$hasError
        ? "0 0 0 3px rgba(245, 101, 101, 0.1)"
        : "0 0 0 3px rgba(102, 126, 234, 0.1)"};
  }

  &::placeholder {
    color: #a0aec0;
    font-weight: 400;
    font-size: 15px;
  }

  &:disabled {
    background: #edf2f7;
    cursor: not-allowed;
  }
`;

export const Error = styled.div`
  color: #e53e3e;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 12px;
  background: #fff5f5;
  border-radius: 8px;
  border-left: 3px solid #f56565;
  margin-top: 4px;
  width: 100%;
  max-width: 100%; /* Constrain to parent width */
  box-sizing: border-box;
  word-wrap: break-word; /* Break long words if needed */
  overflow-wrap: break-word; /* Modern equivalent */
  hyphens: auto; /* Add hyphens for better wrapping */
`;

export const ErrorText = styled.p`
  margin: 0;
  padding: 8px 12px;
  word-break: break-word; /* Break words to prevent overflow */
  overflow-wrap: break-word;
  hyphens: auto;
  line-height: 1.5;
  color: #e53e3e;
  font-size: 13px;
  font-weight: 500;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  width: 100%;
`;

export const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;

  background: ${(props) => {
    if (props.disabled) return "#cbd5e0";
    return props.$variant === "secondary"
      ? "white"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  }};

  color: ${(props) => {
    if (props.disabled) return "#718096";
    return props.$variant === "secondary" ? "#4a5568" : "white";
  }};

  border: ${(props) =>
    props.$variant === "secondary" ? "2px solid #e2e8f0" : "none"};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.$variant === "secondary"
        ? "0 10px 20px rgba(0, 0, 0, 0.1)"
        : "0 10px 20px rgba(102, 126, 234, 0.4)"};

    border-color: ${(props) =>
      props.$variant === "secondary" ? "#cbd5e0" : "transparent"};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition:
      width 0.6s,
      height 0.6s;
  }

  &:hover:not(:disabled)::before {
    width: 300px;
    height: 300px;
  }
`;

export const SuccessMessage = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  border-radius: 12px;
  color: white;
  font-weight: 600;
  margin-bottom: 20px;
  animation: slideDown 0.5s ease-out;
  box-shadow: 0 4px 6px rgba(72, 187, 120, 0.2);
  width: 100%;
  box-sizing: border-box;
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  height: 4px;
  background: linear-gradient(90deg, #48bb78 0%, #667eea 100%);
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease;
  border-radius: 2px;
`;

export const ProgressContainer = styled.div`
  background: #e2e8f0;
  height: 4px;
  border-radius: 2px;
  margin-bottom: 24px;
  overflow: hidden;
  width: 100%;
`;

export const FieldHint = styled.span`
  font-size: 12px;
  color: #718096;
  margin-top: 4px;
  display: block;
  width: 100%;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const Icon = styled.div<{ $active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "white" : "rgba(255,255,255,0.2)")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$active ? "#667eea" : "white")};
  font-weight: bold;
  transition: all 0.3s ease;
  border: 2px solid ${(props) => (props.$active ? "white" : "transparent")};

  &:hover {
    transform: scale(1.1);
  }
`;
