export interface Category {
  name: string;
  easy: () => string | null;
  medium: () => string | null;
  hard: () => string | null;
};

export const wildcardCategory = {
  name: "Miscellaneous",
  easy: function () {
    return `generate a common word from category ${this.name}`;
  },
  medium: function () {
    return `generate a common word for advanced concept from category ${this.name}`;
  },
  hard: function () {
    return `generate a less common word from category ${this.name}`;
  },
};

export const testCategory = {
  name: "Places",
  easy: function () {
    return `generate a famous word from category ${this.name}`;
  },
  medium: function () {
    return `generate a common word from category ${this.name}`;
  },
  hard: function () {
    return `generate a less common word from category ${this.name}`;
  },
};

export const categories = [
  {
    name: "Actors and directors",
    easy: function () {
      return `generate a famous name from category ${this.name}`;
    },
    medium: function () {
      return null;
    },
    hard: function () {
      return `generate a less known name from category ${this.name}`;
    },
  },
  {
    name: "Movies",
    easy: function () {
      return null;
    },
    medium: function () {
      return null;
    },
    hard: function () {
      return null;
    },
  },
  {
    name: "Writers",
    easy: function () {
      return null;
    },
    medium: function () {
      return null;
    },
    hard: function () {
      return null;
    },
  },
  {
    name: "Superheroes and Villains",
    easy: function () {
      return null;
    },
    medium: function () {
      return null;
    },
    hard: function () {
      return null;
    },
  },
  {
    name: "Musicians",
    easy: function () {
      return null;
    },
    medium: function () {
      return null;
    },
    hard: function () {
      return null;
    },
  },
  {
    name: "Songs",
    easy: function () {
      return null;
    },
    medium: function () {
      return null;
    },
    hard: function () {
      return null;
    },
  },
  {
    name: "Video games from 90s",
    easy: function () {
      return null;
    },
    medium: function () {
      return null;
    },
    hard: function () {
      return null;
    },
  },
  {
    name: "Fantasy Characters",
    easy: function () {
      return null;
    },
    medium: function () {
      return null;
    },
    hard: function () {
      return null;
    },
  },
  {
    name: "Historical Figures",
    easy: function () {
      return null;
    },
    medium: function () {
      return null;
    },
    hard: function () {
      return null;
    },
  },
] satisfies Category[];
