export function isIsraeliIdNumber(id: string | number): boolean {
  id = String(id).trim();
  if (id.length > 9 || isNaN(Number(id))) return false;
  id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
  return (
    Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) %
      10 ===
    0
  );
}

export function isPhoneNumber(phoneNumber: string): boolean {
  const regex = /^[\d+][\d]+$/;
  return regex.test(phoneNumber);
}

export function isFullNameValid(fullName: string): boolean {
  return /^[\p{L}]+\s[\p{L}]+$/gu.test(fullName);
}

export function isValidIp(ip: string): boolean {
  const ipFormat =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
  return ipFormat.test(ip);
}
export function isValidEmail(email: string): boolean {
  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailFormat.test(email);
}

export const validateUserFields = (
  id?: string,
  fullName?: string,
  phoneNumber?: string,
  ipAddress?: string,
  email?: string
): string | null => {
  if (!id) {
    return "ID number is required";
  }

  if (!isIsraeliIdNumber(id)) {
    return "Invalid ID number";
  }

  if (!phoneNumber) {
    return "Phone number is required";
  }

  if (!isPhoneNumber(phoneNumber)) {
    return "Invalid phone number";
  }

  if (!fullName) {
    return "Full name is required";
  }

  if (!isFullNameValid(fullName)) {
    return "Invalid full name";
  }

  if (!ipAddress) {
    return "IP address is required";
  }

  if (!isValidIp(ipAddress)) {
    return "Invalid IP address";
  }
  if (!email) {
    return "Email is required";
  }

  if (!isValidEmail(email)) {
    return "Invalid email address";
  }

  return null;
};
