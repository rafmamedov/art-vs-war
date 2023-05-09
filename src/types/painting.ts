export interface Painting {
  id: number;
  title: string;
  price: number;
  author: Author;
  description: string;
  style: Style;
  medium: Medium;
  support: Support;
  height: number;
  width: number;
  imageUrl: string;
  yearOfCreation: number;
  entityCreatedAt: string;
};

export interface Author {
  id: string;
  fullName: string;
  country: string;
  city: string;
  aboutMe: string;
  photoUrl: string;
};

export interface Style {
  name: string;
  _links: {
    self: {
      href: string;
    },
    style: {
      href: string;
    }
  }
}

export interface Medium {
  name: string;
  _links: {
    self: {
      href: string;
    },
    style: {
      href: string;
    }
  }
}

export interface Support {
  name: string;
  _links: {
    self: {
      href: string;
    },
    style: {
      href: string;
    }
  }
}
