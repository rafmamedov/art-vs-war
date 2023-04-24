export enum InputNameError {
  NAME = "full name except only Latin, space, ' and -",
  LENGTH = "full name must be between 1 and 101 characters",
  REQUIRED = "full name field is required",
};

export enum InputCountryError {
  COUNTRY = "country must start with capital letter, except only Latin, space, ' and -",
  LENGTH = 'country must be between 2 and 50 characters',
  REQUIRED = "country field is required",
};

export enum InputCityError {
  CITY = "city must start with capital letter, except only Latin, space, ' and -",
  LENGTH = "city must be between 1 and 40 characters",
  REQUIRED = "city field is required",
};

export enum InputAboutError {
  ABOUT = "About Me except only Latin",
  LENGTH = "About Me must be between 3 and 1000 characters",
  REQUIRED = "About Me field is required",
};

export enum InputTitleError {
  TITLE = "title except only Latin, digits, space, ', !, / and -",
  LENGTH = "title must be between 1 and 40 characters",
  REQUIRED = "title field is required",
}

export enum InputYearError {
  YEAR = "year of creation can be in past or in present",
  MIN = "min value for year of creation must be 1000",
  REQUIRED = "field year of creation is required",
}

export enum InputHeightError {
  MIN = "min height is 1 cm",
  MAX = "max height is 700 cm",
  REQUIRED = "field height is required",
};

export enum InputWidthError {
  MIN = "min width is 1 cm",
  MAX = "max width is 700 cm",
  REQUIRED = "field width is required",
};

export enum InputPriceError {
  REQUIRED = "price field is required",
  PRICE = "price must have maximum 8 number of digits without cents",
};

export enum InputDescriptionError {
REQUIRED = "description field is required",
MAX = "description must have maximum 1000 characters",
};
