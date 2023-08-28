type PlayerNoId = {
  name: string;
  nationality: string;
  tour: string;
  titles: number;
  prizemoney: number;
  img: string;
};

type PlayerId = {
  id: string;
};

export type Player = PlayerNoId & PlayerId;
