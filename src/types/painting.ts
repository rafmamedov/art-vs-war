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
  entityCreatedAt: string;
};

export interface Author {
  id: number;
  name: string;
  country: string;
  city: string;
  shortStory: string;
};

export interface Style {
  id: number;
  name: string;
}

export interface Medium {
  id: number;
  name: string;
}

export interface Support {
  id: number;
  name: string;
}

export interface Picture {
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
  entityCreatedAt: string;
}
