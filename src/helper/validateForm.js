const validateForm = (userData) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    confirmPassword,
  } = userData;

  if (!firstName.trim()) throw new Error("First name is required");
  if (!lastName.trim()) throw new Error("Last name is required");

  if (!email) {
    throw new Error("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    throw new Error("Please enter a valid email");
  }

  if (!phone) {
    throw new Error("Phone number is required");
  } else if (!/^[0-9]{10}$/.test(phone.replace(/\D/g, ""))) {
    throw new Error("Please enter a valid 10-digit phone number");
  }

  if (!dob) throw new Error("Date of birth is required");

  if (!gender) throw new Error("Please select gender");

  if (!password) {
    throw new Error("Password is required");
  } else if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  if (!confirmPassword) {
    throw new Error("Please confirm your password");
  } else if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
};

module.exports = { validateForm };
