export const isEmail = (target) => {
  if (target.type !== 'email') return;

  const emailValue = target.value.trim();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  const isEmail = validateEmail(emailValue);
  if (!isEmail) {
    return 'Vui Lòng Nhập đúng Email';
  }
  return;
};

export const isRequired = (target) => {
  if (target.value.trim().length > 0) return;
  return 'Trường này không được để trống';
};

export const minLength = (target, min) => {
  if (target.value.trim().length >= min) return;
  return `Vui lòng nhập lớn hơn ${min} ký tự`;
};

export const maxLength = (target, max) => {
  if (target.value.trim().length < max) return;
  return `Vui lòng nhập nhỏ hơn ${max} ký tự`;
};

export const checkPassword = (target, password) => {
  if (password.trim().length === 0) return;
  if (target.value.trim() === password) return;
  return 'Pass word nhập lại không đúng';
};
