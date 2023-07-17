const HelperFunctions = {
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  isIsraeliIdNumber: (id: string | number): boolean => {
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
  },

  isPhoneNumber: (phoneNumber: string): boolean => {
    const regex = /^[\d+][\d]+$/;
    return regex.test(phoneNumber);
  },

  isFullNameValid: (fullName: string): boolean => {
    return /^[\p{L}]+\s[\p{L}]+$/gu.test(fullName);
  },

  isIPValid: (ip: string): boolean => {
    const regex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  },

  isValidEmail: (email: string): boolean => {
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailFormat.test(email);
  },

  validateUserFields: (
    fullName?: string,
    id?: number,
    phoneNumber?: string,
    ipAddress?: string,
    email?: string // Add this line
  ): string | null => {
    if (!fullName) {
      return "Full name is required";
    } else if (!HelperFunctions.isFullNameValid(fullName)) {
      return "Invalid full name";
    }

    if (!id) {
      return "ID is required";
    } else if (!HelperFunctions.isIsraeliIdNumber(id)) {
      return "Invalid ID number";
    }

    if (!phoneNumber) {
      return "Phone number is required";
    } else if (!HelperFunctions.isPhoneNumber(phoneNumber)) {
      return "Invalid phone number";
    }

    if (!ipAddress) {
      return "IP address is required";
    } else if (!HelperFunctions.isIPValid(ipAddress)) {
      return "Invalid IP address";
    }

    if (!email) {
      // Add these lines
      return "Email is required";
    } else if (!HelperFunctions.isValidEmail(email)) {
      return "Invalid Email";
    }

    return null;
  },
};

export default HelperFunctions;
