const REG = {
  "PHONE" 					: /^(\d{0,3})(\d{0,4})(\d{0,4})$/g
  ,"TEL"						: /^(\d{0,2})(\d{0,4})(\d{0,4})$/g
  ,"EMAIL"					: `^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$`
  ,"ONLY_NUM"				: /[^0-9]/g
  ,"AUTO_HYPHEN"		: /(\-{1,2})$/g
};

export default REG;